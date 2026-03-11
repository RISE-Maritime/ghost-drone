#!/bin/bash
set -e

# Resolve host.docker.internal BEFORE flushing (needs DNS)
DOCKER_HOST_IP=$(getent ahostsv4 host.docker.internal 2>/dev/null | head -1 | awk '{print $1}')
echo "Resolved host.docker.internal -> ${DOCKER_HOST_IP:-<empty>}"

# Extract Docker DNS info BEFORE any flushing
DOCKER_DNS_RULES=$(iptables-save -t nat | grep "127\.0\.0\.11" || true)

# Flush existing rules and delete existing ipsets
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X
ipset destroy blocked-networks 2>/dev/null || true

# Selectively restore ONLY internal Docker DNS resolution
if [ -n "$DOCKER_DNS_RULES" ]; then
    echo "Restoring Docker DNS rules..."
    iptables -t nat -N DOCKER_OUTPUT 2>/dev/null || true
    iptables -t nat -N DOCKER_POSTROUTING 2>/dev/null || true
    echo "$DOCKER_DNS_RULES" | xargs -L 1 iptables -t nat
else
    echo "No Docker DNS rules to restore"
fi

# Allow DNS and localhost
DNS_SERVER=$(grep "nameserver" /etc/resolv.conf | awk '{print $2}')
if [ -z "$DNS_SERVER" ]; then
    echo "ERROR: No DNS server found in /etc/resolv.conf"
    exit 1
fi
iptables -A OUTPUT -d "$DNS_SERVER" -p udp --dport 53 -j ACCEPT
iptables -A INPUT -p udp --sport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --sport 443 -m state --state ESTABLISHED -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Create ipset for blocked private/local networks
ipset create blocked-networks hash:net

# Block private network ranges (RFC 1918)
echo "Blocking private network ranges..."
ipset add blocked-networks 10.0.0.0/8
ipset add blocked-networks 172.16.0.0/12
ipset add blocked-networks 192.168.0.0/16

iptables -A OUTPUT -m set --match-set blocked-networks dst -j REJECT

# Get host IP for allowlist before blocking
HOST_IP=$(ip route | grep default | cut -d" " -f3)
if [ -z "$HOST_IP" ]; then
    echo "ERROR: Failed to detect host IP"
    exit 1
fi

# Allow outbound connection to Figma Desktop MCP server on Windows host
# The Windows host is reachable at the nameserver IP (Docker Desktop gateway)
WINDOWS_HOST_IP=$(grep nameserver /etc/resolv.conf | awk '{print $2}')
if [ -n "$WINDOWS_HOST_IP" ]; then
    echo "Allowing Figma Desktop MCP at $WINDOWS_HOST_IP:3845..."
    iptables -I OUTPUT 1 -d "$WINDOWS_HOST_IP" -p tcp --dport 3845 -j ACCEPT
    iptables -I INPUT 1 -s "$WINDOWS_HOST_IP" -p tcp --sport 3845 -j ACCEPT

    echo "Allowing zenoh router at $WINDOWS_HOST_IP:7447..."
    iptables -I OUTPUT 1 -d "$WINDOWS_HOST_IP" -p tcp --dport 7447 -j ACCEPT
    iptables -I INPUT 1 -s "$WINDOWS_HOST_IP" -p tcp --sport 7447 -j ACCEPT
fi

# Allow zenoh router at host.docker.internal (may differ from WINDOWS_HOST_IP)
if [ -n "$DOCKER_HOST_IP" ] && [ "$DOCKER_HOST_IP" != "$WINDOWS_HOST_IP" ]; then
    echo "Allowing zenoh router at host.docker.internal ($DOCKER_HOST_IP):7447..."
    iptables -I OUTPUT 1 -d "$DOCKER_HOST_IP" -p tcp --dport 7447 -j ACCEPT
    iptables -I INPUT 1 -s "$DOCKER_HOST_IP" -p tcp --sport 7447 -j ACCEPT
fi

# Allow host to connect to development servers BEFORE blocking
echo "Allowing host $HOST_IP to connect to development ports..."
iptables -I INPUT 1 -s "$HOST_IP" -p tcp --dport 5173 -j ACCEPT
iptables -I OUTPUT 1 -d "$HOST_IP" -p tcp --sport 5173 -j ACCEPT
iptables -I INPUT 1 -s "$HOST_IP" -p tcp --dport 3000 -j ACCEPT
iptables -I OUTPUT 1 -d "$HOST_IP" -p tcp --sport 3000 -j ACCEPT
iptables -I INPUT 1 -s "$HOST_IP" -p tcp --dport 3001 -j ACCEPT
iptables -I OUTPUT 1 -d "$HOST_IP" -p tcp --sport 3001 -j ACCEPT
iptables -I INPUT 1 -s "$HOST_IP" -p tcp --dport 8000 -j ACCEPT
iptables -I OUTPUT 1 -d "$HOST_IP" -p tcp --sport 8000 -j ACCEPT
iptables -I INPUT 1 -s "$HOST_IP" -p tcp --dport 8001 -j ACCEPT
iptables -I OUTPUT 1 -d "$HOST_IP" -p tcp --sport 8001 -j ACCEPT
iptables -I INPUT 1 -s "$HOST_IP" -p tcp --dport 8080 -j ACCEPT
iptables -I OUTPUT 1 -d "$HOST_IP" -p tcp --sport 8080 -j ACCEPT

# Now block other connections to host IP
echo "Blocking other connections to host IP: $HOST_IP"
ipset add blocked-networks "$HOST_IP"

# Block the entire host network
HOST_NETWORK=$(echo "$HOST_IP" | sed "s/\.[0-9]*$/.0\/24/")
echo "Blocking host network: $HOST_NETWORK"
ipset add blocked-networks "$HOST_NETWORK"


# Test it
echo "Testing if we can reach example.com..."
if curl --connect-timeout 5 https://example.com >/dev/null 2>&1; then
    echo "✓ Success!"
else
    echo "✗ Failed"
fi

echo "Testing if 192.168.1.1 is blocked..."
if curl --connect-timeout 2 http://192.168.1.1 >/dev/null 2>&1; then
    echo "✗ Failed - should be blocked!"
else
    echo "✓ Success - blocked as expected!"
fi
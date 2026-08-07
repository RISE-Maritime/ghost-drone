# Development container for ghost-drone.
#
# The repo is two languages: a Python/Docker simulation container under
# ghost-drone/, and a React/Vite frontend under sim-console/. Node 22 matches
# both CI (.github/workflows/ci.yml) and sim-console/Dockerfile — this image
# used to be node:20, which neither CI nor the shipped image uses and which
# Vite 8 has dropped.
FROM node:22

ARG TZ
ENV TZ="$TZ"

# Several installs below are `curl … | sh`. Without pipefail a failed download
# still pipes an empty body into the shell and the layer succeeds, so a broken
# install is only discovered later when the tool is missing.
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Base tooling. Note what is deliberately absent: iptables/ipset/aggregate/
# dnsutils existed only to serve init-firewall.sh, which was deleted in
# 49f58e0 and is not coming back (see the note at the end of this file).
# Gone too: SDL2/freetype/portmidi (pygame, never in this repo), a Postgres
# client (no database), and 17 Chromium libraries (the Playwright venv that
# wanted them was commented out years ago).
RUN apt-get update && apt-get install -y --no-install-recommends \
  less \
  git \
  procps \
  sudo \
  fzf \
  zsh \
  man-db \
  unzip \
  gnupg2 \
  gh \
  jq \
  nano \
  vim \
  lsof \
  ca-certificates \
  # `ss`, used by ghost-drone/entrypoint.sh's SITL readiness probe
  iproute2 \
  # shellcheck is one of the three linters CI gates on
  shellcheck \
  python3 \
  python3-pip \
  python3-venv \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Docker CLI + Compose v2 only. The daemon comes from the host through the
# socket mount in devcontainer.json, so `docker.io` (daemon + containerd) was
# far more than needed.
RUN install -m 0755 -d /etc/apt/keyrings \
  && curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc \
  && chmod a+r /etc/apt/keyrings/docker.asc \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends docker-ce-cli docker-compose-plugin \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# hadolint — the second CI linter. Arch-aware; the release publishes x86_64
# and arm64 under those names.
ARG HADOLINT_VERSION=2.12.0
RUN case "$(dpkg --print-architecture)" in \
      amd64) HL_ARCH=x86_64 ;; \
      arm64) HL_ARCH=arm64 ;; \
      *) echo "unsupported arch for hadolint" >&2; exit 1 ;; \
    esac \
  && curl -fsSL -o /usr/local/bin/hadolint \
     "https://github.com/hadolint/hadolint/releases/download/v${HADOLINT_VERSION}/hadolint-Linux-${HL_ARCH}" \
  && chmod +x /usr/local/bin/hadolint

RUN groupadd -f docker && usermod -aG docker node

RUN mkdir -p /usr/local/share/npm-global && \
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history across rebuilds (paired with the volume mount).
# The original set a SNIPPET variable here and never used it; the export it
# describes is applied by zsh-in-docker further down.
RUN mkdir /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R $USERNAME /commandhistory

ENV DEVCONTAINER=true

RUN mkdir -p /workspace /home/node/.claude && \
  chown -R node:node /workspace /home/node/.claude

WORKDIR /workspace

ARG GIT_DELTA_VERSION=0.18.2
RUN ARCH=$(dpkg --print-architecture) && \
  wget -q "https://github.com/dandavison/delta/releases/download/${GIT_DELTA_VERSION}/git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb" && \
  dpkg -i "git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb" && \
  rm "git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb"

USER node

ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin
ENV SHELL=/bin/zsh
ENV EDITOR=nano
ENV VISUAL=nano

ARG ZSH_IN_DOCKER_VERSION=1.2.0
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v${ZSH_IN_DOCKER_VERSION}/zsh-in-docker.sh)" -- \
  -p git \
  -p fzf \
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  -x

# Claude Code.
#
# There is deliberately no `alias claude="claude --dangerously-skip-permissions"`
# here. The image used to ship one, justified by init-firewall.sh locking egress
# down. That script is gone (it was written for a Windows host, allowlisted the
# wrong dev port, and nothing ever invoked it), so the alias would now mean
# skipping permissions with unrestricted network access. Pass the flag per
# session if you want it.
RUN curl -fsSL https://claude.ai/install.sh | bash

# uv, plus ruff pinned to the exact version CI uses. An unpinned ruff means the
# devcontainer and CI disagree about what is a lint error, which is the whole
# problem ruff.toml exists to prevent.
ARG RUFF_VERSION=0.16.1
RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    /home/node/.local/bin/uv tool install "ruff==${RUFF_VERSION}"

# pymavlink for poking at SITL directly (the connectors run in the drone
# container; this is for host-side debugging).
RUN python3 -m venv /home/node/.venv && \
    /home/node/.venv/bin/pip install --no-cache-dir --upgrade pip pymavlink

ENV PATH="/home/node/.local/bin:/home/node/.venv/bin:$PATH"

# ENV PATH alone is not enough. A login shell sources /etc/profile, which
# rebuilds PATH from scratch and drops both the venv and the npm-global bin —
# and VS Code opens login shells, so `python3` would silently be the system one
# without pymavlink. Re-assert the additions in the rc files each shell reads:
# .zshrc for interactive zsh (the default shell here), .bashrc for interactive
# bash, .profile for bash login shells.
RUN PATH_SNIPPET='export PATH="/home/node/.local/bin:/home/node/.venv/bin:/usr/local/share/npm-global/bin:$PATH"' \
  && for rc in /home/node/.zshrc /home/node/.bashrc /home/node/.profile; do \
       touch "$rc" && echo "$PATH_SNIPPET" >> "$rc"; \
     done

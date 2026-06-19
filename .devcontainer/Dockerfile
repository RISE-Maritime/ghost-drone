FROM node:20

ARG TZ
ENV TZ="$TZ"

ARG CLAUDE_CODE_VERSION=latest

# Install basic development tools, iptables/ipset, Python, and display libraries
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
  iptables \
  ipset \
  iproute2 \
  dnsutils \
  aggregate \
  jq \
  nano \
  vim \
  python3.11 \
  python3-pip \
  python3-venv \
  postgresql-client \
  libsdl2-dev \
  libsdl2-image-dev \
  libsdl2-mixer-dev \
  libsdl2-ttf-dev \
  libfreetype6-dev \
  libportmidi-dev \
  libnss3 \
  libnspr4 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libdbus-1-3 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libpango-1.0-0 \
  libcairo2 \
  libasound2 \
  libatspi2.0-0 \
  lsof \
  docker.io \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Allow node user to use Docker socket
RUN groupadd -f docker && usermod -aG docker node

# Ensure default node user has access to /usr/local/share
RUN mkdir -p /usr/local/share/npm-global && \
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history.
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  && mkdir /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R $USERNAME /commandhistory

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace /home/node/.claude && \
  chown -R node:node /workspace /home/node/.claude

WORKDIR /workspace

ARG GIT_DELTA_VERSION=0.18.2
RUN ARCH=$(dpkg --print-architecture) && \
  wget "https://github.com/dandavison/delta/releases/download/${GIT_DELTA_VERSION}/git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb" && \
  sudo dpkg -i "git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb" && \
  rm "git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb"

# Install zenoh router and bridge-remote-api
ARG ZENOH_VERSION=1.7.2

RUN wget -q https://github.com/eclipse-zenoh/zenoh/releases/download/${ZENOH_VERSION}/zenoh-${ZENOH_VERSION}-x86_64-unknown-linux-gnu-standalone.zip -O /tmp/zenoh.zip && \
    unzip /tmp/zenoh.zip -d /usr/local/bin && \
    rm /tmp/zenoh.zip

RUN wget -q https://github.com/eclipse-zenoh/zenoh-ts/releases/download/${ZENOH_VERSION}/zenoh-ts-${ZENOH_VERSION}-x86_64-unknown-linux-gnu-standalone.zip -O /tmp/zenoh-ts.zip && \
  unzip /tmp/zenoh-ts.zip -d /usr/local/bin && \
  rm /tmp/zenoh-ts.zip

# Set up non-root user
USER node

# Install global packages
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

# Set the default shell to zsh rather than sh
ENV SHELL=/bin/zsh

# Set the default editor and visual
ENV EDITOR=nano
ENV VISUAL=nano

# Default powerline10k theme
ARG ZSH_IN_DOCKER_VERSION=1.2.0
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v${ZSH_IN_DOCKER_VERSION}/zsh-in-docker.sh)" -- \
  -p git \
  -p fzf \
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  -x

# Install Claude
RUN curl -fsSL https://claude.ai/install.sh | bash && \
    echo 'alias claude="claude --dangerously-skip-permissions"' >> /home/node/.bashrc && \
    echo 'alias claude="claude --dangerously-skip-permissions"' >> /home/node/.zshrc

# # Install uv and Python tools
RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    /home/node/.local/bin/uv tool install black && \
    /home/node/.local/bin/uv tool install pgcli 

# # Install Playwright in a dedicated venv
# RUN python3 -m venv /home/node/.playwright-venv && \
#     /home/node/.playwright-venv/bin/pip install --no-cache-dir playwright && \
#     /home/node/.playwright-venv/bin/playwright install chromium && \
#     /home/node/.playwright-venv/bin/playwright install firefox

# Install agent-browser
RUN npm install -g agent-browser
RUN agent-browser install 

# Add uv, Python tools, and Playwright to PATH
ENV PATH="/home/node/.cargo/bin:/home/node/.local/bin:/home/node/.playwright-venv/bin:$PATH"

# Copy and set up firewall script
COPY init-firewall.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/init-firewall.sh && \
  echo "node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/node-firewall && \
  chmod 0440 /etc/sudoers.d/node-firewall
USER node

# Docker image for an HIV-TRACE Viz development environment (Red Hat Universal Base Image 8.10)
FROM redhat/ubi8:8.10

# Set up environment and install dependencies
RUN yum -y update && \
    yum install -y curl gcc-c++ git make python3.11 && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    source ~/.bashrc && \
    nvm install 18.18.2 && \
    nvm alias default 18.18.2 && \
    npm install --global yarn

# To compile HIV-TRACE Viz within the development environment:
#   yarn
#   yarn build

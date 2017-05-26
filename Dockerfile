FROM node:6.3-slim
MAINTAINER ipunkt Business Solutions <info@ipunkt.biz>

# slim doesn't have python & git, so we install it
RUN apt-get update && apt-get install -y python git bzip2 libfontconfig

# configure git, setting up a user
RUN git config --system user.name Docker && git config --system user.email docker@localhost

# Use phusion/baseimage-docker my_init script for proper pid 1 handling
COPY scripts/my_init /
RUN ["chmod", "775", "/my_init"]

# Entrypoint to execute all commands inside $HOME
COPY scripts/entrypoint.sh /
RUN ["chmod", "+x", "/entrypoint.sh"]

# define entrypoint
ENTRYPOINT ["/my_init", "--skip-runit", "/entrypoint.sh"]

# Globally install gulp and bower
RUN npm install -g gulp-cli bower \
	; mkdir -p /var/cache/npm && chmod 777 /var/cache/npm \
	; npm config set cache /var/cache/npm

# prepare pseudo project directory for npm_modules install
RUN ["mkdir", "/home/gulp"]
RUN ["chmod", "777", "/home/gulp"]

# Use the HOME variable to find our pseudo project because npm also uses this
# as the base path to store configuration
ENV HOME=/home/gulp

# Install gulp dependencies
COPY gulp/package.json /home/gulp/
RUN cd /home/gulp && npm install

COPY gulp/gulpfile.js /home/gulp/
COPY gulp/tasks /home/gulp/tasks
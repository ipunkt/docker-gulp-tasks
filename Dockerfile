FROM node:5.11
MAINTAINER ipunkt Business Solutions <info@ipunkt.biz>

# browser-sync port
EXPOSE 3001

# Use phusion/baseimage-docker my_init script for proper pid 1 handling
ADD scripts/my_init /
CMD chmod 775 "/my_init"

# Entrypoint to execute all commands inside $HOME
ADD scripts/entrypoint.sh /
CMD chmod +x /entrypoint.sh

# Globally install gulp and bower
RUN npm install -g gulp-cli bower \
	; mkdir -p /var/cache/npm && chmod 777 /var/cache/npm \
	; npm config set cache /var/cache/npm

# prepare pseudo project directory for npm_modules install
ADD gulp /home/gulp
RUN chmod 777 /home/gulp

# Use the HOME variable to find our pseudo project because npm also uses this
# as the base path to store configuration
ENV HOME=/home/gulp

# Install gulp dependencies
RUN cd /home/gulp && npm install

# define entrypoint
ENTRYPOINT ["/my_init", "--skip-runit", "/entrypoint.sh"]

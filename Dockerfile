FROM node:5.11.0

# browser-sync port
EXPOSE 3001

# prepare pseudo project directory for npm_modules install
RUN mkdir /home/gulp && chmod 777 /home/gulp
ADD package.json /home/gulp
ADD gulpfile.js /home/gulp/

RUN npm install -g gulp-cli bower browserify ractive \
	; mkdir -p /var/cache/npm && chmod 777 /var/cache/npm \
	; npm config set cache /var/cache/npm

# Install gulp dependencies
RUN cd /home/gulp && npm install

ADD tasks /usr/share/gulp/tasks

# Entrypoint to execute all commands inside $HOME
ADD entrypoint.sh /
CMD chmod +x /entrypoint.sh

# Use the HOME variable to find our pseudo project because npm also uses this
# as the base path to store configuration
ENV HOME=/home/gulp

ENTRYPOINT ["/entrypoint.sh"]

FROM node:5.11.0

# browser-sync
EXPOSE 3001
RUN npm install -g gulp-cli bower browserify ractive \
	; mkdir /home/gulp && chmod 777 /home/gulp \
	; mkdir -p /var/cache/npm && chmod 777 /var/cache/npm \
	; npm config set cache /var/cache/npm
ADD tasks /usr/share/gulp/tasks
ADD entrypoint.sh /
CMD chmod +x /entrypoint.sh

ENV HOME=/home/gulp

ENTRYPOINT ["/entrypoint.sh"]

FROM node:5.11.0

# browser-sync
EXPOSE 3001
RUN npm install -g gulp-cli bower browserify ractive
ADD tasks /usr/share/gulp/tasks
ADD entrypoint.sh /
CMD chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

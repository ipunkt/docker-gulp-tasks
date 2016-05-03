# Docker Gulp Tasks
Docker-Image with ready-to-use Gulp-Tasks.

## Dockerhub
https://hub.docker.com/r/ipunktbs/gulp-tasks/

Build by yourself:
`docker build -t ipunktbs/gulp-tasks .`

## Tasks

### css
Compiles sass and/or scss to css files using gulp-sass.
Also contains an autoprefixer, cssnano (minify), sourcemaps and browserSync
Sourcemaps will only be generated when running build:dev.
Same for browserSync.
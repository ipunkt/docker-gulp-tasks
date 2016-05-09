# Docker Gulp Tasks
Docker-Image with ready-to-use Gulp-Tasks.

## Dockerhub
https://hub.docker.com/r/ipunktbs/gulp-tasks/

Build by yourself:
`docker build -t ipunktbs/gulp-tasks .`

## Tasks

### clean
Deletes the dest/public directory as defined in your `gulp_config.json`.

### copy
Copies files from one directory to another.
Can be configured to copy as many individual files or directories as you want.
```js
"copy": [
  {
    "src": "YOUR_PATH/**/*", //supports glob syntax
    "base": "YOUR_BASE", //part of your path that will be your base; copy will start from here
    "dest": "YOUR_DEST_PATH"
  }
]
```

### css
Compiles sass and/or scss to css files using gulp-sass.
Also contains an autoprefixer, cssnano (minify), sourcemaps and gzip.
Sourcemaps will only be generated when running `gulp build:dev`.

```js
"css": {
  "src": "YOUR_SRC_DIR",
  "dest": "YOUR_DEST_DIR",
  "gzip": true, //false if you do not want to additionally gzip your resulting css files.
  "autoprefixer": {
    "browsers": ["last 3 version"]
  },
  "sass": { //see https://github.com/sass/node-sass#options
    "indentedSyntax": false,
    "includePaths": []
  },
  "extensions": ["sass", "scss", "css"] //sourcefile extensions you want to compile.
}
```

### browserify
Browserify / Watchify task; can be configured to use transforms (currently only ractify).
Also contains uglify, sourcemap and gzip.
Sourcemaps will only be generated when running `gulp build:dev`.

```js
"browserify": {
  "src": "YOUR/ENTRY/PATH/FILE.JS",
  "dest": "YOU/DEST/PATH/FILE.JS",
  "gzip": true, //false if you do not want to additionally gzip your resulting css files.
  "transforms": { //add your transforms here
    "ractify": {
      "extension": "html" //file extension for ractive components
    }
  }
}
```
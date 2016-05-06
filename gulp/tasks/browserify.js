'use strict';

if(!config.tasks.browserify) return;

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');
var path = require('path');

var paths = {
    src: path.join(config.root.src, config.tasks.browserify.src),
    dest: path.join(config.root.dest, config.tasks.browserify.dest)
};

function browserifyTask(watch) {
    var props = {
        entries: paths.src
    };

    //choose between browserify and watchify
    var b = watch ? watchify(props) : browserify(props);

    //iterate through every transform in config and call them
    for(var transform in config.tasks.transforms) {
        if (config.tasks.transforms.hasOwnProperty(transform)) {
            var options = config.tasks.transforms[transform];
            b.transform(options, require(transform));
        }
    }

    function bundle() {
        var stream = b.bundle({debug: false});
        return stream.on('error', gutil.log)
            .pipe(source(file))
            .pipe(buffer())
            .pipe(gulpif(global.development, sourcemaps.init()))
            .pipe(gulpif(!global.development, uglify()))
            .pipe(gulpif(global.development, sourcemaps.write()))
            .pipe(gulp.dest(paths.dest))
            .pipe(gulpif(!global.development && config.tasks.browserify.gzip, gzip())) //gzip AFTER output; this should keep the original files
            .pipe(gulpif(!global.development && config.tasks.browserify.gzip, gulp.dest(paths.dest))) //output gzipped files
            .pipe(gulpif(global.development, browserSync.stream()));
    }

    //only relevant for watchify
    bundler.on('update', function() {
        bundle();
    });
    return bundle();
}

gulp.task('browserify', function() {
    return browserifyTask(false);
});

gulp.task('browserify:watch', function(){
    global.development = true;
    return browserifyTask(true);
});
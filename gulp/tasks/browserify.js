'use strict';

if(!config.browserify) return;

var gulp = require('gulp');
var gutil = require('gulp-util');
var chalk = require('chalk');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');
var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');

var paths = {
    src: path.join(projectPath, config.browserify.src),
    dest: path.join(projectPath, path.dirname(config.browserify.dest)),
    destBase: path.basename(config.browserify.dest)
};

function browserifyTask(watch) {
    var b = browserify({
        entries: paths.src,
        cache : {},
        packageCache: {}
    });

    if (watch) {
        b.plugin(watchify, {
            delay: 500,
            ignoreWatch: ['**/node_modules/**'],
            poll: true
        });
    }

    //iterate through every transform in config and call them
    for(var transform in config.browserify.transforms) {
        if (config.browserify.transforms.hasOwnProperty(transform)) {
            var options = config.browserify.transforms[transform];
            b.transform(options, require(transform));
        }
    }

    function bundle() {
        var stream = b.bundle();
        return stream.on('error', gutil.log)
            .pipe(source(paths.destBase))
            .pipe(buffer())
            .pipe(gulpif(global.development, sourcemaps.init()))
            .pipe(gulpif(!global.development, uglify()))
            .pipe(gulpif(global.development, sourcemaps.write()))
            .pipe(gulp.dest(paths.dest))
            .pipe(gulpif(!global.development && config.browserify.gzip, gzip())) //gzip AFTER output; this should keep the original files
            .pipe(gulpif(!global.development && config.browserify.gzip, gulp.dest(paths.dest))); //output gzipped files
    }

    //only relevant for watchify
    b.on('update', function() {
        gutil.log('Starting', '\'' + chalk.cyan('browserify') + '\'...');

        var startTime = Date.now();
        bundle();
        var diffTime = Date.now() - startTime;

        gutil.log(
            'Finished', '\'' + chalk.cyan('browserify') + '\'',
            'after', chalk.magenta(diffTime), 'ms'
        );
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
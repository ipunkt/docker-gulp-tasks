'use strict';

if(!config.less) return;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gzip = require('gulp-gzip');
var path = require('path');

var paths = {
    src: path.join(projectPath, config.less.src),
    dest: path.join(projectPath, config.less.dest)
};

gulp.task('less', function() {
    return gulp.src(paths.src)
        //sourcemaps init
        .pipe(gulpif(global.development, sourcemaps.init()))

        //less
        .pipe(less(config.less.options))

        //autoprefix, cssnano, finish sourcemaps, gzip and output
        .pipe(autoprefixer(config.less.autoprefixer))
        .pipe(gulpif(!global.development, cssnano({autoprefixer: false})))
        .pipe(gulpif(global.development, sourcemaps.write()))
        .pipe(gulp.dest(paths.dest)) //output files
        .pipe(gulpif(!global.development && config.less.gzip, gzip())) //gzip AFTER output; this should keep the original files
        .pipe(gulpif(!global.development && config.less.gzip, gulp.dest(paths.dest))); //output gzipped files
});

gulp.task('less:watch', function(){
    global.development = true;
    gulp.watch(paths.src, ['less']);
});

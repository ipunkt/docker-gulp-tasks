'use strict';

if(!config.sass) return;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gzip = require('gulp-gzip');
var path = require('path');

var paths = {
    src: path.join(projectPath, config.sass.src),
    dest: path.join(projectPath, config.sass.dest)
};

gulp.task('sass', function() {
    return gulp.src(paths.src)
        //sourcemaps init
        .pipe(gulpif(global.development, sourcemaps.init()))

        //sass
        .pipe(sass(config.sass.options).on('error', sass.logError)) //switch between either sass

        //autoprefix, cssnano, finish sourcemaps, gzip and output
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(gulpif(!global.development, cssnano({autoprefixer: false})))
        .pipe(gulpif(global.development, sourcemaps.write()))
        .pipe(gulp.dest(paths.dest)) //output files
        .pipe(gulpif(!global.development && config.sass.gzip, gzip())) //gzip AFTER output; this should keep the original files
        .pipe(gulpif(!global.development && config.sass.gzip, gulp.dest(paths.dest))); //output gzipped files
});

gulp.task('sass:watch', function(){
    global.development = true;
    gulp.watch(paths.src, ['css']);
});
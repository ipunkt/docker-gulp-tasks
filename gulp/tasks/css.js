'use strict';

if(!config.tasks.css) return;

if (typeof config.tasks.css.sass !== 'undefined'
    && typeof config.tasks.css.less !== 'undefined') {
    console.log("Please define either Sass OR Less in your config. Cannot use both.");
    return;
}

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gzip = require('gulp-gzip');
var path = require('path');

var paths = {
    src: path.join(config.root.src, config.tasks.css.src, '/**/*.{,' + config.tasks.css.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.css.dest)
};

gulp.task('css', function() {
    return gulp.src(paths.src)
        //sourcemaps init
        .pipe(gulpif(global.development, sourcemaps.init()))
        //sass or less
        .pipe(gulpif (typeof config.tasks.css.sass !== 'undefined', sass(config.tasks.css.sass).on('error', sass.logError))) //switch between either sass
        .pipe(gulpif (typeof config.tasks.css.less !== 'undefined', less(config.tasks.css.less))) //or less, as defined in config
        //autoprefix, cssnano, finish sourcemaps, gzip and output
        .pipe(autoprefixer(config.tasks.css.autoprefixer))
        .pipe(gulpif(!global.development, cssnano({autoprefixer: false})))
        .pipe(gulpif(global.development, sourcemaps.write()))
        .pipe(gulp.dest(paths.dest)) //output files
        .pipe(gulpif(!global.development && config.tasks.css.gzip, gzip())) //gzip AFTER output; this should keep the original files
        .pipe(gulpif(!global.development && config.tasks.css.gzip, gulp.dest(paths.dest))); //output gzipped files
});

gulp.task('css:watch', function(){
    global.development = true;
    gulp.watch(paths.src, ['css']);
});
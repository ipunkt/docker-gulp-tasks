'use strict';

if(!config.tasks.css) return;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var path = require('path');

var paths = {
    src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.css.dest)
};

gulp.task('css', function() {
    return gulp.src(paths.src)
        .pipe(gulpif(global.development, sourcemaps.init()))
        .pipe(sass(config.tasks.css.sass).on('error', sass.logError))
        .pipe(autoprefixer(config.tasks.css.autoprefixer))
        .pipe(gulpif(!global.development, cssnano({autoprefixer: false})))
        .pipe(gulpif(global.development, sourcemaps.write()))
        .pipe(gulp.dest(paths.dest))
        .pipe(gulpif(global.development, browserSync.stream()))
});

gulp.task('css:watch', function(){
    global.development = true;
    gulp.watch(paths.src, ['css']);
});
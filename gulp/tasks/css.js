'use strict';

if(!config.css) return;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gzip = require('gulp-gzip');
var path = require('path');

var paths = {
    src: path.join(projectPath, config.css.src),
    dest: path.join(projectPath, config.css.dest)
};

gulp.task('css', function() {
    return gulp.src(paths.src)
        //autoprefix, cssnano, and output
        .pipe(autoprefixer(config.css.autoprefixer))
        .pipe(gulpif(!global.development, cssnano({autoprefixer: false})))

        //output files
        .pipe(gulp.dest(paths.dest))

        //gzip AFTER output; this should keep the original files
        .pipe(gulpif(!global.development && config.css.gzip, gzip()))
        .pipe(gulpif(!global.development && config.css.gzip, gulp.dest(paths.dest)));
});

gulp.task('css:watch', function(){
    global.development = true;
    gulp.watch(paths.src, ['css']);
});

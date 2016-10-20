'use strict';

if(!config.sass) return;

var fs = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gzip = require('gulp-gzip');
var path = require('path');
var rev = require('gulp-rev');
var fs = require('fs');

const sassError  = require('gulp-sass-error').gulpSassError;
const throwError = true;

var paths = {
    src: path.join(projectPath, config.sass.src),
    dest: path.join(projectPath, config.sass.dest),
    manifest: path.join(projectPath, config.sass.manifest)
};

gulp.task('sass', function() {

    //overwrite rev-manifest as empty json-object
    fs.writeFileSync(path.join(paths.manifest, 'rev-manifest.json'), '{}');

    return gulp.src(paths.src)
        //sourcemaps init
        .pipe(gulpif(global.development, sourcemaps.init()))

        //sass
        .pipe(sass(config.sass.options).on('error', sassError(throwError))) //switch between either sass

        //autoprefix, cssnano, finish sourcemaps, gzip and output
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(gulpif(!global.development, cssnano({autoprefixer: false})))
        .pipe(gulpif(global.development, sourcemaps.write()))
        .pipe(gulp.dest(paths.dest)) //output files

        .pipe(gulpif(!global.development && config.sass.gzip, gzip())) //gzip AFTER output; this should keep the original files
        .pipe(gulpif(!global.development && config.sass.gzip, gulp.dest(paths.dest))) //output gzipped files

        .pipe(gulpif(config.sass.revision, rev()))
        .pipe(gulpif(config.sass.revision, gulp.dest(paths.dest))) //write rev'd file
        .pipe(gulpif(config.sass.revision, rev.manifest()))
        .pipe(gulpif(config.sass.revision, gulp.dest(paths.manifest))); //write rev-manifest
});

gulp.task('sass:watch', function(){
    global.development = true;
    gulp.watch(paths.src, ['sass']);
});

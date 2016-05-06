'use strict';

var gulp   = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
   return gulp.src(config.root.dest, {read: false})
       .pipe(clean());
});
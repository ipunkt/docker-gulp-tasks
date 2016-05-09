'use strict';

if(!config.clean) return;

var gulp   = require('gulp');
var clean = require('gulp-clean');
var path = require('path');

gulp.task('clean', function() {
   return gulp.src(path.join(projectPath, config.clean.path), {read: false})
       .pipe(clean());
});
'use strict';

if(!config.bower) return;

var gulp = require('gulp');
var bower = require('gulp-bower');
var path = require('path');

var paths = {
    directory: config.bower.directory,
    cwd: projectPath,
    dest: path.join(projectPath,config.bower.dest)
};

function bowerTask() {
    return bower({directory: paths.directory, cwd: paths.cwd})
        .pipe(gulp.dest(paths.dest));
}

gulp.task('bower', function() {
    return bowerTask();
});

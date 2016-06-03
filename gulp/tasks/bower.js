'use strict';

if(!config.bower) return;

var gulp = require('gulp');
var bower = require('gulp-bower');
var path = require('path');

var paths = {
    directory: config.bower.directory,
    cwd: projectPath,
    dest: config.bower.dest ? path.join(projectPath,config.bower.dest) : false
};

function bowerTask() {
    var b = bower({directory: paths.directory, cwd: paths.cwd});
    if (paths.dest !== false) {
        b.pipe(gulp.dest(paths.dest));
    }
    return b;
}

gulp.task('bower', function() {
    return bowerTask();
});

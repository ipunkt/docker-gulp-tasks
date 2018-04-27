'use strict';

if(!config.rename || config.rename.length < 1) return;

var gulp   = require('gulp');
var path = require('path');
var rename = require("gulp-rename");
var merge = require('merge-stream');

function getPaths() {
    var paths = [];
    config.rename.forEach(function(copyPath) {
        var src = path.join(projectPath, copyPath.src);
        var dest = path.join(projectPath, copyPath.dest);
        var rename = copyPath.rename;
        paths.push({src: src, dest: dest, rename: rename});
    });

    return paths;
}

gulp.task('rename', function() {
    var paths = getPaths();

    var tasks = paths.map(function(path) {
        return gulp.src(path.src)
            .pipe(rename(path.rename))
            .pipe(gulp.dest(path.dest));
    });

    return merge(tasks);
});
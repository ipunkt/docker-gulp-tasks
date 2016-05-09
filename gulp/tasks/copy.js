'use strict';

if(!config.copy || config.copy.length < 1) return;

var gulp   = require('gulp');
var path = require('path');
var merge = require('merge-stream');

function getPaths() {
    var paths = [];
    config.copy.forEach(function(copyPath) {
        var src = path.join(projectPath, copyPath.src);
        var dest = path.join(projectPath, copyPath.dest);
        var base =  path.join(projectPath, copyPath.base);
        paths.push({src: src, dest: dest, base: base});
    });

    return paths;
}

gulp.task('copy', function() {
    var paths = getPaths();

    var tasks = paths.map(function(path) {
        return gulp.src(path.src, {base: path.base})
            .pipe(gulp.dest(path.dest));
    });

    return merge(tasks);
});
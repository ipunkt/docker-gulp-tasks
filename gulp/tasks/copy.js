'use strict';

if(!config.tasks.copy || config.tasks.copy.length < 1) return;

var gulp   = require('gulp');
var path = require('path');
var merge = require('merge-stream');

function getPaths() {
    var paths = [];
    config.tasks.copy.forEach(function(copyPath) {
        var src = path.join(config.root.src, copyPath.src);
        var dest = path.join(config.root.dest, copyPath.dest);
        var base =  path.join(config.root.src, copyPath.base);
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
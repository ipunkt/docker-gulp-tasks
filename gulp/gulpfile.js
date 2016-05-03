var gulp = require('gulp');
var requireDir = require('require-dir');
var gulpSequence = require('gulp-sequence');
global.config = require('./project/gulp_config');

requireDir('./tasks', {recurse: true});
require('./project/gulpfile');

var buildDev = function(cb) {
    global.development = true;
    gulpSequence('build', cb);
};

gulp.task('build:dev', buildDev);
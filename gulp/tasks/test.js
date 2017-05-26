'use strict';

if(!config.test) return;

var gulp   = require('gulp');
var path   = require('path');
var Server = require('karma').Server;

var paths = {
    configFile: path.join(projectPath, config.test.configFile)
};

gulp.task('test', function (done) {
    new Server({
        configFile: paths.configFile,
        singleRun: true
    }, done).start();
});
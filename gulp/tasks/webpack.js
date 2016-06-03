'use strict';

if(!config.webpack) return;

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

function webpackTask(watch, callback) {
    //chdir to our project path to make webpack work as intended
    var oldPath = process.cwd();
    process.chdir(projectPath);

    //setup webpack
    var w = webpack(config.webpack);

    function webpackCallback(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    }

    //run webpack either in watch mode or normal (once)
    if (watch) {
        w.watch({
            aggregateTimeout: 500,
            poll: 500
        }, webpackCallback);
    } else {
        w.run(webpackCallback);
    }

    //go back to our old path
    process.chdir(oldPath);
}


gulp.task("webpack", function(callback) {
    return webpackTask(false, callback);
});


gulp.task("webpack:watch", function(callback) {
    return webpackTask(true, callback);
});
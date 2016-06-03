'use strict';

if(!config.webpack) return;

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

gulp.task("webpack", function(callback) {
    //chdir to our project path to make webpack work as intended
    var oldPath = process.cwd();
    process.chdir(projectPath);

    //run webpack
    webpack(config.webpack, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });

    //go back to our old path
    process.chdir(oldPath);
});
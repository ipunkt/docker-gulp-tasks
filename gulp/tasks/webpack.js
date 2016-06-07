'use strict';

if(!config.webpack) return;

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

function webpackTask(watch, callback) {
    //setup webpack
    var webpackConfig = config.webpack;

    if (!global.development) {
        if (typeof webpackConfig.plugins === 'undefined') {
            webpackConfig.plugins = [];
        }

        webpackConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new webpack.optimize.DedupePlugin()
        );
    }

    var w = webpack(webpackConfig);

    function webpackCallback(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({colors: true, childen: false, assets: false, modules: false, chunkModules: false}));
        if (!watch) callback();
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
}


gulp.task("webpack", function(callback) {
    return webpackTask(false, callback);
});


gulp.task("webpack:watch", function(callback) {
    return webpackTask(true, callback);
});
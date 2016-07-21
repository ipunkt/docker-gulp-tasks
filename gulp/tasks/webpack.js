'use strict';

if(!config.webpack) return;

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

function webpackTask(watch, callback) {
    //setup webpack
    var webpackConfig = config.webpack;

    if (typeof webpackConfig.plugins === 'undefined') {
        webpackConfig.plugins = [];
    }

    if (global.development) {
        webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: true
                }
            })
        );
    } else {
        webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurrenceOrderPlugin()
        );

        /**
         * Deactivate caching for production-builds
         * @type {boolean}
         */
        webpackConfig.cache = false;
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
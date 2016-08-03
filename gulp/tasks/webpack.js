'use strict';

if(!config.webpack) return;

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

function webpackTask(watch, callback) {
    //setup webpack
    var webpackConfig = config.webpack;

    if (Array.isArray(webpackConfig)) {
        webpackConfig.map(function(conf) {
            return setupConfig(conf);
        });
    } else {
        webpackConfig = setupConfig(webpackConfig);
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

function setupConfig(conf) {
    if (typeof conf.plugins === 'undefined') {
        conf.plugins = [];
    }

    if (global.development) {
        conf.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: true
            })
        );
    } else {
        conf.plugins.push(
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
        conf.cache = false;
    }

    return conf;
}


gulp.task("webpack", function(callback) {
    return webpackTask(false, callback);
});


gulp.task("webpack:watch", function(callback) {
    return webpackTask(true, callback);
});
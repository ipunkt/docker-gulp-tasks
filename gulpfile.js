var requireDir = require('require-dir');

requireDir('/usr/share/gulp/tasks', {recurse: true});
require('./project/gulpfile.js');

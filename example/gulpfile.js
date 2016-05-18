var gulp   = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('watch', ['sass:watch']);

gulp.task('build', function(cb) {
    gulpSequence('clean','bower',['sass','browserify'], cb);
});
var gulp   = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('watch', ['css:watch']);
gulp.task('build', function(cb) {
    gulpSequence('clean',['css','browserify'], cb);
});
var gulp = require('gulp');

// Import dependencies
var jshint = require('gulp-jshint');

var source = 'app/';
// Define tasks

// Lint Task
gulp.task('lint', function () {
    gulp.src(source + 'js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
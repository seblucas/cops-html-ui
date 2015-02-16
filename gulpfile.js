'use strict';

var gulp = require('gulp');

// Import dependencies
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var rename = require('gulp-rename');

var source = 'app/';

var publishdir = 'public';
var dist = {
all: [publishdir + '/**/*'],
css: publishdir + '/css/',
js: publishdir + '/js/',
font: publishdir + '/fonts/',
vendor: publishdir + '/static/'
};
// Define tasks

// Lint Task
gulp.task('lint', function () {
    gulp.src(source + 'js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js');
    var cssFilter = gulpFilter('**/*.css');
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(cssFilter.restore())
        .pipe(fontFilter)
        .pipe(gulp.dest(dist.font));
});

gulp.task('js', function() {
    return gulp.src([source + '**/*.js', '!' + source + 'bower_components/**/*.js'])
        .pipe(concat('cops.js'))
        .pipe(gulp.dest(dist.js));
});

gulp.task('css', function() {
    return gulp.src([source + '**/*.css', '!' + source + 'bower_components/**/*.css'])
        .pipe(concat('cops.css'))
        .pipe(gulp.dest(dist.css));
});

gulp.task('default', ['bower', 'css', 'js']); // development

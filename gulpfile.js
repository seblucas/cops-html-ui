'use strict';

var gulp = require('gulp');

// Import dependencies
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var debug = require('gulp-debug');

var source = 'app/';

var publishdir = 'public';
var dist = {
css: publishdir + '/css/',
js: publishdir + '/js/',
fonts: publishdir + '/fonts/',
lang: publishdir + '/lang/',
partials: publishdir + '/partials/'
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
        .pipe(debug())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(cssFilter.restore())
        .pipe(fontFilter)
        .pipe(gulp.dest(dist.fonts));
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

gulp.task('index', function() {
    return gulp.src([source + 'index_prod.html'])
        .pipe(gulp.dest(publishdir));
});

gulp.task('lang', function() {
    return gulp.src([source + 'lang/*'])
        .pipe(gulp.dest(dist.lang));
});

gulp.task('partials', function() {
    return gulp.src([source + 'partials/*'])
        .pipe(gulp.dest(dist.partials));
});

gulp.task('other', ['index', 'lang', 'partials']);

gulp.task('default', ['bower', 'css', 'js', 'other']); // development

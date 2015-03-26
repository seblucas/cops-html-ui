'use strict';

var gulp = require('gulp');

// Import dependencies
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var bootlint = require('gulp-bootlint');
var gulpFilter = require('gulp-filter');
var karma = require('gulp-karma');
var templateCache = require('gulp-angular-templatecache');

var source = 'app/';

var jsSources = [source + 'app.module.js',
                 source + 'app.config.js',
                 source + '**/*.js',
                 '!' + source + 'bower_components/**/*.js',
                 '!' + source + '**/*.spec.js',
                 '!' + source + '**/*.mock.js'];

var cssSources = [source + '**/*.css',
                  '!' + source + 'bower_components/**/*.css'];

var htmlSources = [source + '**/*.html',
                   '!' + source + 'index*.html'];

var publishdir = 'public';
var dist = {
css: publishdir + '/css/',
js: publishdir + '/js/',
fonts: publishdir + '/fonts/',
lang: publishdir + '/lang/'
};
// Define tasks

// Lint Task
gulp.task('bootlint', function () {
    gulp.src([source + '**/*.html'])
        .pipe(bootlint({
          disabledIds: ['E001', 'W001', 'W002', 'W003', 'W005']
        }));
});


// Lint Task
gulp.task('lint', function () {
    gulp.src(jsSources)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js');
    var cssFilter = gulpFilter('**/*.css');
    var fontFilter = gulpFilter('**/*.{otf,eot,svg,ttf,woff,woff2}');

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
        .pipe(gulp.dest(dist.fonts));
});

gulp.task('js', function() {
    return gulp.src(jsSources)
        .pipe(concat('cops.js'))
        .pipe(gulp.dest(dist.js));
});

gulp.task('css', function() {
    return gulp.src(cssSources)
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

gulp.task('html', function() {
  return gulp.src(htmlSources)
        .pipe(templateCache('templates.js', { standalone: true }))
        .pipe(gulp.dest(dist.js));
});

gulp.task('other', ['index', 'lang', 'html']);

gulp.task('default', ['bower', 'css', 'js', 'other']);

gulp.task('watch', ['default'], function() {
  gulp.watch(cssSources, ['css']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(htmlSources, ['html']);
}); // development

gulp.task('test', ['default'], function() {
  return gulp.src('./idontexist') // All the files are defined in karma.conf.js so use a dummy file
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('ci', ['lint', 'bootlint', 'test']);

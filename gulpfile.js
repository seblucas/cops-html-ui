'use strict';

var gulp = require('gulp');

// Import dependencies
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var bootlint = require('gulp-bootlint');
var gulpFilter = require('gulp-filter');
var replace = require('gulp-replace');
var Server = require('karma').Server;
var templateCache = require('gulp-angular-templatecache');
var plato = require('plato');

var source = 'app/';

var jsSources = [source + 'app.module.js',
                 source + 'app.config.js',
                 source + '**/*.js',
                 '!' + source + 'bower_components/**/*.js',
                 '!' + source + '**/*.spec.js',
                 '!' + source + '**/*.e2e.js',
                 '!' + source + '**/*.mock.js'];

var cssSources = [source + '**/*.css',
                  '!' + source + 'bower_components/**/*.css'];

var htmlSources = [source + '**/*.html',
                   '!' + source + 'bower_components/**/*.html',
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
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var fontFilter = gulpFilter('**/*.{otf,eot,svg,ttf,woff,woff2}', {restore: true});

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(cssFilter.restore)
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
        .pipe(replace(/"content\.series\.data"\:(.*?)\{0\}(.*?),/g, '"content.series.data":$1{{number}}$2,'))
        .pipe(replace(/"content\.series\.data"\:(.*?)\{1\}(.*?),/g, '"content.series.data":$1{{name}}$2,'))
        .pipe(replace(/"splitByLetter\.letter"\:(.*?)\{0\}(.*?),/g, '"splitByLetter.letter":$1{{category}}$2,'))
        .pipe(replace(/"splitByLetter\.letter"\:(.*?)\{1\}(.*?),/g, '"splitByLetter.letter":$1{{letter}}$2,'))
        .pipe(replace('"bookword.title"', '"books.title"'))
        .pipe(replace('authorword', 'authorsword'))
        .pipe(replace('tagword', 'tagsword'))
        .pipe(replace('bookword', 'booksword'))
        .pipe(replace('publisherword', 'publishersword'))
        .pipe(replace('ratingword', 'ratingsword'))
        .pipe(replace('languageword', 'languagesword'))
        .pipe(gulp.dest(dist.lang));
});

gulp.task('plato', function() {
  var jsPlato = [source + 'app.module.js',
                 source + 'app.config.js',
                 source + '**/*.controller.js',
                 source + '**/*.service.js',
                 source + '**/*.route.js'];
  var outputDir = './plato';
  // null options for this example
  var options = {
    title: 'COPS'
  };

  var callback = function (report){
  // once done the analysis,
  // execute this
  };

  return plato.inspect(jsPlato, outputDir, options, callback);
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

gulp.task('test', ['default'], function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('ci', ['lint', 'bootlint', 'test']);

'use strict';

var gulp = require('gulp');

// Import dependencies
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var bootlint = require('gulp-bootlint');
var gulpFilter = require('gulp-filter');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var zip = require('gulp-zip');
var Server = require('karma').Server;
var templateCache = require('gulp-angular-templatecache');
var plato = require('plato');
var protractor = require('gulp-protractor').protractor;
var webdriver_update = require('gulp-protractor').webdriver_update;

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
lang: publishdir + '/lang/',
mock: publishdir + '/mock/',
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
  var options = {
    title: 'COPS'
  };

  return plato.inspect(jsPlato, outputDir, options, function() {});
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

gulp.task('protractor:js', function() {
    return gulp.src([source + 'bower_components/angular-mocks/angular-mocks.js',
                     'protractor/js/*.js'])
        .pipe(gulp.dest(dist.js));
});

gulp.task('protractor:mock', function() {
    return gulp.src(['protractor/mock/*.txt'])
        .pipe(gulp.dest(dist.mock));
});

gulp.task('protractor:index', function() {
    return gulp.src([source + 'index_prod.html'])
        .pipe(replace(/<!-- e2e -->/g, '<script src="js/angular-mocks.js"></script><script src="js/CopsE2E.js"></script>'))
        .pipe(replace(/ng-app="Cops"/g, 'ng-app="CopsE2E"'))
        .pipe(rename('index_protractor.html'))
        .pipe(gulp.dest(publishdir));
});

gulp.task('protractor:webserver:start', function () {
  connect.server({
    root: 'public',
    port: 4321
  });
});

gulp.task('protractor:webserver:stop', function() {
  connect.serverClose();
});

gulp.task('protractor:prepare', ['protractor:index', 'protractor:js', 'protractor:mock']);

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

gulp.task('protractor', ['webdriver_update', 'protractor:prepare', 'protractor:webserver:start'], function() {

  gulp.src([source + '**/*.e2e.js'])
    .pipe(protractor({
        configFile: 'protractor.conf.js'
  }))
  .on('error', function(e) { throw e; })
  .on('end', function() { connect.serverClose(); });
});


gulp.task('archive', function() {
    return gulp.src([publishdir + '/**',
          '!' + publishdir + '/mock',    // Trick to exclude both directory
          '!' + publishdir + '/mock/**', // and directory content
          '!' + publishdir + '/js/angular-mocks.js',
          '!' + publishdir + '/js/CopsE2E.js',
          '!' + publishdir + '/index_protractor.html',
          ])
        .pipe(zip('cops-html-ui.zip'))
        .pipe(gulp.dest('.'));
});

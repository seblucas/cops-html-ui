'use strict';

var config = {
  onPrepare: function() {

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
        $animate.enabled(false);
      }]);
    };

    global.deleteDatabase = function() {
      return browser.executeAsyncScript(function(cb) {
        localforage.clear(function(err) {
            // Run this code once the database has been entirely deleted.
            cb(err);
            console.log('Database is now empty.');
        });
      });
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);
  },
  //seleniumArgs: ['-Dwebdriver.edge.driver=node_modules/protractor/selenium/MicrosoftWebDriver.exe'],
  baseUrl: 'http://127.0.0.1:4321/index_protractor.html',
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
                'args': ['lang=en-US']}
  },
  rootElement: 'html',
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    includeStackTrace: true
  },
  specs: ['app/**/*.e2e.js']
};


if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.sauceBuild = process.env.TRAVIS_BUILD_NUMBER;
  config.multiCapabilities = [
  {
    'name': 'cops-html-ui chrome node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'chrome',
    'platform': 'Windows 8.1',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },
  {
    'name': 'cops-html-ui IE11 node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'internet explorer',
    'platform': 'Windows 8.1',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },/*
  {
    'name': 'cops-html-ui Edge node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'MicrosoftEdge',
    'platform': 'Windows 10',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },*/
  {
    'name': 'cops-html-ui safari node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'safari',
    'platform': 'OS X 10.11',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },
  {
    'name': 'cops-html-ui firefox node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'firefox',
    'build': process.env.TRAVIS_BUILD_NUMBER
  }];
}

exports.config = config;

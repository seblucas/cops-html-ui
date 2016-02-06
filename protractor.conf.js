'use strict';

var config = {
  onPrepare: function() {

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
        $animate.enabled(false);
      }]);
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);
  },
  baseUrl: 'http://localhost:8086/index_protractor.html',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['app/**/*.e2e.js']
};


if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = {
    'name': 'cops-html-ui node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'chrome',
    'build': process.env.TRAVIS_BUILD_NUMBER
  };
}

exports.config = config;

'use strict';

exports.config = {
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

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
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost/ncops-angular/public/index_prod.html',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['app/**/*.e2e.js']
};

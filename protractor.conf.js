'use strict';

exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost/ncops-angular/public/',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['app/**/*.e2e.js']
};

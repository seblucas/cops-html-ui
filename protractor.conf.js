'use strict';

var config = {
  baseUrl: 'http://127.0.0.1:8086/index_protractor.html',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['app/**/*.e2e.js']
};


if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.multiCapabilities = [
  {
    'name': 'cops-html-ui chrome Linux node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'chrome',
    'platform': 'Linux',
    'seleniumVersion': '2.48.2',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },
  /*{
    'name': 'cops-html-ui chrome W10 node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'chrome',
    'platform': 'Windows 10',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },
  {
    'name': 'cops-html-ui Edge node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'microsoftedge',
    'platform': 'Windows 10',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },
  {
    'name': 'cops-html-ui safari node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'safari',
    'platform': 'OS X 10.11',
    'seleniumVersion': '2.48.2',
    'build': process.env.TRAVIS_BUILD_NUMBER
  },*/
  {
    'name': 'cops-html-ui firefox node v' + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'browserName': 'firefox',
    'seleniumVersion': '2.48.2',
    'build': process.env.TRAVIS_BUILD_NUMBER
  }];
}

exports.config = config;

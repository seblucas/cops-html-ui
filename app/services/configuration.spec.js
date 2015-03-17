'use strict';

describe('configurationServices', function(){

  var instanceVersion = 0, configurationServices, rootScope, $localForage;

  var triggerDigests = function() {
    return setInterval(function() {
      rootScope.$digest();
    }, 10);
  };
  var stopDigests = function(interval) {
    window.clearInterval(interval);
  };

  beforeEach(function() {
    module('Cops.services');
    inject(function (_configurationServices_, _$rootScope_, _$localForage_) {
      rootScope = _$rootScope_;
      $localForage = _$localForage_;
      configurationServices = _configurationServices_;
    });
  });

  // Borrowed from https://github.com/ocombe/angular-localForage/blob/master/tests/angular-localForage.js
  afterEach(function(done) {
    var interval = triggerDigests();
    // create a fresh instance
    $localForage.clear().then(function() {
      $localForage = $localForage.createInstance({
        name: ++instanceVersion
      });
      stopDigests(interval);
      done();
    }, done);
  });

  it('should use the webSQL storage driver', function() {
    expect(configurationServices.getDriver()).toBe('webSQLStorage');
  });

  it('should return the configuration default values', function(done) {
    var interval = triggerDigests();
    configurationServices.load().then(function(conf) {
      stopDigests(interval);
      expect(conf.booksPerPage).toBe(96);
      done();
    });
  });
});

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

  it('should return the configuration default values when empty', function(done) {
    var interval = triggerDigests();
    configurationServices.load().then(function(conf) {
      stopDigests(interval);
      expect(conf.booksPerPage).toBe(96);
      done();
    });
  });

  it('should return the configuration default values even if incomplete data is already there', function(done) {
    var interval = triggerDigests();
    var startValues = {
      categoriesPerPage: 2
    };
    $localForage.setItem('cops-configuration', startValues)
                         .then(function(startConf) {
      expect(startConf.categoriesPerPage).toBe(2);

      configurationServices.load().then(function(conf) {
        stopDigests(interval);
        expect(conf.categoriesPerPage).toBe(2);
        expect(conf.booksPerPage).toBe(96);
        done();
      });
    });
  });

  it('should return the configuration default values even if a null value is already there', function(done) {
    var interval = triggerDigests();
    var startValues = {
      booksPerPage: null,
      categoriesPerPage: 2
    };
    $localForage.setItem('cops-configuration', startValues)
                         .then(function(startConf) {
      expect(startConf.categoriesPerPage).toBe(2);

      configurationServices.load().then(function(conf) {
        stopDigests(interval);
        expect(conf.categoriesPerPage).toBe(2);
        expect(conf.booksPerPage).toBe(96);
        done();
      });
    });
  });

  it('should save the new configuration provided', function(done) {
    var interval = triggerDigests();
    configurationServices.load()
                         .then(function(defaultConf) {
      expect(defaultConf.categoriesPerPage).toBe(192);
      defaultConf.categoriesPerPage = 12;

      configurationServices.save(defaultConf).then(function(conf) {
        stopDigests(interval);
        expect(conf.categoriesPerPage).toBe(12);
        expect(conf.booksPerPage).toBe(96);
        done();
      });
    });
  });

  it('should set to 42 the categories per page', function(done) {
    var interval = triggerDigests();
    configurationServices.setValue(configurationServices.constants.categoriesPerPage, 42)
                         .then(function(conf) {
      stopDigests(interval);
      expect(conf.categoriesPerPage).toBe(42);
      expect(conf.booksPerPage).toBe(96);
      done();
    });
  });
});

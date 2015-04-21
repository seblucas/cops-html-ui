'use strict';

describe('controllerHelperServices', function(){

  var configurationServices, controllerHelperServices, $rootScope;

  beforeEach(function() {
    module('Cops.services');
    inject(function (_configurationServices_, _controllerHelperServices_, _$rootScope_) {
      $rootScope = _$rootScope_;
      controllerHelperServices = _controllerHelperServices_;
      configurationServices = _configurationServices_;
    });
  });

  describe('setPageSizeValue', function() {
    beforeEach(function() {
      spyOn(configurationServices, 'setValue');
    });

    it('should set the booksPerPage', function() {
      controllerHelperServices.setPageSizeValue(true, 192);
      expect(configurationServices.setValue.calls.allArgs()).toEqual([['booksPerPage', 192]]);
    });

    it('should set the categoriesPerPage', function() {
      controllerHelperServices.setPageSizeValue(false, 48);
      expect(configurationServices.setValue.calls.allArgs()).toEqual([['categoriesPerPage', 48]]);
    });
  });

  describe('setTemplateValue', function() {
    beforeEach(function() {
      spyOn(configurationServices, 'setValue');
    });

    it('should set the booksGridListTemplate', function() {
      controllerHelperServices.setTemplateValue(true, 'th');
      expect(configurationServices.setValue.calls.allArgs()).toEqual([['booksGridListTemplate', 'th']]);
    });

    it('should set the categoriesGridListTemplate', function() {
      controllerHelperServices.setTemplateValue(false, 'list');
      expect(configurationServices.setValue.calls.allArgs()).toEqual([['categoriesGridListTemplate', 'list']]);
    });
  });

  describe('initControllerWithPaging', function() {
    var triggerDigests = function() {
      return setInterval(function() {
        $rootScope.$digest();
      }, 5);
    };
    var stopDigests = function(interval) {
      window.clearInterval(interval);
    };

    it('should set itemsPerPage using booksPerPage', function(done) {
      var interval = triggerDigests();
      controllerHelperServices.initControllerWithPaging(true).then(function(paging) {
        stopDigests(interval);
        expect(paging.itemsPerPage).toBe(96);
        done();
      });
    });

    it('should set currentTemplate using booksGridListTemplate', function(done) {
      var interval = triggerDigests();
      controllerHelperServices.initControllerWithPaging(true).then(function(paging) {
        stopDigests(interval);
        expect(paging.currentTemplate).toBe('th');
        done();
      });
    });

    it('should set itemsPerPage using categoriesPerPage', function(done) {
      var interval = triggerDigests();
      controllerHelperServices.initControllerWithPaging(false).then(function(paging) {
        stopDigests(interval);
        expect(paging.itemsPerPage).toBe(192);
        done();
      });
    });

    it('should set currentTemplate using categoriesGridListTemplate', function(done) {
      var interval = triggerDigests();
      controllerHelperServices.initControllerWithPaging(false).then(function(paging) {
        stopDigests(interval);
        expect(paging.currentTemplate).toBe('list');
        done();
      });
    });
  });

});

'use strict';

describe('controllerHelperServices', function(){

  var configurationServices, controllerHelperServices, rootScope;

  beforeEach(function() {
    module('Cops.services');
    inject(function (_configurationServices_, _controllerHelperServices_, _$rootScope_) {
      rootScope = _$rootScope_;
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
});

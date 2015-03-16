'use strict';

var app = angular.module('Cops.services');

app.factory('controllerHelperServices', ['$q', 'configurationServices', function($q, configurationServices) {
  return {
    initController: function (scope, withPaging) {
      if (withPaging) {
        scope.itemsPerPage = 48;
        scope.itemsPerPageList = configurationServices.getPageSizes();
        scope.maxSize = 10;
        scope.currentPage = 1;
      }
    },
    initControllerWithPaging: function (withBooks) {
      var deferred = $q.defer();
      var paging = {
        maxSize: 10,
        currentPage: 1
      };
      configurationServices.load().then(function(config) {
        paging.itemsPerPageList = configurationServices.getPageSizes();
        if (withBooks) {
          paging.itemsPerPage = config.booksPerPage;
          paging.currentTemplate = config.booksGridListTemplate;
        } else {
          paging.itemsPerPage = config.categoriesPerPage;
          paging.currentTemplate = config.categoriesGridListTemplate;
        }
        deferred.resolve(paging);
      });
      return deferred.promise;
    },
    setPageSizeValue: function(withBooks, value) {
      var item = configurationServices.constants.booksPerPage;
      if (withBooks) {
        item = configurationServices.constants.categoriesPerPage;
      }
      return configurationServices.setValue(item, value);
    },
    setTemplateValue: function(withBooks, value) {
      var item = configurationServices.constants.categoriesGridListTemplate;
      if (withBooks) {
        item = configurationServices.constants.booksGridListTemplate;
      }
      return configurationServices.setValue(item, value);
    }
  };
}]);

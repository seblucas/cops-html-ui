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
        } else {
          paging.itemsPerPage = config.categoriesPerPage;
        }
        deferred.resolve(paging);
      });
      return deferred.promise;
    },
    setConfigurationValue: function(item, value) {
      return configurationServices.setValue(item, value);
    }
  };
}]);

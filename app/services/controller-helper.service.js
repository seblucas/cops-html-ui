'use strict';

var app = angular.module('Cops.services');

app.factory('controllerHelperServices', ['$q', 'configurationServices', function($q, configurationServices) {
  return {
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
          paging.preferedFormats = config.preferedFormats;
        } else {
          paging.itemsPerPage = config.categoriesPerPage;
          paging.currentTemplate = config.categoriesGridListTemplate;
        }
        deferred.resolve(paging);
      });
      return deferred.promise;
    },
    setPageSizeValue: function(withBooks, value) {
      var item = configurationServices.constants.categoriesPerPage;
      if (withBooks) {
        item = configurationServices.constants.booksPerPage;
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

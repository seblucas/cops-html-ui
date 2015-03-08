'use strict';

var app = angular.module('Cops.services');

app.factory('controllerHelperServices', ['configurationServices', function(configurationServices) {
  return {
    initController: function (scope, withPaging) {
      if (withPaging) {
        scope.itemsPerPage = 48;
        scope.itemsPerPageList = configurationServices.getPageSizes();
        scope.maxSize = 10;
        scope.currentPage = 1;
      }
    }
  };
}]);

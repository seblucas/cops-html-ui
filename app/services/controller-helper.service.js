'use strict';

var app = angular.module('Cops.services');

app.factory('controllerHelperServices', function() {
  return {
    initController: function (scope, withPaging) {
      if (withPaging) {
        scope.itemsPerPage = 48;
        scope.itemsPerPageList = [24, 48, 96, 192];
        scope.maxSize = 10;
        scope.currentPage = 1;
      }
    }
  };
});

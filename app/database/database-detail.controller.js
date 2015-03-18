'use strict';

/* Controllers */

angular.module('Cops.database', [])
  .controller('databaseDetailController', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    Restangular.one('databases', $stateParams.db).get().then(function(list) {
      $scope.database = list;
    });
  }]);

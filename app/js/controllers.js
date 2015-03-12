'use strict';

/* Controllers */

angular.module('Cops.controllers', [])
  .controller('database', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    Restangular.one('databases', $stateParams.db).get().then(function(list) {
      $scope.database = list;
    });
  }])
  .controller('bookFirstLetter', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.letters = [];
    Restangular.one('databases', $stateParams.db)
               .one('books', 'letter')
               .getList()
               .then(function(list) {
      $scope.letters = list;
    });
  }])
  .controller('listLetter', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.title = $stateParams.cat + '.title';
    Restangular.one('databases', $stateParams.db)
               .one($stateParams.cat, 'letter')
               .getList()
               .then(function(list) {
      $scope.letters = list;
    });
  }]);

'use strict';

/* Controllers */

angular.module('Cops.database', [])
  .controller('databaseListController', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('databases')
               .getList()
               .then(function(list) {
      $scope.databases = list;
    });
  }])
  .controller('databaseListCountController', ['$scope', '$filter', 'Restangular', function($scope, $filter, Restangular) {
    $scope.bookCount = '...';
    Restangular.one('databases', $scope.database.id).get().then(function(db) {
      var cat = $filter('filter')(db.categories, {name: 'books'}, true);
      $scope.bookCount = cat[0].count;
    });
  }]);

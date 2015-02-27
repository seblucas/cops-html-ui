'use strict';

/* Controllers */

angular.module('Cops.controllers', [])
  .controller('main', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('databases')
               .getList()
               .then(function(list) {
      $scope.databases = list;
    });
  }])
  .controller('databaseDetail', ['$scope', '$filter', 'Restangular', function($scope, $filter, Restangular) {
    $scope.bookCount = 'Calcul en cours';
    Restangular.one('databases', $scope.database.id).get().then(function(db) {
      var cat = $filter('filter')(db.categories, {name: 'books'}, true);
      $scope.bookCount = cat[0].count;
    });
  }])
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

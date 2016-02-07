'use strict';

/* Controllers */

angular.module('Cops.database')
  .controller('databaseListController', ['$scope', 'Restangular', function($scope, Restangular) {
    console.log('controller databaseListController start');
    Restangular.all('databases')
               .getList()
               .then(function(list) {
      console.log(list);
      if (list.length === 1) {
        $scope.$state.go ('base.database', {db : 0});
      }
      $scope.databases = list;
    },
    function(err) {
      console.log('controller databaseListController error');
      console.log(err);
    });
  }])
  .controller('databaseListCountController', ['$scope', '$filter', 'Restangular', function($scope, $filter, Restangular) {
    $scope.bookCount = '...';
    Restangular.one('databases', $scope.database.id).get().then(function(db) {
      var cat = $filter('filter')(db.categories, {name: 'books'}, true);
      $scope.bookCount = cat[0].count;
    });
  }]);

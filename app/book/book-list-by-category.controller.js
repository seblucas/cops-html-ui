'use strict';

angular.module('Cops.book')
.controller('bookListCategoryController', ['$scope', '$stateParams', 'Restangular', 'controllerHelperServices', function($scope, $stateParams, Restangular, controllerHelperServices) {
    controllerHelperServices.initController($scope, true);
    $scope.db = $stateParams.db;
    $scope.books = [];
    $scope.currentTemplate = 'partials/book.th.html';

    Restangular.one('databases', $stateParams.db).one($stateParams.cat, $stateParams.id).get().then(function(cat) {
      $scope.title = cat.name;
    });

    $scope.pageChanged = function() {
      Restangular.one('databases', $stateParams.db)
                 .one($stateParams.cat, $stateParams.id)
                 .getList('books', {page: $scope.currentPage, per_page: $scope.itemsPerPage, authors: 1, tags: 1, series: 1})
                 .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        $scope.books = list;
      });
    };

    $scope.pageChanged ();
  }]);

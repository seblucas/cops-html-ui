'use strict';

angular.module('Cops.book')
  .controller('bookList', ['$scope', '$stateParams', 'Restangular', 'controllerHelperServices', function($scope, $stateParams, Restangular, controllerHelperServices) {
    controllerHelperServices.initController($scope, true);
    $scope.db = $stateParams.db;
    $scope.books = [];
    $scope.currentTemplate = 'partials/book.th.html';

    $scope.pageChanged = function() {
      var params = {page: $scope.currentPage, per_page: $scope.itemsPerPage, authors: 1, tags: 1, series: 1};
      if ($stateParams.letter) {
        params.letter = $stateParams.letter;
      }
      Restangular.one('databases', $stateParams.db)
                 .getList('books', params)
                 .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        $scope.books = list;
      });
    };

    $scope.pageChanged ();
  }]);

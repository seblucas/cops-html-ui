'use strict';

angular.module('Cops.book', [])
  .controller('bookDetailController', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.db = $stateParams.db;

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).get().then(function(book) {
      $scope.book = book;
    });

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('authors').then(function(list) {
      $scope.authors = list;
    });

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('tags').then(function(list) {
      $scope.tags = list;
    });

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('series').then(function(list) {
      $scope.series = list;
    });


  }]);

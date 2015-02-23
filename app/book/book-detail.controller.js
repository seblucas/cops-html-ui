'use strict';

angular.module('Cops.book', [])
  .controller('bookDetailController', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.db = $stateParams.db;

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).get().then(function(book) {
      $scope.book = book;

      // If the publication date starts with 01 then it's NULL -> not OK
      $scope.isPublicationDateOk = $scope.book.pubdate.indexOf('01') !== 0;
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

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('datas').then(function(list) {
      $scope.datas = list;
    });


  }]);

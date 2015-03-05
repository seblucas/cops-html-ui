'use strict';

/**
 * @ngdoc object
 * @name Cops.book.bookDetailController
 * @requires $stateParams
 * @requires Restangular
 * @requires downloadableHelperServices
 * @requires $sce
 *
 * @description
 * Get all the data necessary to show the book detail
 */
angular.module('Cops.book', [])
  .controller('bookDetailController', ['$scope', '$stateParams', 'Restangular', 'downloadableHelperServices', '$sce',
  function($scope, $stateParams, Restangular, downloadableHelperServices, $sce) {
    $scope.coverUrl = downloadableHelperServices.getCoverUrl($stateParams.db, $stateParams.id);

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).get({ comments: 1}).then(function(book) {
      $scope.book = book;

      // If the publication date starts with 01 then it's NULL -> not OK
      $scope.isPublicationDateOk = $scope.book.pubdate.indexOf('01') !== 0;
      $scope.trustedComment = $sce.trustAsHtml(book.comment);
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

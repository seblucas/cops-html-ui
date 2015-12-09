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

    $scope.setPublicationOk = function(pubdate){
      if (!pubdate || pubdate.length <= 4) {
        return false;
      }
      $scope.publicationYear = pubdate.substring(0, 4);
      return ($scope.publicationYear > 101);
    };

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).get({ comments: 1}).then(function(book) {
      $scope.book = book;

      $scope.isPublicationDateOk = $scope.setPublicationOk(book.pubdate);
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

    $scope.ratings = null;
    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('ratings').then(function(list) {
      if (list.length === 1) {
        $scope.ratings = Math.floor(list[0].name / 2);
      }
    });


  }]);

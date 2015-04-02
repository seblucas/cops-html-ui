'use strict';

angular.module('Cops.book')
  .controller('bookListController', ['$scope',
                                           '$stateParams',
                                           'Restangular',
                                           'controllerHelperServices',
                                           'downloadableHelperServices', function($scope, $stateParams, Restangular, controllerHelperServices, downloadableHelperServices) {
    $scope.books = [];
    $scope.defaultTemplate = 'th';

    $scope.pageChanged = function() {
      controllerHelperServices.setPageSizeValue(true, $scope.itemsPerPage);
      var params = {page: $scope.currentPage, perPage: $scope.itemsPerPage, authors: 1, tags: 1, series: 1};
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

    $scope.getCoverUrl = function(id) {
      return downloadableHelperServices.getCoverUrl($stateParams.db, id);
    };

    $scope.gridListChange = function(newValue) {
      controllerHelperServices.setTemplateValue(true, newValue);
    };

    controllerHelperServices.initControllerWithPaging(true)
                            .then(function(paging) {
      $scope.itemsPerPage = paging.itemsPerPage;
      $scope.itemsPerPageList = paging.itemsPerPageList;
      $scope.maxSize = paging.maxSize;
      $scope.currentPage = paging.currentPage;
      $scope.defaultTemplate = paging.currentTemplate;

      $scope.pageChanged ();
    });
  }]);

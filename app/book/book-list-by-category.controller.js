'use strict';

angular.module('Cops.book')
.controller('bookListCategoryController', ['$scope',
                                           '$stateParams',
                                           'Restangular',
                                           'controllerHelperServices',
                                           'bookListHelperServices', function($scope, $stateParams, Restangular, controllerHelperServices, bookListHelperServices) {
    $scope.books = [];
    $scope.defaultTemplate = 'th';
    $scope.bookListHelper = bookListHelperServices;

    Restangular.one('databases', $stateParams.db).one($stateParams.cat, $stateParams.id).get().then(function(cat) {
      $scope.title = cat.name;
    });

    $scope.pageChanged = function() {
      controllerHelperServices.setPageSizeValue(true, $scope.itemsPerPage);
      Restangular.one('databases', $stateParams.db)
                 .one($stateParams.cat, $stateParams.id)
                 .getList('books', {page: $scope.currentPage, perPage: $scope.itemsPerPage, authors: 1, tags: 1, series: 1, datas: 'EPUB,PDF'})
                 .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        $scope.books = list;
      });
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

'use strict';

angular.module('Cops.book')
  .controller('bookListController', ['$scope',
                                           '$stateParams',
                                           'Restangular',
                                           'bookListHelperServices',
                                           'controllerHelperServices', function($scope, $stateParams, Restangular, bookListHelperServices, controllerHelperServices) {
    $scope.books = [];
    $scope.defaultTemplate = 'th';
    $scope.bookListHelper = bookListHelperServices;

    $scope.pageChanged = function() {
      controllerHelperServices.setPageSizeValue(true, $scope.itemsPerPage);
      bookListHelperServices.loadPage(Restangular.one('databases', $stateParams.db), $scope)
                            .then(function(list) {
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

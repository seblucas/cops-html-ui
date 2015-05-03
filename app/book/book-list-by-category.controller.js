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
      bookListHelperServices.loadPage(Restangular.one('databases', $stateParams.db)
                                                 .one($stateParams.cat, $stateParams.id), $scope)
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

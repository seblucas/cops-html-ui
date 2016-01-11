'use strict';

angular.module('Cops.book')
  .controller('bookListController', ['$scope',
                                           'Lightbox',
                                           '$stateParams',
                                           'Restangular',
                                           'bookListHelperServices',
                                           'controllerHelperServices', function($scope, Lightbox, $stateParams, Restangular, bookListHelperServices, controllerHelperServices) {
    $scope.books = [];
    $scope.defaultTemplate = 'th';
    $scope.bookListHelper = bookListHelperServices;

    $scope.pageChanged = function() {
      controllerHelperServices.setPageSizeValue(true, $scope.itemsPerPage);
      bookListHelperServices.loadPage(Restangular.one('databases', $stateParams.db), $scope)
                            .then(function(list) {
        $scope.covers = bookListHelperServices.getCovers(list);
        $scope.books = list;
      });
    };

    $scope.gridListChange = function(newValue) {
      controllerHelperServices.setTemplateValue(true, newValue);
    };

    $scope.openLightboxModal = function (index) {
      Lightbox.openModal($scope.covers, index);
    };

    controllerHelperServices.initControllerWithPaging(true)
                            .then(function(paging) {
      $scope.itemsPerPage = paging.itemsPerPage;
      $scope.itemsPerPageList = paging.itemsPerPageList;
      $scope.maxSize = paging.maxSize;
      $scope.currentPage = paging.currentPage;
      $scope.defaultTemplate = paging.currentTemplate;
      $scope.preferedFormats = paging.preferedFormats;

      $scope.pageChanged ();
    });
  }]);

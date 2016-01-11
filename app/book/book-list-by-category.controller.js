'use strict';

angular.module('Cops.book')
.controller('bookListCategoryController', ['$scope',
                                           'Lightbox',
                                           '$stateParams',
                                           'Restangular',
                                           'controllerHelperServices',
                                           'bookListHelperServices', function($scope, Lightbox, $stateParams, Restangular, controllerHelperServices, bookListHelperServices) {
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

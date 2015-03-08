'use strict';

var app = angular.module('Cops.category', []);

app
.controller('categoryListController', ['$scope', '$stateParams', 'Restangular', 'controllerHelperServices', 'spinnerService', function($scope, $stateParams, Restangular, controllerHelperServices, spinnerService) {
    controllerHelperServices.initControllerWithPaging(false)
                            .then(function(paging) {
      $scope.itemsPerPage = paging.itemsPerPage;
      $scope.itemsPerPageList = paging.itemsPerPageList;
      $scope.maxSize = paging.maxSize;
      $scope.currentPage = paging.currentPage;
    });
    $scope.list = [];
    $scope.currentTemplate = 'category/category-list.list.html';

    $scope.pageChanged = function() {
      spinnerService.show('mainSpinner', 'Loading stuff...');
      var params = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
      if ($stateParams.letter) {
        params.letter = $stateParams.letter;
      }
      if ($stateParams.q) {
        params.q = $stateParams.q;
      }

      Restangular.one('databases', $stateParams.db)
                 .getList($stateParams.cat, params)
                 .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        $scope.list = list;
        spinnerService.hide('mainSpinner', 'Loading stuff...');
      });
    };

    $scope.pageChanged ();
  }]);

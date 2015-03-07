'use strict';

var app = angular.module('Cops.layout');

app
  .controller('navbarTypeaheadController', ['$scope', 'typeaheadServices', function($scope, typeaheadServices) {
    $scope.multiCops = [];

    $scope.$on('typeahead:selected', function(evt, data, datasetName) {
      if (datasetName === 'books') {
        $scope.$state.go('base.book.detail', {id: data.id});
      } else {
        $scope.$state.go('base.category.books', {cat: datasetName, id: data.id});
      }
      $scope.query = null;
    });

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if (angular.isDefined(toParams.db) &&
          angular.isDefined(fromParams.db) &&
          $scope.multiCops !== [] &&
          toParams.db === fromParams.db) {
        return;
      }
      if (angular.isDefined(toParams.db)) {
        typeaheadServices.getDatasets(toParams.db, ['authors', 'series', 'books']).then(function(ds) {
          $scope.multiCops = ds;
        });
      } else {
        $scope.multiCops = [];
      }
    });

    // Typeahead options object
    $scope.exampleOptions = {
      highlight: true,
      minLength: 3
    };

  }]);

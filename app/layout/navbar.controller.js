'use strict';

var app = angular.module('Cops.layout', []);

app
  .controller('navbar', ['$scope', '$translate', 'typeaheadServices', function($scope, $translate, typeaheadServices) {
    $scope.languageList = [
      { code: 'ca', name: 'Català'},
      { code: 'cs', name: 'Čeština'},
      { code: 'de', name: 'Deutsch'},
      { code: 'en', name: 'English'},
      { code: 'es', name: 'Español'},
      { code: 'eu', name: 'Euskara'},
      { code: 'fr', name: 'Français'},
      { code: 'ht', name: 'Haitian'},
      { code: 'it', name: 'Italiano'},
      { code: 'nb', name: 'Norsk bokmål'},
      { code: 'nl', name: 'Nederlands'},
      { code: 'pl', name: 'Polski'},
      { code: 'pt', name: 'Português'},
      { code: 'ru', name: 'Русский'},
      { code: 'sv', name: 'Svenska'},
      { code: 'zh', name: '简体中文'}
    ];
    $scope.setLanguage = function(language) {
      $translate.use(language);
    };
    $scope.isLanguageActive = function(language) {
      return $translate.use() === language;
    };

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

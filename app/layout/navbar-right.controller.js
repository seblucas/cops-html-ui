'use strict';

var app = angular.module('Cops.layout', []);

app
  .controller('navbarRightController', ['$scope', '$translate', function($scope, $translate) {
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
  }]);

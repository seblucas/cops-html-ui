'use strict';

var app = angular.module('Cops.layout', []);

app
  .controller('navbarRightController', ['$scope', '$translate', function($scope, $translate) {
    $scope.languageList = [
      { code: 'ca', name: 'Català'},
      { code: 'cs', name: 'Čeština'},
      { code: 'de', name: 'Deutsch'},
      { code: 'el', name: 'Ελληνικά'},
      { code: 'en', name: 'English'},
      { code: 'es', name: 'Español'},
      { code: 'eu', name: 'Euskara'},
      { code: 'fr', name: 'Français'},
      { code: 'ht', name: 'Haitian'},
      { code: 'hu', name: 'Magyar'},
      { code: 'it', name: 'Italiano'},
      { code: 'ko', name: '한국어'},
      { code: 'nb', name: 'Norsk bokmål'},
      { code: 'nl', name: 'Nederlands'},
      { code: 'pl', name: 'Polski'},
      { code: 'pt_BR', name: 'Português (Brasil)'},
      { code: 'pt_PT', name: 'Português (Portugal)'},
      { code: 'ro', name: 'Română'},
      { code: 'ru', name: 'Русский'},
      { code: 'sv', name: 'Svenska'},
      { code: 'tr', name: 'Türkçe'},
      { code: 'ua', name: 'Українська'},
      { code: 'zh', name: '简体中文'}
    ];
    $scope.setLanguage = function(language) {
      $translate.use(language);
    };
    $scope.isLanguageActive = function(language) {
      return $translate.use() === language;
    };
  }]);

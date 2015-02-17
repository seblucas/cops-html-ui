'use strict';


var app = angular.module('Cops');

app.
config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/ncops');

    var provideSort = function(element) {
        element.sort = element.name;
        return element;
    };

    RestangularProvider.addElementTransformer('tags',
      false, provideSort);
    RestangularProvider.addElementTransformer('publishers',
      false, provideSort);
    RestangularProvider.addElementTransformer('ratings',
      false, provideSort);
}).
config(function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'lang/Localization_',
    suffix: '.json'
  });

  $translateProvider.useMissingTranslationHandlerLog();

  // Direct copy from angular-translate source
  var getFirstBrowserLanguage = function() {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;
    // support for HTML 5.1 "navigator.languages"
    if (angular.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }
    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }
    return null;
  };

  // Chrome always return fr_FR and firefox return fr
  // To be safe we take only the language and don't care about the country
  var getLocaleWithLanguageOnly = function() {
    return getFirstBrowserLanguage().substr(0, 2);
  };

  $translateProvider.determinePreferredLanguage(getLocaleWithLanguageOnly);
  $translateProvider.fallbackLanguage('en');
}).
config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function(data, headersGetter){
      //data is already converted from an angular default transformer
      if(angular.isArray(data) && data.length > 0 && headersGetter('X-Total-Count') ) {
        //Ugly hack to transfer the paging metadata to the controller
        data[0].metadata = headersGetter('X-Total-Count');
      }
      return data;
    });
}]);

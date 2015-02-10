'use strict';


// Declare app level module which depends on filters, and services
angular.module('Cops', [
  'ui.router',
  'ngAnimate',
  'Cops.controllers',
  'Cops.services',
  'ui.bootstrap',
  'pascalprecht.translate',
  'siyfion.sfTypeahead',
  'seblucas.slPageSizeChanger',
  'seblucas.slGridListToggle',
  'restangular'
]).
run([ '$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  // to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]).
factory('$exceptionHandler', function () {
  return function (exception, cause) {
    exception.message += ' (caused by "' + cause + '")';
    throw exception;
  };
}).
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
}]).
config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('databases', {
      url: '/',
      templateUrl: 'partials/main.html',
      controller: 'main'
    })
    .state('base', {
      abstract: true,
      url: '/:db',
      template: '<div ui-view></div>'
    })
    .state('base.database', {
      url: '',
      templateUrl: 'partials/database.html',
      controller: 'database'
    })
    .state('base.book', {
      url: '/books',
      abstract: true
    })
    .state('base.book.list', {
      url: '?letter',
      views: {
        '@': {
          templateUrl: 'partials/book.html',
          controller: 'bookList'
        }
      }
    })
    .state('base.book.firstLetter', {
      url: '/letter',
      views: {
        '@': {
          templateUrl: 'partials/booksByLetter.html',
          controller: 'bookFirstLetter'
        }
      }
    })
    .state('base.category', {
      url: '/{cat:(?:authors|series|tags|publishers|ratings)}',
      abstract: true
    })
    .state('base.category.list', {
      url: '',
      views: {
        '@': {
          templateUrl: 'partials/category.html',
          controller: 'authorList'
        }
      }
    })
    .state('base.category.listByLetter', {
      url: '/firstletter?letter',
      views: {
        '@': {
          templateUrl: 'partials/category.html',
          controller: 'authorList'
        }
      }
    })
    .state('base.category.listBySearch', {
      url: '/search?q',
      views: {
        '@': {
          templateUrl: 'partials/category.html',
          controller: 'authorList'
        }
      }
    })
    .state('base.category.books', {
      url: '/{id:[0-9]{1,8}}',
      views: {
        '@': {
          templateUrl: 'partials/bookByCategory.html',
          controller: 'bookListCategory'
        }
      }
    })
    .state('base.category.firstLetter', {
      url: '/letter',
      views: {
        '@': {
          templateUrl: 'partials/listByLetter.html',
          controller: 'listLetter'
        }
      }
    });
});

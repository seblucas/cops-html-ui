'use strict';


// Declare app level module which depends on filters, and services
angular.module('Cops', [
  'ui.router',
  'ngAnimate',
  'Cops.controllers',
  'Cops.services',
  'ui.bootstrap',
  'pascalprecht.translate',
  'restangular'
]).
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
  $translateProvider.determinePreferredLanguage();
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
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('databases', {
      url: "/",
      templateUrl: "partials/main.html",
      controller: "main"
    })
    .state('base', {
      abstract: true,
      url: "/:db",
      template: '<div ui-view></div>'
    })
    .state('base.database', {
      url: "",
      templateUrl: "partials/database.html",
      controller: "database"
    })
    .state('base.book', {
      url: "/books",
      abstract: true
    })
    .state('base.book.list', {
      url: "?letter",
      views: {
        "@": {
          templateUrl: "partials/book.html",
          controller: "bookList"
        }
      }
    })
    .state('base.book.firstLetter', {
      url: "/letter",
      views: {
        "@": {
          templateUrl: "partials/booksByLetter.html",
          controller: "bookFirstLetter"
        }
      }
    })
    .state('base.category', {
      url: "/{cat:(?:authors|series|tags|publishers|ratings)}",
      abstract: true
    })
    .state('base.category.list', {
      url: "?letter",
      views: {
        "@": {
          templateUrl: "partials/category.html",
          controller: "authorList"
        }
      },
      resolve: {
        dataService: function (Restangular, $stateParams) {
          return Restangular.one("databases", $stateParams.db);
        },
        method: function ($stateParams) {
          return $stateParams.cat;
        },
        title: function ($stateParams, $translate) {
          return $translate($stateParams.cat + ".title");
        }
      }
    })
    .state('base.category.books', {
      url: "/{id:[0-9]{1,8}}",
      views: {
        "@": {
          templateUrl: "partials/bookByCategory.html",
          controller: "bookListCategory"
        }
      }
    })
    .state('base.category.firstLetter', {
      url: "/letter",
      views: {
        "@": {
          templateUrl: "partials/listByLetter.html",
          controller: "listLetter"
        }
      }
    });
});

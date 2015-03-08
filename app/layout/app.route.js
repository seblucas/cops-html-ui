'use strict';


angular.module('Cops.routes', ['ui.router']).
run([ '$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  // to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
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
    .state('configuration', {
      url: '/config',
      templateUrl: 'configuration/configuration.html',
      controller: 'configurationController'
    })
    .state('base', {
      abstract: true,
      url: '/{db:[0-9]{1,8}}',
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
    .state('base.book.detail', {
      url: '/{id:[0-9]{1,8}}',
      views: {
        '@': {
          templateUrl: 'book/book-detail.html',
          controller: 'bookDetailController'
        }
      }
    })
    .state('base.book.list', {
      url: '?letter',
      views: {
        '@': {
          templateUrl: 'book/book-list.html',
          controller: 'bookListController'
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
          templateUrl: 'category/category-list.html',
          controller: 'categoryListController'
        }
      }
    })
    .state('base.category.listByLetter', {
      url: '/firstletter?letter',
      views: {
        '@': {
          templateUrl: 'category/category-list.html',
          controller: 'categoryListController'
        }
      }
    })
    .state('base.category.listBySearch', {
      url: '/search?q',
      views: {
        '@': {
          templateUrl: 'category/category-list.html',
          controller: 'categoryListController'
        }
      }
    })
    .state('base.category.books', {
      url: '/{id:[0-9]{1,8}}',
      views: {
        '@': {
          templateUrl: 'book/book-list-by-category.html',
          controller: 'bookListCategoryController'
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

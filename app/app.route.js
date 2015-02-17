'use strict';


var app = angular.module('Cops');

app.
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
    .state('base.book.detail', {
      url: '/{id:[0-9]{1,8}}',
      views: {
        '@': {
          templateUrl: 'partials/bookdetail.html',
          controller: 'bookCtrl'
        }
      }
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

'use strict';

/* Controllers */

angular.module('Cops.controllers', [])
  .controller('main', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('databases')
               .getList()
               .then(function(list) {
      $scope.databases = list;
    });
  }])
  .controller('databaseDetail', ['$scope', '$filter', 'Restangular', function($scope, $filter, Restangular) {
    $scope.bookCount = 'Calcul en cours';
    Restangular.one('databases', $scope.database.id).get().then(function(db) {
      var cat = $filter('filter')(db.categories, {name: 'books'}, true);
      $scope.bookCount = cat[0].count;
    });
  }])
  .controller('database', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    Restangular.one('databases', $stateParams.db).get().then(function(list) {
      $scope.database = list;
    });
  }])
.controller('bookList', ['$scope', '$stateParams', 'Restangular', 'controllerHelperServices', function($scope, $stateParams, Restangular, controllerHelperServices) {
    controllerHelperServices.initController($scope, true);
    $scope.db = $stateParams.db;
    $scope.books = [];
    $scope.currentTemplate = 'partials/book.th.html';

    $scope.pageChanged = function() {
      var params = {page: $scope.currentPage, per_page: $scope.itemsPerPage, authors: 1, tags: 1, series: 1};
      if ($stateParams.letter) {
        params.letter = $stateParams.letter;
      }
      Restangular.one('databases', $stateParams.db)
                 .getList('books', params)
                 .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        $scope.books = list;
      });
    };

    $scope.pageChanged ();
  }])
.controller('bookListCategory', ['$scope', '$stateParams', 'Restangular', 'controllerHelperServices', function($scope, $stateParams, Restangular, controllerHelperServices) {
    controllerHelperServices.initController($scope, true);
    $scope.db = $stateParams.db;
    $scope.books = [];
    $scope.currentTemplate = 'partials/book.th.html';

    Restangular.one('databases', $stateParams.db).one($stateParams.cat, $stateParams.id).get().then(function(cat) {
      $scope.title = cat.name;
    });

    $scope.pageChanged = function() {
      Restangular.one('databases', $stateParams.db)
                 .one($stateParams.cat, $stateParams.id)
                 .getList('books', {page: $scope.currentPage, per_page: $scope.itemsPerPage, authors: 1, tags: 1, series: 1})
                 .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        $scope.books = list;
      });
    };

    $scope.pageChanged ();
  }])
.controller('bookCtrl', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.db = $stateParams.db;

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).get().then(function(book) {
      $scope.book = book;
    });

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('authors').then(function(list) {
      $scope.authors = list;
    });

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('tags').then(function(list) {
      $scope.tags = list;
    });

    Restangular.one('databases', $stateParams.db).one('books', $stateParams.id).getList('series').then(function(list) {
      $scope.series = list;
    });


  }])
  .controller('bookFirstLetter', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.letters = [];
    Restangular.one('databases', $stateParams.db)
               .one('books', 'letter')
               .getList()
               .then(function(list) {
      $scope.letters = list;
    });
  }])
  .controller('listLetter', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.title = $stateParams.cat + '.title';
    Restangular.one('databases', $stateParams.db)
               .one($stateParams.cat, 'letter')
               .getList()
               .then(function(list) {
      $scope.letters = list;
    });
  }]);

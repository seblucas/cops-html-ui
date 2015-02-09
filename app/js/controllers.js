'use strict';

/* Controllers */

angular.module('Cops.controllers', [])
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
    typeaheadServices.getDatasets(0, ['authors', 'series', 'books']).then(function(ds) {
      $scope.multiCops = ds;
    });

    $scope.$on('typeahead:selected', function(evt, data, datasetName) {
      $scope.$state.go('base.category.books', {cat: datasetName, id: data.id});
      $scope.query = null;
    });

    // Typeahead options object
    $scope.exampleOptions = {
      highlight: true,
      minLength: 3
    };

  }])
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
.controller('authorList', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.itemsPerPage = 48;
    $scope.itemsPerPageList = [24, 48, 96, 192];
    $scope.maxSize = 10;
    $scope.currentPage = 1;
    $scope.list = [];
    $scope.currentTemplate = 'partials/category.list.html';

    $scope.toggleList = function() {
      $scope.currentTemplate = 'partials/category.list.html';
    };

    $scope.toggleGrid = function() {
      $scope.currentTemplate = 'partials/category.grid.html';
    };

    $scope.selectItemPerPage = function(value) {
      $scope.itemsPerPage = value;
      $scope.pageChanged();
    };

    $scope.pageChanged = function() {
      var params = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
      if ($stateParams.letter) {
        params.letter = $stateParams.letter;
      }
      if ($stateParams.q) {
        params.q = $stateParams.q;
      }

      Restangular.one('databases', $stateParams.db)
                 .getList($stateParams.cat, params)
                 .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        $scope.list = list;
      });
    };

    $scope.pageChanged ();
  }])
.controller('bookList', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.itemsPerPage = 48;
    $scope.itemsPerPageList = [24, 48, 96, 192];
    $scope.maxSize = 10;
    $scope.currentPage = 1;
    $scope.db = $stateParams.db;
    $scope.books = [];

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
.controller('bookListCategory', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.itemsPerPage = 50;
    $scope.maxSize = 10;
    $scope.currentPage = 1;
    $scope.db = $stateParams.db;
    $scope.books = [];

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
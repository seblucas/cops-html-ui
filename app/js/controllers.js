'use strict';

/* Controllers */

angular.module('Cops.controllers', [])
  .controller('navbar', ['$scope', '$translate', function($scope, $translate) {
    $scope.languageList = [
      { code: "ca", name: "Català"},
      { code: "cs", name: "Čeština"},
      { code: "de", name: "Deutsch"},
      { code: "en", name: "English"},
      { code: "es", name: "Español"},
      { code: "eu", name: "Euskara"},
      { code: "fr", name: "Français"},
      { code: "ht", name: "Haitian"},
      { code: "it", name: "Italiano"},
      { code: "nb", name: "Norsk bokmål"},
      { code: "nl", name: "Nederlands"},
      { code: "pl", name: "Polski"},
      { code: "pt", name: "Português"},
      { code: "ru", name: "Русский"},
      { code: "sv", name: "Svenska"},
      { code: "zh", name: "简体中文"}
    ];
    $scope.setLanguage = function(language) {
      $translate.use(language);
    }
    $scope.isLanguageActive = function(language) {
      return $translate.use() == language;
    }

    var copsAuthorTypeahead = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 30,
      remote: {
                  url: '/ncops/databases/0/authors?q=%QUERY&per_page=5'
              }
    });

    copsAuthorTypeahead.initialize();

    var copsBookTypeahead = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 30,
      remote: {
                  url: '/ncops/databases/0/series?q=%QUERY&per_page=5'
              }
    });

    copsBookTypeahead.initialize();

    $scope.copsAuthorDataset = {
      displayKey: 'name',
      source: copsAuthorTypeahead.ttAdapter()
    };

    $scope.multiCops = [
      {
        name: 'Authors',
        displayKey: 'name',
        source: copsAuthorTypeahead.ttAdapter(),
        templates: {
          header: '<h3>Authors</h3>'
        }
      },
      {
        name: 'Book',
        displayKey: 'name',
        source: copsBookTypeahead.ttAdapter(),
        templates: {
          header: '<h3>Series</h3>'
        }
      }
    ];

    // Typeahead options object
    $scope.exampleOptions = {
      highlight: true,
      minLength: 3
    };

  }])
  .directive('numberPerPage', function() {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        itemsPerPageList: '=',
        totalItems: '=',
      },
      templateUrl: 'partials/numberPerPage.html',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$viewChangeListeners.push(function() {
            scope.$eval(attrs.ngChange);
        });
        ngModel.$render = function() {
            scope.itemsPerPage = ngModel.$modelValue;
        };
        scope.selectItemPerPage = function(value) {
          if (scope.itemsPerPage !== value) {
            scope.itemsPerPage = value;
            ngModel.$setViewValue(value);
          }
        };
      }
    };
  })
  .controller('main', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all("databases")
               .getList()
               .then(function(list) {
      $scope.databases = list;
    });
  }])
  .controller('databaseDetail', ['$scope', '$filter', 'Restangular', function($scope, $filter, Restangular) {
    $scope.bookCount = "Calcul en cours";
    Restangular.one("databases", $scope.database.id).get().then(function(db) {
      var cat = $filter('filter')(db.categories, {name: 'books'}, true);
      $scope.bookCount = cat[0].count;
    });
  }])
  .controller('database', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    Restangular.one("databases", $stateParams.db).get().then(function(list) {
      $scope.database = list;
    });
  }])
.controller('authorList', ['$scope', '$stateParams', 'dataService', 'method', 'title', function($scope, $stateParams, dataService, method, title) {
    $scope.itemsPerPage = 48;
    $scope.itemsPerPageList = [24, 48, 96, 192];
    $scope.maxSize = 10;
    $scope.currentPage = 1;
    $scope.title = title;
    $scope.list = [];
    $scope.currentTemplate = "partials/category.list.html";

    $scope.toggleList = function() {
      $scope.currentTemplate = "partials/category.list.html";
    }

    $scope.toggleGrid = function() {
      $scope.currentTemplate = "partials/category.grid.html";
    }

    $scope.selectItemPerPage = function(value) {
      $scope.itemsPerPage = value;
      $scope.pageChanged();
    };

    $scope.pageChanged = function() {
      var params = {page: $scope.currentPage, per_page: $scope.itemsPerPage};
      if ($stateParams.letter) {
        params.letter = $stateParams.letter;
      }

      dataService.getList(method, params).then(function(list) {
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
      Restangular.one("databases", $stateParams.db)
                 .getList("books", params)
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

    Restangular.one("databases", $stateParams.db).one($stateParams.cat, $stateParams.id).get().then(function(cat) {
      $scope.title = cat.name;
    });

    $scope.pageChanged = function() {
      Restangular.one("databases", $stateParams.db)
                 .one($stateParams.cat, $stateParams.id)
                 .getList("books", {page: $scope.currentPage, per_page: $scope.itemsPerPage, authors: 1, tags: 1, series: 1})
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
    Restangular.one("databases", $stateParams.db)
               .one("books", "letter")
               .getList()
               .then(function(list) {
      $scope.letters = list;
    });
  }])
  .controller('listLetter', ['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
    $scope.title = $stateParams.cat + ".title";
    Restangular.one("databases", $stateParams.db)
               .one($stateParams.cat, "letter")
               .getList()
               .then(function(list) {
      $scope.letters = list;
    });
  }]);
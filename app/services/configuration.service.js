'use strict';

var app = angular.module('Cops.services', ['LocalForageModule']);

app
.config(['$localForageProvider', function($localForageProvider){
    $localForageProvider.config({
        name        : 'cops', // name of the database and prefix for your data, it is "lf" by default
        version     : 1.0, // version of the database, you shouldn't have to use this
        storeName   : 'keyvaluepairs', // name of the table
        description : 'COPS configuration data'
    });
}])
.factory('configurationServices', ['$q', '$localForage', function($q, $localForage) {
  var current;
  var defaultValues = {
    booksPerPage: 96,
    categoriesPerPage: 192,
    booksGridListTemplate: 'th',
    categoriesGridListTemplate: 'list'
  };

  // Extends the configuration to include the default values
  var _extendDefaultValues = function(conf) {
    var merged = {};
    angular.forEach(defaultValues, function(value, key){
      if (!angular.isDefined(conf[key]) || conf[key] === null) {
        merged[key] = value;
      } else {
        merged[key] = conf[key];
      }
    });
    return merged;
  };

  // private load function (to be shared easily)
  var _load = function() {
    var deferred = $q.defer();
    if (!angular.isDefined(current)) {
      $localForage.getItem('cops-configuration').then(function(res) {
        if (!angular.isDefined(res)) {
          res = defaultValues;
        } else {
          res = _extendDefaultValues(res);
        }
        current = res;
        console.log('Load : ');
        console.log(current);
        deferred.resolve(current);
      }, function(err) {
        deferred.reject(err);
      });
    } else {
      console.log('Load : ');
      console.log(current);
      deferred.resolve(current);
    }
    return deferred.promise;
  };

  return {
    constants: {
      booksPerPage: 'booksPerPage',
      categoriesPerPage: 'categoriesPerPage',
      booksGridListTemplate: 'booksGridListTemplate',
      categoriesGridListTemplate: 'categoriesGridListTemplate'
    },
    getPageSizes: function() {
      return [24, 48, 96, 192, 384];
    },
    getDriver: function() {
      return $localForage.driver();
    },
    save: function (conf) {
      current = conf;
      return $localForage.setItem('cops-configuration', conf);
    },
    load: function () {
      return _load();
    },
    setValue: function(item, value) {
      console.log('setValue : ' + item + '/' + value);
      var deferred = $q.defer();
      _load().then(function(conf) {
        if (conf[item] !== value) {
          conf[item] = value;
          $localForage.setItem('cops-configuration', conf)
                      .then(function(lconfig) {
            deferred.resolve(lconfig);
          });
        } else {
          deferred.resolve(conf);
        }
      });
      return deferred.promise;
    }
  };
}]);

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
.factory('configurationServices', ['$q', '$localForage', '$log', function($q, $localForage, $log) {
  var current;
  var defaultValues = {
    booksPerPage: 96,
    categoriesPerPage: 192,
    booksGridListTemplate: 'th',
    categoriesGridListTemplate: 'list',
    ignoredCategories: {'authors' : false, 'tags' : false, 'series' : false},
    preferedFormats: ''
  };

  // Extends the configuration to include the default values
  var _extendDefaultValues = function(defaultVal, conf) {
    if (!conf) {
      conf = {};
    }
    var merged = {};
    angular.forEach(defaultVal, function(value, key){
      if (!angular.isDefined(conf[key]) || conf[key] === null) {
        merged[key] = value;
      } else {
        if (angular.isObject(value)) {
          merged[key] = _extendDefaultValues(value, conf[key]);
        } else {
          merged[key] = conf[key];
        }
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
          res = _extendDefaultValues(defaultValues, res);
        }
        current = res;
        $log.debug('Load : ');
        $log.debug(current);
        deferred.resolve(current);
      }, function(err) {
        deferred.reject(err);
      });
    } else {
      $log.debug('Load : ');
      $log.debug(current);
      deferred.resolve(current);
    }
    return deferred.promise;
  };

  var _save = function(conf) {
    current = conf;
    return $localForage.setItem('cops-configuration', conf);
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
      return _save(conf);
    },
    load: function () {
      return _load();
    },
    setValue: function(item, value) {
      $log.debug('setValue : ' + item + '/' + value);
      var deferred = $q.defer();
      _load().then(function(conf) {
        if (conf[item] !== value) {
          conf[item] = value;
          _save(conf).then(function(lconfig) {
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

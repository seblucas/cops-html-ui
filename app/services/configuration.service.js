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
    categoriesPerPage: 192
  };
  return {
    getDriver: function() {
      return $localForage.driver();
    },
    save: function (conf) {
      current = conf;
      return $localForage.setItem('cops-configuration', conf);
    },
    load: function () {
      var deferred = $q.defer();
      if (!angular.isDefined(current)) {
        $localForage.getItem('cops-configuration').then(function(res) {
          if (!angular.isDefined(res)) {
            res = defaultValues;
          }
          current = res;
          deferred.resolve(current);
        });
      } else {
        deferred.resolve(current);
      }
      return deferred.promise;
    }
  };
}]);

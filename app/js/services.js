'use strict';

/* Services */

var copsServices = angular.module('Cops.services', []);

copsServices.factory('typeaheadServices', ['$q', '$translate', function($q, $translate) {
  var getBloodhound = function (db, category) {
      var bhUrl = '/ncops/databases/' + db + '/' + category + '?q=%QUERY&per_page=5'
      return new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 30,
        remote: {
                    url: bhUrl
                }
      });
  };

  var getDatasetsSync = function(db, categories, translations) {
      var bloodhounds = [];
      var datasets = [];
      var localGetBloodhound = getBloodhound; // Helper
      angular.forEach(categories, function(value, key) {
        bloodhounds[key] = localGetBloodhound (db, value);
        bloodhounds[key].initialize();
        var headerTemplate = '<h4>' + translations[key] + '</h4><hr />'
        datasets[key] = {
          name: value,
          displayKey: 'name',
          source: bloodhounds[key].ttAdapter(),
          templates: {
            header: headerTemplate
          }
        }
      });
      return datasets;
  };

  return {
    getDatasets: function (db, categories) {
      var deferred = $q.defer();
      var promises = [];
      // Get all the promises
      angular.forEach(categories, function(value, key) {
        promises.push($translate(value + ".title"));
      });
      $q.all(promises).then(function(results) {
        deferred.resolve(getDatasetsSync(db, categories, results));
      });
      // return a promise
      return deferred.promise;
    }
  };
}]);

copsServices.factory('genericServices', function() {
  return {
    stringFormat: function (input) {
      var args = arguments;
      return input.replace(/\{(\d+)\}/g, function (match, capture) {
        return args[1*capture + 1];
      });
    }
  };
});


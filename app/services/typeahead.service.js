'use strict';

/*global Bloodhound */

var app = angular.module('Cops.services');

app.factory('typeaheadServices', ['$q', '$translate', function($q, $translate) {
  var getBloodhound = function (db, category) {
      var bhUrl = '/ncops/databases/' + db + '/' + category + '?q=%QUERY&perPage=5';
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
      var name;
      angular.forEach(categories, function(value, key) {
        name = 'name';
        if (value === 'books') { name = 'title'; }
        bloodhounds[key] = localGetBloodhound (db, value);
        bloodhounds[key].initialize();
        var headerTemplate = '<span class=\'tt-header\'>' + translations[key] + '</span>';
        datasets[key] = {
          name: value,
          displayKey: name,
          source: bloodhounds[key].ttAdapter(),
          templates: {
            header: headerTemplate
          }
        };
      });
      return datasets;
  };

  return {
    getDatasets: function (db, categories) {
      var deferred = $q.defer();
      var promises = [];
      // Get all the promises
      angular.forEach(categories, function(value) {
        promises.push($translate(value + '.title'));
      });
      $q.all(promises).then(function(results) {
        deferred.resolve(getDatasetsSync(db, categories, results));
      });
      // return a promise
      return deferred.promise;
    }
  };
}]);

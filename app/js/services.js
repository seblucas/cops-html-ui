'use strict';

/* Services */

var copsServices = angular.module('Cops.services', []);

copsServices.factory('typeaheadServices', function() {
  return {
    getBloodhound: function (db, category) {
      var bhUrl = '/ncops/databases/' + db + '/' + category + '?q=%QUERY&per_page=5'
      return new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 30,
        remote: {
                    url: bhUrl
                }
      });
    },
    getDatasets: function (db, categories) {
      var bloodhounds = [];
      var datasets = [];
      var localGetBloodhound = this.getBloodhound // Helper
      angular.forEach(categories, function(value, key) {
        bloodhounds[key] = localGetBloodhound (db, value);
        bloodhounds[key].initialize();
        var headerTemplate = '<h4>' + value + '</h4><hr />'
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
    }
  };
});

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


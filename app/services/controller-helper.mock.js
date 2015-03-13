'use strict';

var app = angular.module('Cops.services.mock', []);

app.factory('controllerHelperMockServices', ['$q', function($q) {
  var _localData;
  return {
    setTestData: function (testData) {
      _localData = testData;
    },
    initControllerWithPaging: function () {
      var deferred = $q.defer();
      deferred.resolve(_localData);
      return deferred.promise;
    },
    setConfigurationValue: function() {
    }
  };
}]);

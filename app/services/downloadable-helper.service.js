'use strict';

angular.module('Cops.services')
.factory('downloadableHelperServices', ['Restangular', function(Restangular) {
  var baseUrl = {};

  var getBaseUrl = function(db) {
    if (!angular.isDefined(baseUrl[db])) {
      baseUrl[db] = Restangular.one('databases', db)
                           .all('books')
                           .getRequestedUrl();
    }
    return baseUrl[db];
  };

  return {
    getCoverUrl: function (db, id) {
      return getBaseUrl(db) + '/' + id + '/cover';
    }
  };
}]);

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
    },
    getThumbnailUrlByHeight: function (db, id, height) {
      return getBaseUrl(db) + '/' + id + '/thumbnail?height=' + height;
    },
    getThumbnailUrlByWidth: function (db, id, width) {
      return getBaseUrl(db) + '/' + id + '/thumbnail?width=' + width;
    }
  };
}]);

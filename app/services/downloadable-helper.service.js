'use strict';

angular.module('Cops.services')
.factory('downloadableHelperServices', ['Restangular', function(Restangular) {
  var bookBaseUrl = {};

  var getBookBaseUrl = function(db) {
    if (!angular.isDefined(bookBaseUrl[db])) {
      bookBaseUrl[db] = Restangular.one('databases', db)
                           .all('books')
                           .getRequestedUrl();
    }
    return bookBaseUrl[db];
  };

  return {
    getCoverUrl: function (db, id) {
      return getBookBaseUrl(db) + '/' + id + '/cover';
    },
    getThumbnailUrlByHeight: function (db, id, height) {
      return getBookBaseUrl(db) + '/' + id + '/thumbnail?height=' + height;
    },
    getThumbnailUrlByWidth: function (db, id, width) {
      return getBookBaseUrl(db) + '/' + id + '/thumbnail?width=' + width;
    },
    getDataUrl: function (db, idBook, idData) {
      return getBookBaseUrl(db) + '/' + idBook + '/datas/' + idData;
    }
  };
}]);

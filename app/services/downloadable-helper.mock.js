'use strict';

angular.module('Cops.services.mock')
.factory('downloadableHelperMockServices', function() {
  return {
    getCoverUrl: function (db, id) {
      return 'url' + id;
    },
    getThumbnailUrlByHeight: function () {},
    getThumbnailUrlByWidth: function () {}
  };
});

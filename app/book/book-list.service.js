'use strict';

angular.module('Cops.book')
  .factory('bookListHelperServices', ['$rootScope',
                                      'downloadableHelperServices', function($rootScope, downloadableHelperServices) {
  return {
    getCoverUrl: function(id) {
      return downloadableHelperServices.getCoverUrl($rootScope.$stateParams.db, id);
    },
    getDataUrl: function(idBook, idData) {
      return downloadableHelperServices.getDataUrl($rootScope.$stateParams.db, idBook, idData);
    },
    getThumbnailUrlByWidth: function(id, width) {
      return downloadableHelperServices.getThumbnailUrlByWidth($rootScope.$stateParams.db, id, width);
    },
    getThumbnailUrlByHeight: function(id, height) {
      return downloadableHelperServices.getThumbnailUrlByHeight($rootScope.$stateParams.db, id, height);
    }
  };
}]);

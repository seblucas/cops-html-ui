'use strict';

angular.module('Cops.book')
  .factory('bookListHelperServices', ['$rootScope',
                                      '$q',
                                      'spinnerService',
                                      'downloadableHelperServices', function($rootScope, $q, spinnerService, downloadableHelperServices) {
  return {
    loadPage: function(method, $scope) {
      spinnerService.show('mainSpinner', 'Loading stuff...');
      var deferred = $q.defer();
      var params = {page: $scope.currentPage, perPage: $scope.itemsPerPage, authors: 1, tags: 1, series: 1, datas: 'EPUB,PDF'};
      if (angular.isDefined($rootScope.$stateParams.letter)) {
        params.letter = $rootScope.$stateParams.letter;
      }
      method.getList('books', params)
            .then(function(list) {
        // Ugly hack to get the paging metadata
        $scope.totalItems = list[0].metadata;
        delete list[0].metadata;
        spinnerService.hide('mainSpinner', 'Loading stuff...');
        deferred.resolve(list);
      });
      return deferred.promise;
    },
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
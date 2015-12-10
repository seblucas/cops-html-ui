'use strict';

describe('bookListHelperServices', function(){

  beforeEach(module('restangular'));
  beforeEach(module('angularSpinners'));
  beforeEach(module('Cops.book'));
  beforeEach(module('Cops.services'));

  var bookListHelperServices, downloadableHelperServices, $rootScope;

  beforeEach(inject(function (_$rootScope_, _bookListHelperServices_, _downloadableHelperServices_) {
    bookListHelperServices = _bookListHelperServices_;
    downloadableHelperServices = _downloadableHelperServices_;
    $rootScope = _$rootScope_;
    $rootScope.$stateParams = {db: 1};
  }));

  describe('thumbnails', function(){
    beforeEach(function() {
      spyOn(downloadableHelperServices, 'getThumbnailUrlByWidth');
      spyOn(downloadableHelperServices, 'getThumbnailUrlByHeight');
    });

    it('should get the url by height', function() {
      bookListHelperServices.getThumbnailUrlByHeight(1, 128);
      expect(downloadableHelperServices.getThumbnailUrlByHeight).toHaveBeenCalled();
    });

    it('should get the url by width', function() {
      bookListHelperServices.getThumbnailUrlByWidth(1, 128);
      expect(downloadableHelperServices.getThumbnailUrlByWidth).toHaveBeenCalled();
    });
  });

  describe('cover', function(){
    beforeEach(function() {
      spyOn(downloadableHelperServices, 'getCoverUrl');
    });

    it('should get the cover url', function() {
      bookListHelperServices.getCoverUrl(12);
      expect(downloadableHelperServices.getCoverUrl).toHaveBeenCalled();
    });
  });

  describe('data file', function(){
    beforeEach(function() {
      spyOn(downloadableHelperServices, 'getDataUrl');
    });

    it('should get the data file url', function() {
      bookListHelperServices.getDataUrl(12, 14);
      expect(downloadableHelperServices.getDataUrl).toHaveBeenCalled();
    });
  });

});

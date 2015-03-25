'use strict';

describe('typeaheadServices', function(){

  var translationMock = {
    'books.title': 'mybooks',
    'authors.title': 'myauthors'
  };

  var typeaheadServices, $rootScope;

  var triggerDigests = function() {
    return setInterval(function() {
      $rootScope.$digest();
    }, 5);
  };
  var stopDigests = function(interval) {
    window.clearInterval(interval);
  };

  beforeEach(module('pascalprecht.translate', function($translateProvider) {
    $translateProvider
      .translations('en', translationMock)
      .preferredLanguage('en');
  }));

  beforeEach(function() {
    module('Cops.services');
    inject(function (_$q_, _typeaheadServices_, _$rootScope_) {
      $rootScope = _$rootScope_;
      typeaheadServices = _typeaheadServices_;
    });
  });

  it('should return a dataset containing 1 row asking only for books', function(done) {
    var interval = triggerDigests();
    typeaheadServices.getDatasets(0, ['books']).then(function(dataset) {
      stopDigests(interval);
      expect(dataset.length).toBe(1);
      done();
    });
  });

  it('should return a dataset containing 2 row asking for books and authors', function(done) {
    var interval = triggerDigests();
    typeaheadServices.getDatasets(0, ['books', 'authors']).then(function(dataset) {
      stopDigests(interval);
      expect(dataset.length).toBe(2);
      done();
    });
  });

  it('should have a name equal to "name" for all categories except for books', function(done) {
    var interval = triggerDigests();
    typeaheadServices.getDatasets(0, ['authors']).then(function(dataset) {
      stopDigests(interval);
      expect(dataset[0].name).toBe('name');
      done();
    });
  });

  it('should have a name equal to "title" for books', function(done) {
    var interval = triggerDigests();
    typeaheadServices.getDatasets(0, ['books']).then(function(dataset) {
      stopDigests(interval);
      expect(dataset[0].name).toBe('title');
      done();
    });
  });

});

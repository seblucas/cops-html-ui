'use strict';

describe('categoryListController', function(){

  beforeEach(module('restangular'));
  beforeEach(module('Cops.book'), function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://xxx');
  });

  var bookJson = {
    id: '4',
    title: 'The Adventures of Sherlock Holmes',
    timestamp: '2012-03-03 19:47:50.042000+00:00',
    pubdate: '2007-07-18 22:00:00+00:00',
    uuid: 'be99a102-8275-47a0-9bb5-7c341d6a7dda',
    hasCover: '1',
    seriesIndex: '9.0'
  };

  var authorsJson = [
    {
        id: '1',
        name: 'Arthur Conan Doyle',
        sort: 'Doyle, Arthur Conan'
    }
  ];

  var tagsJson = [
    {
        id: '1',
        name: 'Fiction'
    },
    {
        id: '3',
        name: 'Mystery & Detective'
    },
    {
        id: '2',
        name: 'Short Stories'
    }
  ];

  var seriesJson = [
    {
        id: '1',
        name: 'Sherlock Holmes',
        sort: 'Sherlock Holmes',
        count: null
    }
  ];

  var scope, getController, httpBackend, stateParams, Restangular;

  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, _Restangular_) {
        httpBackend = _$httpBackend_;
        httpBackend.when('GET', '/databases/0/books/4').respond(bookJson);
        httpBackend.when('GET', '/databases/0/books/4/authors').respond(authorsJson);
        httpBackend.when('GET', '/databases/0/books/4/tags').respond(tagsJson);
        httpBackend.when('GET', '/databases/0/books/4/series').respond(seriesJson);
        Restangular = _Restangular_;
        stateParams = {db: 0, id : 4};
        scope = $rootScope.$new();
        getController = function () {
          return $controller('bookDetailController', {
            $scope: scope,
            $stateParams: stateParams,
            Restangular: Restangular
          });
        };
      }));
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should have the correct book', function() {
    httpBackend.expectGET('/databases/0/books/4');
    getController();
    httpBackend.flush();
    expect(scope.book.title).toBe('The Adventures of Sherlock Holmes');
  });

  it('should have the correct author', function() {
    httpBackend.expectGET('/databases/0/books/4/authors');
    getController();
    httpBackend.flush();
    expect(scope.authors.length).toBe(1);
    expect(scope.authors[0].name).toBe('Arthur Conan Doyle');
  });

  it('should have the correct tags', function() {
    httpBackend.expectGET('/databases/0/books/4/tags');
    getController();
    httpBackend.flush();
    expect(scope.tags.length).toBe(3);
    expect(scope.tags[0].name).toBe('Fiction');
  });

  it('should have the correct series', function() {
    httpBackend.expectGET('/databases/0/books/4/series');
    getController();
    httpBackend.flush();
    expect(scope.series.length).toBe(1);
    expect(scope.series[0].name).toBe('Sherlock Holmes');
  });


});
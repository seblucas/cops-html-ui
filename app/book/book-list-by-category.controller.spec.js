'use strict';

describe('bookListCategoryController', function(){

  beforeEach(module('restangular'));
  beforeEach(module('Cops.services'));
  beforeEach(module('Cops.services.mock'));
  beforeEach(module('Cops.book'), function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://xxx');
  });

  var booksJson1 = [
    {
        id: '2',
        title: 'The Return of Sherlock Holmes',
        timestamp: '2012-03-03 19:47:47.473000+00:00',
        pubdate: '2006-12-28 23:00:00+00:00',
        uuid: '87ddbdeb-1e27-4d06-b79b-4b2a3bfc6a5f',
        hasCover: '1',
        seriesIndex: '6.0'
    },
    {
        id: '3',
        title: 'The Casebook of Sherlock Holmes',
        timestamp: '2012-03-03 19:47:48.694000+00:00',
        pubdate: '2006-12-28 23:00:00+00:00',
        uuid: '518730a4-a16c-4666-8afb-eef4812b11b1',
        hasCover: '1',
        seriesIndex: '8.0'
    }
  ];

  var booksJson2 = [
    {
        id: '4',
        title: 'The Adventures of Sherlock Holmes',
        timestamp: '2012-03-03 19:47:50.042000+00:00',
        pubdate: '2007-07-18 22:00:00+00:00',
        uuid: 'be99a102-8275-47a0-9bb5-7c341d6a7dda',
        hasCover: '1',
        seriesIndex: '9.0'
    },
    {
        id: '13',
        title: 'The Hound of the Baskervilles',
        timestamp: '2012-03-03 19:48:00+00:00',
        pubdate: '2006-10-29 23:00:00+00:00',
        uuid: '28ba9d8f-6f1b-4b72-9150-d2933ebe13b5',
        hasCover: '1',
        seriesIndex: '3.0'
  }];

  var authorJson = {
        id: '3',
        name: 'Lewis Carroll',
        sort: 'Carroll, Lewis',
        count: '2'
    };

  var scope, getController, httpBackend, stateParams, Restangular, paging;

  beforeEach(inject(function ($q, $controller, _$httpBackend_, $rootScope, _Restangular_, controllerHelperMockServices, _bookListHelperServices_) {
        paging = {
          itemsPerPage: 2,
          itemsPerPageList: [2, 3],
          maxSize: 10,
          currentPage: 1
        };
        controllerHelperMockServices.setTestData(paging);
        httpBackend = _$httpBackend_;
        httpBackend.when('GET', '/databases/0/authors/1/books?authors=1&datas=EPUB,PDF&page=1&perPage=2&series=1&tags=1').respond(booksJson1);
        httpBackend.when('GET', '/databases/0/authors/1/books?authors=1&datas=EPUB,PDF&page=2&perPage=2&series=1&tags=1').respond(booksJson2);
        httpBackend.when('GET', '/databases/0/authors/1').respond(authorJson);
        Restangular = _Restangular_;
        stateParams = {db: 0, cat: 'authors', id: 1};
        scope = $rootScope.$new();
        getController = function () {
          return $controller('bookListCategoryController', {
            $scope: scope,
            $stateParams: stateParams,
            Restangular: Restangular,
            controllerHelperServices: controllerHelperMockServices,
            bookListHelperServices: _bookListHelperServices_
          });
        };
      }));
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should create a title with the author name', function() {
    getController();
    httpBackend.flush();
    expect(scope.title).toBe('Lewis Carroll');
  });

  it('should create a title with the tag name', function() {
    stateParams.cat = 'tags';
    stateParams.id = 5;
    stateParams.db = 4;
    httpBackend.whenGET('/databases/4/tags/5/books?authors=1&datas=EPUB,PDF&page=1&perPage=2&series=1&tags=1').respond([{t: 1, metadata: 2}]);
    httpBackend.expectGET('/databases/4/tags/5').respond({name: 'Fantasy'});
    getController();
    httpBackend.flush();
    expect(scope.title).toBe('Fantasy');
  });

  it('should create "books" model with 2 books', function() {
    getController();
    httpBackend.flush();
    expect(scope.books.length).toBe(2);
  });

  it('should have "The Return of Sherlock Holmes" on the first page', function() {
    httpBackend.expectGET('/databases/0/authors/1/books?authors=1&datas=EPUB,PDF&page=1&perPage=2&series=1&tags=1');
    getController();
    httpBackend.flush();
    expect(scope.books[0].title).toBe('The Return of Sherlock Holmes');
  });

  it('should have "The Adventures of Sherlock Holmes" on the second page', function() {
    paging.currentPage = 2;
    httpBackend.expectGET('/databases/0/authors/1/books?authors=1&datas=EPUB,PDF&page=2&perPage=2&series=1&tags=1');
    getController();
    httpBackend.flush();
    expect(scope.books[0].title).toBe('The Adventures of Sherlock Holmes');
  });
});

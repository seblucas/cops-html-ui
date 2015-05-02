'use strict';

describe('bookListController', function(){

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
        id: '5',
        title: 'The Call of the Wild',
        timestamp: '2012-03-03 19:47:51.238000+00:00',
        pubdate: '2007-01-01 23:00:00+00:00',
        uuid: 'bc4f5571-347f-4d2f-b1f6-22d2861b572c',
        hasCover: '1',
        seriesIndex: '1.0'
    }];

  var booksJsonLetterA = [
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
        id: '17',
        title: 'Alice\'s Adventures in Wonderland',
        timestamp: '2012-04-11 12:12:09+00:00',
        pubdate: '1897-04-10 23:00:00+00:00',
        uuid: 'd74fec58-06bc-4ba8-b8b4-24a91a58e6f9',
        hasCover: '1',
        seriesIndex: '1.0'
    }
];

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
        httpBackend.when('GET', '/databases/0/books?authors=1&datas=EPUB,PDF&page=1&perPage=2&series=1&tags=1').respond(booksJson1);
        httpBackend.when('GET', '/databases/0/books?authors=1&datas=EPUB,PDF&page=2&perPage=2&series=1&tags=1').respond(booksJson2);
        httpBackend.when('GET', '/databases/0/books?authors=1&datas=EPUB,PDF&letter=A&page=1&perPage=2&series=1&tags=1').respond(booksJsonLetterA);
        Restangular = _Restangular_;
        stateParams = {db: 0};
        scope = $rootScope.$new();

        getController = function () {
          return $controller('bookListController', {
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


  it('should create "list" model with 2 books', function() {
    getController();
    httpBackend.flush();
    expect(scope.books.length).toBe(2);
  });

  it('should have "The Return of Sherlock Holmes" on the first page', function() {
    httpBackend.expectGET('/databases/0/books?authors=1&datas=EPUB,PDF&page=1&perPage=2&series=1&tags=1');
    getController();
    httpBackend.flush();
    expect(scope.books[0].title).toBe('The Return of Sherlock Holmes');
  });

  it('should have "The Adventures of Sherlock Holmes" on the second page', function() {
    paging.currentPage = 2;
    httpBackend.expectGET('/databases/0/books?authors=1&datas=EPUB,PDF&page=2&perPage=2&series=1&tags=1');
    getController();
    httpBackend.flush();
    expect(scope.books[0].title).toBe('The Adventures of Sherlock Holmes');
  });

  it('should return "The Adventures of Sherlock Holmes" when filtering by books starting by a A', function() {
    stateParams.letter = 'A';
    httpBackend.expectGET('/databases/0/books?authors=1&datas=EPUB,PDF&letter=A&page=1&perPage=2&series=1&tags=1');
    getController();
    httpBackend.flush();
    expect(scope.books[0].title).toBe('The Adventures of Sherlock Holmes');
  });

});

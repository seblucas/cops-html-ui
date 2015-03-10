'use strict';

describe('categoryListController', function(){

  beforeEach(module('restangular'));
  beforeEach(module('Cops.category'), function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://xxx');
  });

  var authorsJson1 = [
    {
        id: '3',
        name: 'Lewis Carroll',
        sort: 'Carroll, Lewis',
        count: '2'
    },
    {
        id: '1',
        name: 'Arthur Conan Doyle',
        sort: 'Doyle, Arthur Conan',
        count: '8'
    }
  ];

  var authorsJson2 = [
    {
        id: '5',
        name: 'Alexandre Dumas',
        sort: 'Dumas, Alexandre',
        count: '2'
    },
    {
        id: '2',
        name: 'Jack London',
        sort: 'London, Jack',
        count: '1'
    }
  ];

  var authorsJsonQuery = [
    {
        id: '1',
        name: 'Arthur Conan Doyle',
        sort: 'Doyle, Arthur Conan',
        count: '8'
    }
  ];

  var authorsJsonLetterW = [
    {
        id: '4',
        name: 'H. G. Wells',
        sort: 'Wells, H. G.',
        count: '1'
    }
  ];

  var scope, getController, httpBackend, stateParams, Restangular, paging;

  beforeEach(inject(function ($q, $controller, _$httpBackend_, $rootScope, _Restangular_) {
        paging = {
          itemsPerPage: 2,
          itemsPerPageList: [2, 3],
          maxSize: 10,
          currentPage: 1
        };
        var controllerHelperServices = {
          initControllerWithPaging: function() {
            var deferred = $q.defer();
            deferred.resolve(paging);
            return deferred.promise;
          },
          setConfigurationValue: function() {}
        };
        var spinnerService = {
          hide: function() {},
          show: function() {}
        };
        httpBackend = _$httpBackend_;
        httpBackend.when('GET', '/databases/0/authors?page=1&per_page=2').respond(authorsJson1);
        httpBackend.when('GET', '/databases/0/authors?page=2&per_page=2').respond(authorsJson2);
        httpBackend.when('GET', '/databases/0/authors?page=1&per_page=2&q=doyle').respond(authorsJsonQuery);
        httpBackend.when('GET', '/databases/0/authors?letter=W&page=1&per_page=2').respond(authorsJsonLetterW);
        Restangular = _Restangular_;
        stateParams = {db: 0, cat : 'authors'};
        scope = $rootScope.$new();
        getController = function () {
          return $controller('categoryListController', {
            $scope: scope,
            $stateParams: stateParams,
            Restangular: Restangular,
            controllerHelperServices: controllerHelperServices,
            spinnerService: spinnerService
          });
        };
      }));
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should create "list" model with 2 authors', function() {
    getController();
    httpBackend.flush();
    expect(scope.list.length).toBe(2);
  });

  it('should have Lewis Carroll on the first page', function() {
    httpBackend.expectGET('/databases/0/authors?page=1&per_page=2');
    getController();
    httpBackend.flush();
    expect(scope.list[0].name).toBe('Lewis Carroll');
  });

  it('should have Alexandre Dumas on the second page', function() {
    paging.currentPage = 2;
    httpBackend.expectGET('/databases/0/authors?page=2&per_page=2');
    getController();
    httpBackend.flush();
    expect(scope.list[0].name).toBe('Alexandre Dumas');
  });

  it('should return Arthur Conan Doyle when querying', function() {
    stateParams.q = 'doyle';
    httpBackend.expectGET('/databases/0/authors?page=1&per_page=2&q=doyle');
    getController();
    httpBackend.flush();
    expect(scope.list[0].name).toBe('Arthur Conan Doyle');
  });

  it('should return H. G. Wells when filtering by author starting by a W', function() {
    stateParams.letter = 'W';
    httpBackend.expectGET('/databases/0/authors?letter=W&page=1&per_page=2');
    getController();
    httpBackend.flush();
    expect(scope.list[0].name).toBe('H. G. Wells');
  });
});

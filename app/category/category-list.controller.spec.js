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

  var scope, getController, httpBackend, stateParams, Restangular;

  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, _Restangular_) {
        var controllerHelperServices = {
          initController: function() {}
        };
        var spinnerService = {
          hide: function() {},
          show: function() {}
        };
        httpBackend = _$httpBackend_;
        httpBackend.when('GET', '/databases/0/authors?page=1&per_page=2').respond(authorsJson1);
        httpBackend.when('GET', '/databases/0/authors?page=2&per_page=2').respond(authorsJson2);
        httpBackend.when('GET', '/databases/0/authors?page=1&per_page=2&q=doyle').respond(authorsJsonQuery);
        Restangular = _Restangular_;
        stateParams = {db: 0, cat : 'authors'};
        scope = $rootScope.$new();
        scope.itemsPerPage = 2;
        scope.itemsPerPageList = [2, 3];
        scope.maxSize = 10;
        scope.currentPage = 1;
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


  it('should start with the list (and not the grid)', function() {
    getController();
    httpBackend.flush();
    expect(scope.currentTemplate).toBe('partials/category.list.html');
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
    scope.currentPage = 2;
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

});

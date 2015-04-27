'use strict';

describe('databaseListController', function(){

  beforeEach(module('restangular'));
  beforeEach(module('Cops.database'), function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://xxx');
  });

  var scope, getControllerList,  getControllerListCount, httpBackend, Restangular;

  var databasesJson1 = [
    {
        id: 0,
        name: 'OneAndOnly'
    }
  ];

  var databasesJson2 = [
    {
        id: 0,
        name: 'First'
    },
    {
        id: 1,
        name: 'Second'
    }
  ];

  var databaseDetailJson = {
    id: 0,
    name: 'First',
    categories: [
        {
            name: 'authors',
            count: '205'
        },
        {
            name: 'books',
            count: '1150'
        },
        {
            name: 'series',
            count: '173'
        },
        {
            name: 'tags',
            count: '27'
        },
        {
            name: 'publishers',
            count: '138'
        },
        {
            name: 'ratings',
            count: '6'
        }
    ]
  };

  beforeEach(inject(function ($q, $controller, _$httpBackend_, $rootScope, _Restangular_, _$filter_) {
        httpBackend = _$httpBackend_;
        Restangular = _Restangular_;
        scope = $rootScope.$new();
        getControllerList = function () {
          return $controller('databaseListController', {
            $scope: scope,
            Restangular: Restangular
          });
        };
        getControllerListCount = function () {
          return $controller('databaseListCountController', {
            $scope: scope,
            $filter: _$filter_,
            Restangular: Restangular
          });
        };
      }));
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('with 2 or more databases', function(){
    beforeEach(function() {
      httpBackend.when('GET', '/databases').respond(databasesJson2);
    });

    it('should create "databases" model with 2 databases', function() {
      getControllerList();
      httpBackend.flush();
      expect(scope.databases.length).toBe(2);
    });

  });

  describe('with only 1 database', function(){
    beforeEach(function() {
      httpBackend.when('GET', '/databases').respond(databasesJson1);
      scope.$state = {
        go: function() {}
      };
      spyOn(scope.$state, 'go');
    });

    it('should redirect to the database detail', function() {
      getControllerList();
      httpBackend.flush();
      expect(scope.$state.go).toHaveBeenCalled();
    });

  });

  describe('Book count', function(){
    beforeEach(function() {
      httpBackend.when('GET', '/databases/0').respond(databaseDetailJson);
    });

    it('should return only the number of books', function() {
      scope.database = { id: 0 };
      getControllerListCount();
      httpBackend.flush();
      expect(scope.bookCount).toBe('1150');
    });

  });
});

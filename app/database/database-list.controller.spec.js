'use strict';

describe('databaseListController', function(){

  beforeEach(module('restangular'));
  beforeEach(module('Cops.database'), function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://xxx');
  });

  var scope, getController, httpBackend, stateParams, Restangular, paging;

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

  beforeEach(inject(function ($q, $controller, _$httpBackend_, $rootScope, _Restangular_) {
        httpBackend = _$httpBackend_;
        Restangular = _Restangular_;
        scope = $rootScope.$new();
        getController = function () {
          return $controller('databaseListController', {
            $scope: scope,
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
      getController();
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
      getController();
      httpBackend.flush();
      expect(scope.$state.go).toHaveBeenCalled();
    });

  });
});

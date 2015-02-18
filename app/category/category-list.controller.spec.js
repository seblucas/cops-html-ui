'use strict';

describe('categoryListController', function(){

  beforeEach(module('restangular'));
  beforeEach(module('Cops.category'), function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://xxx');
  });

  //beforeEach(angular.mock.module('Cops.category'));

  var scope, ListCtrl, httpBackend, stateParams, Restangular;

  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, _Restangular_) {
        var controllerHelperServices = {
          initController: function() {}
        };
        var spinnerService = {
          hide: function() {},
          show: function() {}
        };
        httpBackend = _$httpBackend_;
        httpBackend.expectGET('/databases/0/authors').respond('[{"name":"tester"},{"name":"tester2"}]');
        Restangular = _Restangular_;
        stateParams = {db: 0, cat : 'authors'};
        scope = $rootScope.$new();
        ListCtrl = $controller('categoryListController', {
            $scope: scope,
            $stateParams: stateParams,
            Restangular: Restangular,
            controllerHelperServices: controllerHelperServices,
            spinnerService: spinnerService
          });
      }));
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should create "phones" model with 3 phones', function() {
    httpBackend.flush();
    expect(scope.currentTemplate).toBe('partials/category.list.html');
  });

});

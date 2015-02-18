'use strict';

describe('categoryListController', function(){

  beforeEach(module('Cops.category'));
  //beforeEach(angular.mock.module('Cops.category'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  it('should create "phones" model with 3 phones', function() {
    var $scope = {};
    var controller = $controller('categoryListController', { $scope: $scope });

    expect($scope.currentTemplate).toBe('partials/category.list.html');
  });

});

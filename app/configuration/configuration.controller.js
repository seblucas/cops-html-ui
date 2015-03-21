'use strict';

/**
 * @ngdoc object
 * @name Cops.configuration.configurationController
 * @requires downloadableHelperServices
 *
 * @description
 * COPS ui configuration
 */
angular.module('Cops.configuration', [])
  .controller('configurationController', ['$scope', 'configurationServices',
  function($scope, configurationServices) {
    $scope.conf = {};
    $scope.saving = false;
    $scope.pageSizes = configurationServices.getPageSizes();
    $scope.driver = configurationServices.getDriver();

    configurationServices.load().then(function(conf) {
      $scope.conf = conf;
    });

    $scope.save = function() {
      $scope.saving = true;
      configurationServices.save($scope.conf).then(function(obj) {
        $scope.conf = obj;
        $scope.saving = false;
      });
    };
  }]);

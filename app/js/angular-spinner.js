'use strict';

angular.module('seblucas.slSpinner', [])
.factory('spinnerService', function () {  
  var cache = {};
  return {

    // A private function intended for spinner directives to register themselves with the service.
    _register: function (spinnerScope) {
      // If no id is passed in, throw an exception.
      if (!spinnerScope.id) {
        throw new Error('A spinner must have an ID to register with the spinner service.');
      }

      // Add our spinner directive's scope to the cache.
      cache[spinnerScope.id] = spinnerScope;
    },

    // A private function exposed just in case the user really needs to manually unregister a spinner.
    _unregister: function (spinnerId) {
      delete cache[spinnerId];
    },

    // A private function that will remove an entire spinner group if needed.
    _unregisterGroup: function (group) {
      for (var spinnerId in cache) {
        if (cache.hasOwnProperty(spinnerId)) {
          if (cache[spinnerId].group === group) {
            delete cache[spinnerId];
          }
        }
      }
    },

    // A private function that will clear out all spinners from the cache.
    _unregisterAll: function () {
      for (var spinnerId in cache) {
        if (cache.hasOwnProperty(spinnerId)) {
          delete cache[spinnerId];
        }
      }
    },

    // Show the specified spinner.
    // If loadingText is specified, replace the loadingText specified on the directive as we show the spinner.
    show: function (spinnerId, loadingText) {
      if (cache.hasOwnProperty(spinnerId)) {
        var spinnerScope = cache[spinnerId];
        spinnerScope.showSpinner = true;
        if (loadingText !== undefined) {
          spinnerScope.loadingText = loadingText;
        }
      }
    },

    // Hide the specified spinner.
    // If doneText is specified, replace the doneText specified on the directive as we hide the spinner.
    hide: function (spinnerId, doneText) {
      if (cache.hasOwnProperty(spinnerId)) {
        var spinnerScope = cache[spinnerId];
        spinnerScope.showSpinner = false;
        if (doneText !== undefined) {
          spinnerScope.doneText = doneText;
        }
      }
    },

    // Iterate over all spinners and invoke the show function on all in the specified group.
    // If the loadingText is specified, pass it to the show function on each one.
    showGroup: function (group, loadingText) {
      for (var spinnerId in cache) {
        if (cache.hasOwnProperty(spinnerId)) {
          var spinnerScope = cache[spinnerId];
          if (spinnerScope.group === group) {
            this.show(spinnerId, loadingText);
          }
        }
      }
    },

    // Iterate over all spinners and invoke the hide function on all in the specified group.
    // If the doneText is specified, pass it to the hide function on each one.
    hideGroup: function (group, doneText) {
      for (var spinnerId in cache) {
        if (cache.hasOwnProperty(spinnerId)) {
          var spinnerScope = cache[spinnerId];
          if (spinnerScope.group === group) {
            this.hide(spinnerId, doneText);
          }
        }
      }
    },

    // Iterate over all spinners and invoke the show function on each one.
    // If the loadingText is specified, pass it to the show function on each one.
    showAll: function (loadingText) {
      for (var spinnerId in cache) {
        if (cache.hasOwnProperty(spinnerId)) {
          this.show(spinnerId, loadingText);
        }
      }
    },

    // Iterate over all spinners and invoke the hide function on each one.
    // If doneText is specified, pass it to the hide function on each one.
    hideAll: function (doneText) {
      for (var spinnerId in cache) {
        if (cache.hasOwnProperty(spinnerId)) {
          this.hide(spinnerId, doneText);
        }
      }
    }

  };
})
.directive('spinner', function () {
  return {
    restrict: 'E',
    template: '<span class="glyphicon glyphicon-refresh" ng-class="{\'glyphicon-spin\': showSpinner}"></span>',
    replace: true,
    scope: {
      id: '@',
      group: '@?',
      showSpinner: '@?',
      loadingText: '@?',
      doneText: '@?',
      onRegisterComplete: '&?'
    },
    controller: function ($scope, $attrs, spinnerService) {
      // Register the spinner with the spinner service.
      spinnerService._register($scope);

      // Invoke the onRegisterComplete expression, if any.
      // Expose the spinner service for easy access.
      $scope.onRegisterComplete({ $spinnerService: spinnerService });
    },
    link: function (scope, elem, attrs) {
    }
  };
});
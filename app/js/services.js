'use strict';

/* Services */

var copsServices = angular.module('Cops.services', []);

copsServices.factory('genericServices', function() {
  return {
    stringFormat: function (input) {
      var args = arguments;
      return input.replace(/\{(\d+)\}/g, function (match, capture) {
        return args[1*capture + 1];
      });
    }
  };
});


'use strict';


// Declare app level module which depends on filters, and services
angular.module('Cops', [
  'Cops.routes',
  'Cops.constants',
  'ngAnimate',
  'Cops.category',
  'Cops.configuration',
  'Cops.database',
  'Cops.book',
  'Cops.layout',
  'Cops.services',
  'templates',
  'ui.bootstrap',
  'pascalprecht.translate',
  'siyfion.sfTypeahead',
  'seblucas.slPageSizeChanger',
  'seblucas.slGridListToggle',
  'angularSpinners',
  'inline',
  'logglyLogger',
  'restangular'
]);

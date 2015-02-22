'use strict';


// Declare app level module which depends on filters, and services
angular.module('Cops', [
  'Cops.routes',
  'ngAnimate',
  'Cops.controllers',
  'Cops.category',
  'Cops.book',
  'Cops.layout',
  'Cops.services',
  'templates',
  'ui.bootstrap',
  'pascalprecht.translate',
  'siyfion.sfTypeahead',
  'seblucas.slPageSizeChanger',
  'seblucas.slGridListToggle',
  'seblucas.slSpinner',
  'seblucas.slStaticInclude',
  'restangular'
]);

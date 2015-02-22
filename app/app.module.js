'use strict';


// Declare app level module which depends on filters, and services
angular.module('Cops', [
  'ui.router',
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
]).
run([ '$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  // to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

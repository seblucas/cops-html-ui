'use strict';

angular.module('seblucas.slPageSizeChanger', [])
  .directive('slPageSizeChanger', function() {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        itemsPerPageList: '=',
        totalItems: '=',
      },
      template:
'<ul class="pagination pull-right"> \
  <li ng-repeat="itemValue in itemsPerPageList" ng-class="{active: itemsPerPage == itemValue}"><a href="" ng-click="selectItemPerPage(itemValue)">{{itemValue}}</a></li> \
  <li ng-if="totalItems" class="disabled"><a href="">Total : {{totalItems}}</a></li> \
</ul>',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$viewChangeListeners.push(function() {
            scope.$eval(attrs.ngChange);
        });
        ngModel.$render = function() {
            scope.itemsPerPage = ngModel.$modelValue;
        };
        scope.selectItemPerPage = function(value) {
          if (scope.itemsPerPage !== value) {
            scope.itemsPerPage = value;
            ngModel.$setViewValue(value);
          }
        };
      }
    };
  });
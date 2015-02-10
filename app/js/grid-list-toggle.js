'use strict';

angular.module('seblucas.slGridListToggle', [])
  .directive('slGridListToggle', function() {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        templatePrefix: '='
      },
      template:
'<div class="btn-group btn-group-lg pull-right"> \
  <button ng-repeat="item in toggles" type="button" class="btn btn-default" ng-class="{active: isTemplateActive(item)}" ng-click="toggleTemplate(item)"> \
    <span class="glyphicon glyphicon-{{item}}"></span> \
  </button> \
</div>',
      link: function(scope, element, attrs, ngModel) {
        scope.toggles = ['th', 'list'];
        ngModel.$render = function() {
            scope.currentTemplate = ngModel.$modelValue;
        };

        scope.toggleTemplate = function(value) {
          scope.currentTemplate = scope.templatePrefix + value +'.html';
          ngModel.$setViewValue(scope.currentTemplate);
        };

        scope.isTemplateActive = function(value) {
          return scope.currentTemplate.indexOf (value) > 0;
        };
      }
    };
  });
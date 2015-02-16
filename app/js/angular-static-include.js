'use strict';

// from http://jsfiddle.net/DeanIconWeb/BVXUe/
// from http://jsperf.com/ng-include-vs-static-include

angular.module('seblucas.slStaticInclude', [])
.directive('staticInclude', ['$http', '$templateCache', '$compile', '$parse', function($http, $templateCache, $compile, $parse) {
    return function(scope, element, attrs) {
      //var templatePath = $parse(attrs.staticInclude)(scope);

      attrs.$observe('staticInclude', function(value){
          scope.$watch(value, function(templatePath){
              loadTemplate(templatePath);
          });
      });

      function loadTemplate(templatePath){
          $http.get(templatePath, {cache: $templateCache}).success(function(response) {
              element.html(response);
              $compile( element.contents() )(scope);
          });

      }
    };
  }])
.directive('staticIncludePrecompiled', function($sce, $http, $templateCache, $compile) {
    var a = {};
    var suka = angular.element('<div></div>');
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var src = attrs.staticIncludePrecompiled; // $sce.parseAsResourceUrl(attrs.staticInclude)
            $http.get(src, {cache: $templateCache}).success(function(data) {
                if (!a[src]) {
                    a[src] = $compile(suka.html(data).contents());
                }
                a[src](scope, function(htmlasfasf) {
                    element.html(htmlasfasf);
                });
            });
        }
    };
});

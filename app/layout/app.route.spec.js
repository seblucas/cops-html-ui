'use strict';

describe('routes', function () {

  var mockTemplate, goTo, $state;

  beforeEach(module('Cops.routes'));

  beforeEach(inject(function ($templateCache, $rootScope, $location) {
    $state = $rootScope.$state;
    mockTemplate = function (templateRoute, tmpl) {
      $templateCache.put(templateRoute, tmpl || templateRoute);
    };

    goTo = function (url) {
      $location.url(url);
      $rootScope.$digest();
    };
  }));

  describe('when empty', function () {
    beforeEach(function() {
      mockTemplate('partials/main.html');
    });
    it('should go to the databases list', function () {
      goTo('');
      expect($state.current.name).toEqual('databases');
    });
  });

  describe('with database', function () {
    beforeEach(function() {
      mockTemplate('partials/database.html');
      mockTemplate('partials/main.html');
    });
    it('should show the database detail', function () {
      goTo('0');
      expect($state.current.name).toEqual('base.database');
    });
    it('should fail if not numeric', function () {
      goTo('a');
      expect($state.current.name).toEqual('databases');
    });

  });
});

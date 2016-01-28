'use strict';

angular.module('CopsE2E', ['Cops', 'ngMockE2E']).run(function ($httpBackend) {
  var getData = function(url, page, perPage) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    //return [request.status, request.response, {}];
    var data = JSON.parse(request.response);
    if (page && perPage) {
      data.splice(page * perPage);
      if (page > 1) {
       data.splice(0, (page - 1) * perPage);
      }
    }
    return data;
  };

  $httpBackend.whenGET(new RegExp('lang\/.*')).passThrough();
  $httpBackend.whenGET(/^\/ncops\/databases$/).respond(getData('mock/databases.txt'));
  $httpBackend.whenGET(/^\/ncops\/databases\/0$/).respond(getData('mock/databases_0.txt'));
  $httpBackend.whenGET(/^\/ncops\/databases\/1$/).respond(getData('mock/databases_1.txt'));
  var regexpAuthors = /^\/ncops\/databases\/0\/authors\?page=(.*?)\&perPage=(.*?)$/;
  $httpBackend.whenGET(regexpAuthors).respond(
    function (method, url) {
      var groups = regexpAuthors.exec(url);
      var ldata = getData('mock/databases_0_authors.txt', groups[1], groups[2]);
      return [200, ldata, {'X-Total-Count' : 97}];
  });
});

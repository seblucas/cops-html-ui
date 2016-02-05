'use strict';

describe('Database list', function() {

  beforeEach(function() {
    browser.get('#/');
  });

  it('should have a H1 title', function() {
    expect(element(by.tagName('h1')).getText()).toEqual('All');
  });

  it('should have 2 panels', function() {
    expect(element.all(by.css('.panel')).count()).toEqual(2);
  });

  it('should have 2 panels (repeater)', function() {
    expect(element.all(by.repeater('database in databases')).count()).toEqual(2);
  });
});

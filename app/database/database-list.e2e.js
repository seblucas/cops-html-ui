'use strict';

describe('Database list', function() {
  var items, itemsTag;
  var EC = protractor.ExpectedConditions;

  var waitForPage = function() {
    browser.wait(EC.presenceOf(itemsTag), 10000, 'Main list not found');
  };

  beforeEach(function() {
    browser.get('#/test');

    browser.waitForAngular();
    items = element.all(by.repeater('database in databases'));
    itemsTag = element(by.repeater('database in databases'));
  });

  fit('should have a H1 title', function() {
    waitForPage();
    expect(element(by.tagName('h1')).getText()).toEqual('All');
  });

  it('should have 2 panels', function() {
    waitForPage();
    expect(element.all(by.css('.panel')).count()).toEqual(2);
  });

  it('should have 2 panels (repeater)', function() {
    waitForPage();
    expect(items.count()).toEqual(2);
  });
});

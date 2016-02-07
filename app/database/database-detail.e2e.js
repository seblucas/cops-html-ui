'use strict';

describe('Database detail', function() {
  var items, itemsTag;
  var EC = protractor.ExpectedConditions;

  var waitForPage = function() {
    browser.wait(EC.presenceOf(itemsTag), 10000, 'Main list not found');
  };

  beforeEach(function() {
    browser.get('#/0');

    browser.waitForAngular();
    items = element.all(by.repeater('category in ::database.categories'));
    itemsTag = element(by.repeater('category in ::database.categories'));
  });

  it('should have a H1 title', function() {
    waitForPage();
    expect(element(by.tagName('h1')).getText()).toEqual('First');
  });

  it('should have 7 panels (repeater)', function() {
    waitForPage();
    expect(items.count()).toEqual(7);
  });
});

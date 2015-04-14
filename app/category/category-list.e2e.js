'use strict';

describe('Category list', function() {

  beforeEach(function() {
    browser.get('index_prod.html#/0/authors');
    browser.waitForAngular();
  });

  it('should have a H1 title', function() {
    expect(element(by.tagName('h1')).getText()).toEqual('Auteurs');
  });

  it('should have the first page starting by a A', function() {
    expect(element.all(by.repeater('item in list')).first().getText()).toMatch(/^A/);
  });

  it('should have the first page starting by a A', function() {
    expect(element.all(by.css('.list-group-item')).first().getText()).toMatch(/^A/);
  });

  it('should have the second page starting by anything but a A', function() {
    var nextButton = element(by.css('[ng-click="selectPage(page + 1)"]'));
    nextButton.click();
    browser.waitForAngular();
    expect(element.all(by.css('.list-group-item')).first().getText()).not.toMatch(/^A/);
  });
});

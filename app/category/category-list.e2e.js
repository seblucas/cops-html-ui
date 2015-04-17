'use strict';

describe('Category list', function() {

  var nextButton, items;

  beforeEach(function() {
    browser.get('index_prod.html#/0/authors');
    nextButton = element(by.css('[ng-click="selectPage(page + 1)"]'));
    items = element.all(by.repeater('item in list'));

    // We'll have to wait for at least an item or it may give false positive
    // Don't really know why
    //  * Maybe because of the static include
    //  * Maybe because of the some other directive
    browser.wait(function(){
      return element(by.css('.list-group-item')).isPresent();
    }, 1000);
  });

  afterEach(function () {
    browser.executeScript('indexedDB.deleteDatabase("cops");');
  });

  it('should have the first page starting by a A', function() {
    expect(items.first().getText()).toMatch(/^A/);
  });

  it('should have the second page starting by anything but a A', function() {
    nextButton.click();
    expect(items.first().getText()).not.toMatch(/^A/);
  });
});

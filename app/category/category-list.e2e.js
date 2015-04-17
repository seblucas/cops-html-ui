'use strict';

describe('Category list', function() {

  var nextButton;

  beforeEach(function() {
    browser.get('index_prod.html#/0/authors');
    nextButton = element(by.css('[ng-click="selectPage(page + 1)"]'));

    // We'll have to wait for at least an item or it may give false positive
    browser.wait(function(){
      return element(by.css('.list-group-item')).isPresent();
    }, 1000);
  });

  it('should have the first page starting by a A', function() {
    expect(element.all(by.repeater('item in list')).first().getText()).toMatch(/^A/);
  });

  it('should have the first page starting by a A', function() {
    expect(element.all(by.css('.list-group-item')).first().getText()).toMatch(/^A/);
  });

  it('should have the second page starting by anything but a A', function() {
    nextButton.click();
    expect(element.all(by.css('.list-group-item')).first().getText()).not.toMatch(/^A/);
  });
});

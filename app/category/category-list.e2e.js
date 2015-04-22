'use strict';

describe('Category list', function() {

  var nextButton, items, itemsPerPage, toggleBtn;

  var waitForPage = function() {
    // We'll have to wait for at least an item or it may give false positive
    // Don't really know why
    //  * Maybe because of the static include
    //  * Maybe because of the some other directive
    browser.wait(function(){
      return element(by.repeater('item in list')).isPresent() &&
             element(by.repeater('itemValue in itemsPerPageList')).isPresent();
    }, 1000);
  };

  beforeEach(function() {
    browser.get('#/0/authors');
    nextButton = element(by.css('[ng-click="selectPage(page + 1)"]'));
    items = element.all(by.repeater('item in list'));
    itemsPerPage = element.all(by.repeater('itemValue in itemsPerPageList'));
    toggleBtn = element.all(by.repeater('item in toggles'));

    waitForPage();
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

  it('should have 192 items (default value)', function() {
    expect(items.count()).toBe(192);
  });

  it('should have 24 items if the 24 button is choosen', function() {
    itemsPerPage.first().element(by.linkText('24')).click();
    expect(items.count()).toBe(24);
  });

  it('should save the prefered number of items per page', function() {
    itemsPerPage.first().element(by.linkText('24')).click();
    browser.get('#/0/authors');
    waitForPage();
    expect(items.count()).toBe(24);
  });

  describe('grid / list toggle', function() {
    it('should switch to card view if it is clicked', function() {
      toggleBtn.first().click();
      expect(element(by.css('.panel')).isPresent()).toBeTruthy();
    });

    it('should save the prefered view', function() {
      toggleBtn.first().click();
      browser.get('#/0/authors');
      waitForPage();
      expect(element(by.css('.panel')).isPresent()).toBeTruthy();
    });

  });
});

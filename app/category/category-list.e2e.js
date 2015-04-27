'use strict';

describe('Category list', function() {

  var nextButton, items, itemsPerPage, toggleBtn;
  var baseUrl = '#/0/authors';

  var waitForPage = function() {
    // We'll have to wait for at least an item or it may give false positive
    // Don't really know why
    //  * Maybe because of the static include
    //  * Maybe because of the some other directive
    browser.wait(function(){
      return element(by.css('.list-group-item')).isPresent() &&
             element(by.css('ul.pagination > li.active')).isPresent() &&
             element(by.repeater('item in toggles')).isPresent();
    }, 1000);
  };

  beforeEach(function() {
    browser.get(baseUrl);
    nextButton = element(by.css('[ng-click="selectPage(page + 1)"]'));
    items = element.all(by.repeater('item in list'));
    itemsPerPage = element.all(by.repeater('itemValue in itemsPerPageList'));
    toggleBtn = element.all(by.repeater('item in toggles'));

    waitForPage();
  });

  afterEach(function () {
    browser.executeScript('indexedDB.deleteDatabase("cops");');
  });

  describe('paging', function() {
    it('should have the first page starting by a A', function() {
      expect(items.first().getText()).toMatch(/^A/);
    });

    it('should have the second page starting by anything but a A', function() {
      nextButton.click();
      expect(items.first().getText()).not.toMatch(/^A/);
    });

  });

  describe('items per page', function() {
    it('should have 192 items (default value)', function() {
      expect(items.count()).toBe(192);
    });

    it('should have 24 items if the 24 button is choosen', function() {
      itemsPerPage.first().element(by.linkText('24')).click();
      expect(items.count()).toBe(24);
    });

    it('should save the prefered number of items per page', function() {
      itemsPerPage.first().element(by.linkText('24')).click();
      browser.get(baseUrl);
      waitForPage();
      expect(items.count()).toBe(24);
    });

  });

  describe('grid / list toggle', function() {
    it('should switch to card view if it is clicked', function() {
      toggleBtn.first().click();
      expect(element(by.css('.panel')).isPresent()).toBeTruthy();
    });

    it('should save the prefered view', function() {
      toggleBtn.first().click();
      browser.get(baseUrl);
      waitForPage();
      expect(element(by.css('.panel')).isPresent()).toBeTruthy();
    });

  });
});

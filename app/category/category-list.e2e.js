'use strict';

describe('Category list', function() {

  var nextButton, items, itemsTag, itemsPerPage, toggleBtn;
  var baseUrl = '#/0/authors';
  var EC = protractor.ExpectedConditions;

  var waitForPage = function() {
    browser.wait(EC.presenceOf(itemsTag), 10000, 'Main list not found');
  };

  beforeEach(function() {
    browser.get(baseUrl);
    //waitForPage();
    browser.waitForAngular();
    nextButton = element(by.css('[ng-click="selectPage(page + 1, $event)"]'));
    items = element.all(by.repeater('item in list'));
    itemsTag = element(by.repeater('item in list'));
    itemsPerPage = element.all(by.repeater('itemValue in itemsPerPageList'));
    toggleBtn = element.all(by.repeater('item in toggles'));
  });

  afterEach(function () {
    browser.executeScript('indexedDB.deleteDatabase("cops");');
  });

  describe('paging', function() {
    it('should have the first page starting by a A', function() {
      waitForPage();
      itemsPerPage.first().element(by.linkText('24')).click();
      expect(items.first().getText()).toMatch(/^A/);
    });

    it('should have the second page starting by anything but a A', function() {
      waitForPage();
      itemsPerPage.first().element(by.linkText('24')).click();
      nextButton.click();
      expect(items.first().getText()).not.toMatch(/^A/);
    });

  });

  describe('items per page', function() {
    it('should have 97 items (default value)', function() {
      waitForPage();
      expect(items.count()).toBe(97);
    });

    it('should have 24 items if the 24 button is choosen', function() {
      waitForPage();
      itemsPerPage.first().element(by.linkText('24')).click();
      expect(items.count()).toBe(24);
    });

    it('should save the prefered number of items per page', function() {
      waitForPage();
      itemsPerPage.first().element(by.linkText('24')).click();
      browser.waitForAngular();
      browser.sleep(200);
      browser.refresh();
      waitForPage();
      expect(items.count()).toBe(24);
    });

  });

  describe('grid / list toggle', function() {
    it('should switch to card view if it is clicked', function() {
      waitForPage();
      toggleBtn.first().click();
      expect(element(by.css('.panel')).isPresent()).toBeTruthy();
    });

    it('should save the prefered view', function() {
      waitForPage();
      toggleBtn.first().click();
      browser.waitForAngular();
      browser.sleep(200);
      browser.refresh();
      waitForPage();
      expect(element(by.css('.panel')).isPresent()).toBeTruthy();
    });

  });
});

'use strict';

describe('Translation', function() {
  var items, itemsTag, languageMenu, languageMenuToggle, languageMenuList, authorLink;
  var EC = protractor.ExpectedConditions;

  var waitForPage = function() {
    browser.wait(EC.presenceOf(itemsTag), 10000, 'Main list not found');
  };

  beforeEach(function() {
    browser.get('#/0');

    browser.waitForAngular();
    items = element.all(by.repeater('category in ::database.categories'));
    itemsTag = element(by.repeater('category in ::database.categories'));
    languageMenu = element(by.id('languageMenu'));
    languageMenuToggle = languageMenu.element(by.className('dropdown-toggle'));
    languageMenuList = languageMenu.element(by.className('dropdown-menu'));
    authorLink = items.first().element(by.css('a[ui-sref="base.category.list({cat: category.name})"]'));
  });

  describe('of the authors.title placeholder', function() {
    it('should have an english author string by default', function() {
      waitForPage();
      expect(authorLink.getText()).toEqual('Authors');
    });

    it('should have an french author string if French is selected', function() {
      waitForPage();
      languageMenuToggle.click(); // open the menu
      languageMenuList.element(by.linkText('Français')).click();
      expect(authorLink.getText()).toEqual('Auteurs');
    });

    xit('should have an french author string even after a refresh', function() {
      waitForPage();
      languageMenuToggle.click(); // open the menu
      languageMenuList.element(by.linkText('Français')).click();
      browser.sleep(200);
      browser.refresh();
      waitForPage();
      browser.pause();
      expect(items.first().element(by.linkText('Auteurs')).isPresent()).toBe(true);
    }).pend('The language is not saved in the localStorage for now');

  });
});

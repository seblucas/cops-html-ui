'use strict';

describe('Translation', function() {
  var items, itemsTag, languageMenu, languageMenuToggle, languageMenuList;
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
  });

  it('should have an english author string if English is selected', function() {
    waitForPage();
    languageMenuToggle.click(); // open the menu
    languageMenuList.element(by.linkText('English')).click();
    expect(items.first().element(by.linkText('Authors')).isPresent()).toBe(true);
  });

  it('should have an french author string if French is selected', function() {
    waitForPage();
    languageMenuToggle.click(); // open the menu
    languageMenuList.element(by.linkText('Français')).click();
    expect(items.first().element(by.linkText('Auteurs')).isPresent()).toBe(true);
  });
});

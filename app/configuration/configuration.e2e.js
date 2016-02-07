'use strict';

describe('Configuration', function() {

  beforeEach(function() {
    browser.get('#/config');
  });

  it('should have a save button', function() {
    expect(element(by.buttonText('Submit')).isPresent()).toBe(true);
  });
});

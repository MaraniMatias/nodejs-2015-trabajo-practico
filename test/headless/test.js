const Browser = require('zombie');
//const assert  = require('assert');
//const config = require('../../config.js')
Browser.localhost('localhost', 3200);

describe('User visits signup page', function() {

  const browser = new Browser();

  before(function() {
    return browser.visit('/admin');
  });

  describe('submits form', function() {

    before(function() {
      browser
        .fill('email',    'admin@admin.com')
        .fill('password', '123456');
      return browser.pressButton('Login');
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('title', 'Welcome');
    });
  });

});
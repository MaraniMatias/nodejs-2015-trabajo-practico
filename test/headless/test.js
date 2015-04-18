const Browser = require('zombie');
const assert  = require('assert');
const config = require('../../config.js')

Browser.localhost('localhost', 3200);
describe('User visits signup page', function() {
  const browser = new Browser();
  
 it("Visitar pag de login", function(done) {
    browser.visit('/admin', function() {
      assert(browser.text('title') === 'Login', "La página de título debe coincidir");
      assert(browser.text('legend') === 'Please login', "Entrar título debe existir y partido");
      assert(browser.text('legend') === 'Please login', "Entrar título debe existir y partido");
      done();
    });
 });

  it("Completando login", function(done) {
    browser.visit('/admin');
    browser.fill('email', 'admin@admin.com');
    browser.fill('password', '123456');
    browser.pressButton('Login').then(function() {
      assert.equal(browser.text('title') === 'Welcome');
    }).then(done, done);
  });
  
  
  
});


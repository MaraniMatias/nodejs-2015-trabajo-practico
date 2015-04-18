const Browser = require('zombie');
//const assert  = require('assert');
//const config = require('../../config.js')
var assert = require("assert");

  browser = new Browser()
  browser.visit("http://localhost:3200/admin", function (e, browser) {
    console.log(browser.text('title'));

  });


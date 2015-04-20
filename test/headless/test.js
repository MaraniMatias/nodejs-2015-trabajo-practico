var assert = require('assert'),
    config = require('../../config'),
    Browser = require("zombie");

// Global Variables for the test case
var Sample, sample, browser, sampleId, sampleSearch, sampleEdited, sampleNew, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('Testing'+d+"/admin", function(){

    before(function(done){

         // Before all tests
       Sample = require('../../models/employees');
        // It show create a new document in the database
        sample = new Sample({ name: 'samplecruditem'+Math.floor((Math.random() * 10) + 1)});
        sample.save(function(err, doc){
            sampleId = doc._id;
            sampleSearch = doc.name;
        });
      
        // Get domain
        d = 'http://'+config.app.domain+":"+config.app.port;
        // Start browser
        browser = new Browser({debug:false});
        // Login if necesary
        browser.visit(d+"/admin", function () {
          browser
            .fill("email", "admin@admin.com")
            .fill("password", "123456")
            .pressButton("Login", function(){
                done();
            });
        });
    });

    describe('Testing ABM Empleado', function(){
      it('Deveriamos estar en la pag. de bienbenida', function() {
        browser.assert.text('title', 'Welcome');
      });
    
    
    }); 
      

  after(function() {
    browser.destroy();
  });
});
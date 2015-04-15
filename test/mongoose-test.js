var assert = require("assert");
var urlDB = "mongodb://localhost/crudtest";

describe('Probando la conexion', function(){
    it('No deveria dar error.', function(done){
      var mongoose = require('mongoose');
        mongoose.connect(urlDB , function(err){
        if (err) throw err;
        done();
      });
    })
});
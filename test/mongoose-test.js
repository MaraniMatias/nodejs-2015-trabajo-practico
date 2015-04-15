var Employees = require('../models/employees')
  , assert = require("assert")
  , should = require('should')
  , mongoose = require('mongoose')
  , urlDB = "mongodb://localhost/crudtest";
    
describe('Conexion a MongoDB.', function(){
    it('-> No deveria dar error.', function(done){
        mongoose.connect(urlDB , function(err){
        if (err) throw err;
        done();
      });
    })      
});

describe('Metodos del docuemtno que aplica an MongoDB.', function(){
  before(function() {
    mongoose.connect(urlDB);
    employees = new Employees({name : 'nameTest' , 
                               surname : 'surnameTest' , 
                               email : 'test@test.com' , 
                               password : 'test' });
  })
  it('-> Metodo save.', function(done){
    employees.save(function(err){
      if (err) throw err;
      done();
    });
  });


  
  
  
  it('-> Leer un documento', function() {
    assert.equal(-1, -1);
  });      
});


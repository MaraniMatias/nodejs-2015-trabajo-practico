var Employees = require('../models/employees')
  , assert = require("assert")
  , config = require('../config.js')
  , should = require('should')
  , mongoose = require('mongoose')
  ;
var urlDB = config.mongoDB.url;

/*
describe('Mentodos de Employees.', function(){
    it('-> No deveria dar error.', function(done){
        mongoose.connect(urlDB , function(err){
        if (err) throw err;
        done();
      });
    })     
});
*/

describe('Validad contraseña.', function(){
  it('-> Longitud de la contaseña es incorecta.', function(){
    emp = new Employees({ password : 'test' });
    emp.valodaPassword().should.not.be.ok; // no deveria ser verdadero
  });
  it('-> Longitud de la contraseña es correcta', function(){
      emp = new Employees({ password : 'Qwerty6@' });
    emp.valodaPassword().should.be.ok; // deveria ser verdadero
  });
});

describe('Validad email.', function(){ 
  it('-> El email "admin@admid.com" NO se puede usar.', function() {
    emp = new Employees({ email : 'admins@admin.com'});
     emp.valodaEmail().should.not.be.ok;
  });
  it('-> El email "test@test.com" se puede usar.', function() {
    emp = new Employees({ email : "test@test.com"});
    emp.valodaEmail().should.be.ok;
  });
  it('-> El email "test@test.com" es valido.', function() {
    emp = new Employees({ email : "test@test.com" });
    emp.valodaTextEmail().should.be.ok;
  });
  it('-> El email "test@test" no valido.', function() {
    emp = new Employees({ email : "test@test" });
    emp.valodaTextEmail().should.not.be.ok;
  });
});


describe('Validad email.', function(){ 
  describe('Email Validos.', function(){ 
    it('-> El email "test@test.com" se puede usar.', function() {
      emp = new Employees({ email : "test@test.com"});
      emp.valodaEmail2(function(err){
        if (err) throw err;
        done();
      });
    });
    it('-> El email "test@test.com" es valido.', function() {
      emp = new Employees({ email : "test@test.com" });
      emp.valodaEmail2(function(err){
        if (err) throw err;
        done();
      });
    });
  });
  describe('Email Invalidos.', function(){ 
    it('-> El email "admin@admid.com" NO se puede usar.', function() {
      emp = new Employees({ email : 'admins@admin.com'});
      emp.valodaEmail2(function(err){
        if (err) throw err;
        done();
      });
    });
    it('-> El email "test@test" no valido.', function() {
      emp = new Employees({ email : "test@test" });
      emp.valodaEmail2(function(err){
        if (err) throw err;
        done();
      });
    });
  });

});

/*
describe('mocha', function(){  
  it('should fail when throwing an error', function(){
    throw "FAIL"
  })
});

describe('Documento en MongoDB', function() {
  before(function() {
    assert = require("assert");
  });
  it('Leer un documento', function() {
    assert.equal(-1, -1);
  });
  it('Crear un documento', function() {
    assert.equal(true,true);
  });
  it('Editar un documento', function() {
    assert(true,false);
  });
  it('Borrar un documento', function() {
    assert.equal(-1, -2);
  });
});
*/
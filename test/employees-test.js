var Employees = require('../models/employees')
  , assert = require("assert")
  , config = require('../config.js')
//  , should = require('should')
  ;


describe('Validad contraseña.', function(){
  it('-> Longitud de la contaseña es incorecta.', function(){
    emp = new Employees({ password : 'test' });
    emp.valodaPassword(function(err){
      if (err) throw err;
      done();
    });
  });
  it('-> Longitud de la contraseña es correcta.', function(){
    emp = new Employees({ password : 'Qwerty6@' });
    emp.valodaPassword(function(err){
      if (err) throw err;
      done();
    });
  });
});

describe('Validad email.', function(){ 
  describe('Email Validos.', function(){ 
    it('-> El email "test@test.com".', function() {
      emp = new Employees({ email : "test@test.com"});
      emp.valodaEmail(function(err){
        if (err) throw err;
        done();
      });
    });
    it('-> El email "test@test.com.ar".', function() {
      emp = new Employees({ email : "test@test.com.ar" });
      emp.valodaEmail(function(err){
        if (err) throw err;
        done();
      });
    });
  });
  describe('Email Invalidos.', function(){ 
    it('-> El email "admin@admid.com".', function() {
      emp = new Employees({ email : 'admins@admin.com'});
      emp.valodaEmail(function(err){
        if (err) throw err;
        done();
      });
    });
    it('-> El email "test@test".', function() {
      emp = new Employees({ email : "test@test" });
      emp.valodaEmail(function(err){
        if (err) throw err;
        done();
      });
    });
        it('-> El email "@admid.com".', function() {
      emp = new Employees({ email : '@admin.com'});
      emp.valodaEmail(function(err){
        if (err) throw err;
        done();
      });
    });
    it('-> El email "edtest.com".', function() {
      emp = new Employees({ email : "edtest.com" });
      emp.valodaEmail(function(err){
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
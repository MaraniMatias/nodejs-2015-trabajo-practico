var Employees = require('../models/employees')
  , assert = require("assert")
  , config = require('../config.js')
  //, should = require('should')
  , mongoose = require('mongoose')
  ;
var urlDB = config.mongoDB.url;
    
    
describe('Conexion a MongoDB.', function(){
    it('-> No deveria dar error.', function(done){
        mongoose.connect(urlDB , function(err){
        if (err) throw err;
        done();
      });
    })     
});


describe('Metodos Employees que aplica an MongoDB.', function(){
  it('-> Guardar documento.', function(done){
      employees = new Employees({name : 'empleadoUNO' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'test@test.com' , 
                                 password : 'Test123@' });
      employees.save(function(err,doc){
          if (err) throw err;
          done();
      });
  });
  it('-> Guardar otro documento.', function(done){
      emp = new Employees({name : 'empleadoDOS' , 
                           surname : 'surnameTestTres' ,
                           provider : 'test',
                           email : 'test3@test.com' , 
                           password : 'Test123@' });
      emp.save(function(err,doc){
          if (err) throw err;
          done();  
      });
      console.log('\t Id Guardo: ' + emp.id);
  });
/*
  it('-> Editar documento', function() {
    Employees.findOne({ _id: employees.id }, function(err, doc){
      if (err) throw err;
          doc.name = 'empleadoEDITADO' ;
          doc.surname = 'surname2Test' ;
          doc.email = 'test2@test2' ;
          doc.provider = 'test';
          doc.password = 'test' ;
          doc.save(function(err,doc){
            if (err) throw err;
            done();
          });
      console.log('\t Id Editado: ' + emp.id);
    });
  });
  */
  /*
  it('-> Borrar documento', function() {
      Employees.remove({ _id: emp.id },function(err,doc){
        if (err) throw err;
        done();
      });
      console.log('\t Id Borrado: ' + emp.id);
  });
    it('-> Borrar documento', function() {
      Employees.remove({ _id: employees.id },function(err,doc){
        if (err) throw err;
        done();
      });
      console.log('\t Id Borrado: ' + employees.id);
  });
  */
});
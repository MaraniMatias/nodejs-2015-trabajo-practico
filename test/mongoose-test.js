var Employees = require('../models/employees')
  , assert = require("assert")
  //, should = require('should')
  , mongoose = require('mongoose')
  , urlDB = "mongodb://localhost/tp-nodejs";
    
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
      employees = new Employees({name : 'nameTest' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'test@test.com' , 
                                 password : 'test' });
      employees.save(function(err,doc){
          if (err) throw err;
          done();
      });
  });
  it('-> Guardar otro documento.', function(done){
      emp = new Employees({name : 'name3Test' , 
                           surname : 'surname3Test' ,
                           provider : 'test',
                           email : 'test3@test.com' , 
                           password : 'test3' });
      emp.save(function(err,doc){
          if (err) throw err;
          done();  
      });
      console.log('\t Id Guardo: ' + emp.id);
  });
  it('-> Editar documento', function() {
      emp.name = 'name2Test' ;
      emp.surname = 'surname2Test' ;
      emp.email = 'test2@test2.com' ;
      emp.provider = 'test';
      emp.password = 'test2' ;
      emp.save(function(err,doc){
        if (err) throw err;
        done();
      });
      console.log('\t Id Editado. ' + emp.id);
  });
  it('-> Borrar documento', function() {
      Employees.remove({ _id: emp.id },function(err,doc){
        if (err) throw err;
        done();
      });
      console.log('\t Id Borrado. ' + emp.id);
  });
});

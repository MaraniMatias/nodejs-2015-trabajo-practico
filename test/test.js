var Employees = require('../models/employees')
  , assert = require("assert")
  , config = require('../config.js')
  , should = require('should')
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

describe('Validad contraseña.', function(){
  describe('- Contaseña es incorecta.', function(){
    it('-> qwe', function(){
      employees = new Employees({name : 'empleadoUNO' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'test@test.com' , 
                                 password : 'qwe' });

      employees.save(function(err){
         should(err).be.not.empty;
      });
    });
    it('-> qwertyyyy', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : 'qwertyyyy' });
        employees.save(function(err){
         should(err).be.not.empty;
        });

    });
    it('-> querty1213', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : 'querty1213' });
        employees.save(function(err){
         should(err).be.not.empty;
        });

    });
    it('-> 123456789', function(){

        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : '123456789' });
        employees.save(function(err){
         should(err).be.not.empty;
        });

    });
    it('-> 1234567@', function(){
    
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : '1234567@' });
        employees.save(function(err){
            should(err).be.not.empty;
        });

    });
    it('-> Qwerty123' , function(){
  
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : 'Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
 
    });
    it('-> @qwerty123', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : '@qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
  });
    describe('- Contraseña es correcta.', function(){
      it('-> @Qwerty123', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.empty;
        });
      });
      it.skip('-> 123456 con email admin@admin.com', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin@admin.com' , 
                                   password : '123456' });
        employees.save(function(err){
            should(err).be.empty;
        });
      });
    });
});

describe('Validad email.', function(){
  describe('- Email es incorecta.', function(){
    it.skip('-> admin@admin.com', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin@admin.com' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin@admin', function(){
       employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin@admin' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin.com', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin.com' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin@', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin@' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin@admin@admin.com' , function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin@admin@admin.com' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> a@admin.com.admin@admin', function(){
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'a@admin.com.admin@admin' , 
                                   password : '@Qwerty123' });
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
  });
  describe('- Email es correcta.', function(){
    it('-> admin@admin.com.ar', function(){
      employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin@admin.com.ar' , 
                                   password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.empty;
      });
    });
    it('-> matias@admin.com', function(){
      employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'matias@admin.com' , 
                                   password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.empty;
      });
    });
    it.skip('-> admin@admin.com con contraseña 123456 ', function(){
      employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'admin@admin.com' , 
                                   password : '123456' });
      employees.save(function(err){
          should(err).be.empty;
      });
    });
  });
});
  
describe('Validad nombre.', function(){
  describe('- Nombre es incorecta.', function(){
    it('-> admin@admin.com', function(){
      employees = new Employees({name : 'admin@admin.com' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'admin@admin.com' , 
                                 password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> nobre1', function(){
      employees = new Employees({name : 'nobre1' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'admin@admin.com' , 
                                 password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> a', function(){
      employees = new Employees({name : 'a' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'admin@admin.com' , 
                                 password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> 1nombre', function(){
      employees = new Employees({name : '1nombre' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'admin@admin.com' , 
                                 password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> nombre@', function(){
      employees = new Employees({name : 'nombre@' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'admin@admin.com' , 
                                 password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
  });
  describe('- Nombre es correcta.', function(done){
    it('-> matias', function(){
      employees = new Employees({name : 'matias' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'admin@admin.com' , 
                                 password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.empty;
      });
    });
  });
});
    
describe('Validad apellido.', function(done){
  describe('- Apellido es incorecta.', function(done){
    it('-> nobre1', function(){
        employees = new Employees({name : 'matias' , 
                                   surname : 'nobre1' , 
                                   provider : 'test',
                                   email : 'admin@admin.com' , 
                                   password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> a', function(){
        employees = new Employees({name : 'matias' , 
                                   surname : 'a' , 
                                   provider : 'test',
                                   email : 'admin@admin.com' , 
                                   password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> 1nombre', function(){
        employees = new Employees({name : 'matias' , 
                                   surname : '1nombre' , 
                                   provider : 'test',
                                   email : 'admin@admin.com' , 
                                   password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> nombre@', function(){
        employees = new Employees({name : 'matias' , 
                                   surname : 'nombre@' , 
                                   provider : 'test',
                                   email : 'admin@admin.com' , 
                                   password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
  });
  describe('- Apellido es correcta.', function(done){
    it('-> matias', function(){
      employees = new Employees({name : 'matias' , 
                                 surname : 'matias' , 
                                 provider : 'test',
                                 email : 'admin@admin.com' , 
                                 password : '@Qwerty123' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
  });
});

    
describe('Metodos Employees que aplica an MongoDB.', function(done){
  it('-> Guardar documento.', function(){
      employees = new Employees({name : 'empleadoUNO' , 
                                 surname : 'surnameTest' , 
                                 provider : 'test',
                                 email : 'test@test.com' , 
                                 password : 'Test123@' });
      employees.save(function(err){
          should(err).be.not.empty;
      });
      console.log('\t Id Guardo: ' + employees.id);
  });
  it('-> Guardar otro documento.', function(){
      emp = new Employees({name : 'empleadoDOS' , 
                           surname : 'surnameTestTres' ,
                           provider : 'test',
                           email : 'test3@test.com' , 
                           password : 'Test123@' });
      emp.save(function(err){
          should(err).be.not.empty;
      });
      console.log('\t Id Guardo: ' + emp.id);
  });
  /*
  it('-> Editar documento', function() {
    console.log('\t emp : ' + emp.id);
    console.log('\t emp : ' + emp.name);
          emp.name = 'empleadoEDITADO' ;
          emp.surname = 'surname2Test' ;
          emp.email = 'test2@test2.com' ;
    console.log('\t emp Editado: ' + emp.id);
    console.log('\t emp Editado: ' + emp.name);
          emp.save(function(err,doc){
              if (err) throw err;
              done();
          });

  });
  */
  
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
  
});
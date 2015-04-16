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

describe('Validad contraseña.', function(done){
  describe('- Contaseña es incorecta.', function(done){
    it('should not throw an error', function(){
      function isPositive(n) {
          if(n <= 0) throw new Error('Given number is not positive')
      }
      isPositive.bind(null, -10).should.throw();
    });
    it('should not throw an error', function(){
      function isPositive(n) {
          if(n <= 0) throw new Error('Given number is not positive')
      }
      isPositive.bind(null, -10).should.throw();
    });
    it('-> qwe', function(done){
      (function(done){ 
         employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : 'qwe' });
        employees.save(function(err,doc){
            if (err) throw err;
            done();
        });
      }).should.throw();
    });
    it('-> qwertyyyy', function(done){
      (function(){ 
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : 'qwertyyyy' });
        employees.save(function(err,doc){
            if (err) throw err;
            done();
        });
      }).should.throw();
    });
    it('-> querty1213', function(done){
      (function(){ 
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : 'querty1213' });
        employees.save(function(err,doc){
            if (err) throw err;
            done();
        });
      }).should.throw();
    });
    it('-> 123456789', function(done){
      (function(){ 
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : '123456789' });
        employees.save(function(err,doc){
            if (err) throw err;
            done();
        });
      }).should.throw();
    });
    it('-> 1234567@', function(done){
      (function(){ 
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : '1234567@' });
        employees.save(function(err,doc){
            if (err) throw err;
            done();
        });
      }).should.throw();
    });
    it('-> Qwerty123' , function(done){
      (function(){ 
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : 'Qwerty123' });
        employees.save(function(err,doc){
            if (err) throw err;
            done();
        });
      }).should.throw();
    });
    it('-> @qwerty123', function(done){
      (function(){ 
        employees = new Employees({name : 'empleadoUNO' , 
                                   surname : 'surnameTest' , 
                                   provider : 'test',
                                   email : 'test@test.com' , 
                                   password : '@qwerty123' });
        employees.save(function(err,doc){
            if (err) throw err;
            done();
        });
      }).should.throw();
    });
  });
    describe('- Contraseña es correcta.', function(done){
      it('-> @Qwerty123', function(done){
      });
      it('-> 123456 con email admin@admin.com', function(done){
      });
    });
});

describe('Validad email.', function(done){
  describe('- Email es incorecta.', function(done){
    it('-> admin@admin.com', function(done){
    });
    it('-> admin@admin', function(done){
    });
    it('-> admin.com', function(done){
    });
    it('-> admin', function(done){
    });
    it('-> admin@', function(done){
    });
    it('-> admin@admin@admin.com' , function(done){
    });
    it('-> a@admin.com.admin@admin', function(done){
    });
  });
  describe('- Email es correcta.', function(done){
    it('-> admin@admin.com.ar', function(done){
    });
    it('-> matias@admin.com', function(done){
    });
    it('-> admin@admin.com con contraseña 123456 ', function(done){
    });
  });
});
  
describe('Validad nombre.', function(done){
  describe('- Nombre es incorecta.', function(done){
    it('-> admin@admin.com', function(done){
    });
    it('-> nobre1', function(done){
    });
    it('-> a', function(done){
    });
    it('-> 1nombre', function(done){
    });
    it('-> nombre@', function(done){
    });
  });
  describe('- Nombre es correcta.', function(done){
    it('-> matias', function(done){
    });
  });
});
    
describe('Validad apellido.', function(done){
  describe('- Apellido es incorecta.', function(done){
    it('-> admin@admin.com', function(done){
    });
    it('-> nobre1', function(done){
    });
    it('-> a', function(done){
    });
    it('-> 1nombre', function(done){
    });
    it('-> nombre@', function(done){
    });
  });
  describe('- Apellido es correcta.', function(done){
    it('-> matias', function(done){
    });
  });
});

    
describe('Metodos Employees que aplica an MongoDB.', function(done){
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
      console.log('\t Id Guardo: ' + employees.id);
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
var Employees = require('../../models/employees')
  , assert = require("assert")
  , config = require('../../config.js')
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
    });    
});

describe('Validad contraseña.', function(){
  before(function() {
    employees = new Employees({name : 'empleadoUNO' , 
                               surname : 'surnameTest' , 
                               provider : 'test',
                               email : 'test@test.com' , 
                               password : 'qwe' });
  });
  describe('- Contaseña es incorecta.', function(){
    it('-> qwe', function(){
      employees.password =  'qwe';
      employees.save(function(err){
         should(err).be.not.empty;
      });
    });
    it('-> qwertyyyy', function(){
      employees.password = 'qwertyyyy';
      employees.save(function(err){
        should(err).be.not.empty;
      });
    });
    it('-> querty1213', function(){
        employees.password = 'querty1213';
        employees.save(function(err){
         should(err).be.not.empty;
        });
    });
    it('-> 123456789', function(){
        employees.password = '123456789';
        employees.save(function(err){
         should(err).be.not.empty;
        });
    });
    it('-> 1234567@', function(){
        employees.password = '1234567@' ;
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> Qwerty123' , function(){
        employees.password = 'Qwerty123';
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> @qwerty123', function(){
        employees.password = '@qwerty123';
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
  });
    describe('- Contraseña es correcta.', function(){
      it('-> @Qwerty123', function(){
        employees.password = '@Qwerty123';
        employees.save(function(err){
            should(err).be.empty;
        });
      });
      it('-> 123456 con email admin@admin.com', function(){
        employees.email = 'admin@admin.com' ;
        employees.password= '123456' ;
        employees.save(function(err){
            should(err).be.empty;
        });
      });
    });
});

describe('Validad email.', function(){
  describe('- Email es incorecta.', function(){
    it('-> admin@admin.com', function(){
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
        employees.email = 'admin@admin';
        employees.save(function(err){
          should(err).be.not.empty;
        });
    });
    it('-> admin.com', function(){
        employees.email = 'admin.com';
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin', function(){
        employees.email = 'admin';
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin@', function(){
        employees.email = 'admin@';
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> admin@admin@admin.com' , function(){
        employees.email = 'admin@admin@admin.com' ;
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> a@admin.com.admin@admin', function(){
        employees.email = 'a@admin.com.admin@admin' ;
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
  });
  describe('- Email es correcta.', function(){
    it('-> admin@admin.com.ar', function(){
      employees.email = 'admin@admin.com.ar';
      employees.save(function(err){
          should(err).be.empty;
      });
    });
    it('-> matias@admin.com', function(){
      employees.email = 'matias@admin.com';
      employees.save(function(err){
          should(err).be.empty;
      });
    });
    it('-> admin@admin.com con contraseña 123456 ', function(){
      employees.email = 'admin@admin.com' ;
      employees.password= '123456' ;
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
      employees.name = 'nobre1';
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> a', function(){
      employees.name = 'a' ;
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> 1nombre', function(){
      employees.name = '1nombre';
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> nombre@', function(){
      employees.name = 'nombre@' ;
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
  });
  describe('- Nombre es correcta.', function(done){
    it('-> matias', function(){
      employees.name = 'matias' ;
      employees.save(function(err){
          should(err).be.empty;
      });
    });
  });
});
    
describe('Validad apellido.', function(done){
  describe('- Apellido es incorecta.', function(done){
    it('-> nobre1', function(){
        employees.surname = 'nobre1';
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> a', function(){
        employees.surname = 'a' ;
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
    it('-> 1nombre', function(){
        employees.surname = '1nombre';
        employees.save(function(err){
            should(err).be.not.empty;
        });
    });
    it('-> nombre@', function(){
        employees.surname = 'nombre@' ;
      employees.save(function(err){
          should(err).be.not.empty;
      });
    });
  });
  describe('- Apellido es correcta.', function(done){
    it('-> matias', function(){
      employees.surname='matias' ;
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
              employees.save(function(err,doc){
              if (err) throw err;
              done();
          });
      console.log('\t Id Guardo: ' + employees.id);
  });
  it('-> Guardar otro documento.', function(){
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
  
  it('-> Guardar Administrador.', function(){
      emp = new Employees({ name: "admin",
                          surname: "admin",
                          email: "admin@admin.com", 
                          password : "123456"
                        });

              emp.save(function(err,doc){
              if (err) throw err;
              done();
          });
      console.log('\t Id Guardo: ' + emp.id);
  });
  
  describe('- Autenticacion del administrador.', function(){
    it('-> Correto',function(){
      should(emp.authenticate("123456")).be.ok;
    });
    it('-> Imcorecto',function(){
      should(emp.authenticate("incorrect")).not.be.ok;
    });
}); 

  
});
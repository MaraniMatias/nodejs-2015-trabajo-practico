var assert = require("assert");
var chai = require('chai');
chai.should();

describe('Tes predeterminados', function(){  
describe('chai', function(){  
  it('debe fallar cuando afirmando falsa', function(){
    false.should.equal(true)
  })

  it('debe pasar cuando el tipo de pruebas', function(){
    "string".should.be.a("string")
  })

  it('debe pasar cuando las pruebas incluyen', function(){
    [1,2,3].should.include(2)
  })
});


describe('mocha', function(){  
  it('should fail when throwing an error', function(){
    throw "FAIL"
  })
});

describe('Documento en MongoDB', function() {
  before(function() {
    assert = require("assert");
  })
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
});
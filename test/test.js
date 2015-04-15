var assert = require("assert");

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
var assert = require("assert")
/*
var Admin = require('../models/admins');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crudtest');

var a = new Admin({ email:"admin@admin.com", password: "123456" });
a.save(function(err, doc){
    console.log(err, doc);    
    console.log("PasswordOK", a.authenticate("123456"));
    console.log("PasswordFAIL", a.authenticate("incorrect"));
    
});
*/
describe('Probando conexión', function() {
    before(function() {
        mongoose = require('mongoose');
    });
    it('Conectado cuando no hay error', function() {

    });
  
});

describe('Documento en MongoDB', function() {
  it('Leer un documento', function() {
    assert.equal(-1, -1);
  });
  it('Crear un documento', function() {
    assert.equal(-1, -1);
  });
  it('Editar un documento', function() {
    assert.equal(-1, -1);
  });
  it('Borrar un documento', function() {
    assert.equal(-1, -2);
  });
});

/*
//------------------------------------------------

describe('Array', function() {
    describe('#indexOf()', function() {
        it('debe devolver -1 cuando el valor no está presente', function() {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        })
    })
    describe('#indexOf()', function() {
        it('debe devolver el valor cuando el valor está presente', function() {
            assert.equal(0, [1, 2, 3].indexOf(1));
            assert.equal(2, [1, 2, 3].indexOf(3));
        })
    })
    describe('#indexOf()', function() {
        it('debe devolver ubicación (índice) de cadena cuando la cadena está presente Cadena dar', function() {
            var str = "Hello world, welcome to the universe.";
            var n = str.indexOf("welcome");
            var expectingValue =13
            assert.equal(expectingValue, n);
        })
    })
    describe('#indexOf()', function() {
        it('debe devolver ubicación (índice) de cadena cuando la cadena está presente Cadena dar', function() {
            var str = "Hello world.";
            var n = str.indexOf("welcome");
            var expectingValue =13
            assert.equal(expectingValue, n);
        })
    })
});

var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('debe devolver -1 cuando el valor no está presente', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})
describe('Array', function(){
  describe('#indexOf()', function(){
    it('debe devolver -1 cuando el valor no está presente', function(){
      assert.equal(-1, [1,2,3].indexOf(3));
    })
  })
});


it.skip('create()', function() {
  // TODO: write MainClass.create()
});

describe('hooks', function() {
  before(function() {
    // corre antes de todas las pruebas en este bloque
  })
  after(function(){
    // corre después de todas las pruebas en este bloque
  })
  beforeEach(function(){
    // ejecuta antes de cada prueba en este bloque
  })
  afterEach(function(){
    //  ejecuta después de cada prueba en este bloque
  })
  // casos de prueba
});

beforeEach(function(){
  // beforeEach hook
});
beforeEach(function namedFun() {
  // beforeEach:namedFun
});
beforeEach('some description', function(){
  // beforeEach:some description
});

var assert = require('assert');

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});

describe('api', function(){
  describe('GET /api/users', function(){
    it('respond with an array of users')
  })
});

describe('app', function(){
  describe('GET /users', function(){
    it('respond with an array of users')
  })
});


/*
var test = require('unit.js')
describe('My module', function() {
  var MainClass = require('my-module/lib/main');
  it('load', function() {
    var myModule  = require('my-module');
    test
      .function(myModule)
        .hasName('MyModule')
      .object(myModule())
        .isInstanceOf(MainClass)
    ;
  });
  describe('Main class', function() {
    it('emit() - emit an event', function() {
      var spy  = test.spy();
      var main = new MainClass();
      var listener = function(value) {
        spy();
        // test the value emitted
        test.string(value)
          .isIdenticalTo('value of any event');
      };
      test
        .given('add listener', function() {
          main.on('any.event', listener);
        })
        .when('emit an event', function() {
          main.emit('any.event', 'value of any event');
        })
        .then(function() {
          test
            .function(main.listeners('any.event'))
            .bool(spy.calledOnce)
              .isTrue()
          ;
        })
    });
    it('connection', function(done) {
      // asynchronous test
      main.get('http://localhost/api/show/item', function(err, json, headers) {
        var now = new Date();
        if(err) {
          test.fail(err.message);
        }
        test
          .value(headers)
            .hasHeaderJson()
          .object(json)
            .hasKey('title', 'item title')
            .hasKey('description')
          .date(json.updatedAt)
            .isBefore(now)
        ;
        done();
      });
    });
  });
});
*/
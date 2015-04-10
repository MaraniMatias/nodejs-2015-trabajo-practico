var app = module.parent.exports.app;
var Persons = require('../models/persons.js');
// LISTADO
app.get('/list', function(req, res){
  var msg = req.flash('message'); // Read the flash message
  Persons.find({}, function(err, docs){
    res.render('list', { title: 'List', persons: docs, flashmsg: msg}); // Pass Flash Message to the view
  });
});

// NUEVO
 app.get('/new', function(req, res){
    req.flash('message', 'You visited /new'); // Save the flash message
    res.render('new', { title: 'New'});
 });
app.post('/new', function(req, res){
    console.log(req.body);
    var p = new Persons({ name: req.body.name, age: req.body.age });
    p.save(function(err, doc){
        if(!err){
          res.redirect('/list');
        } else {
          res.end(err);    
        }    
    });
});

// BORRAR
app.get('/delete/:id', function(req, res){
    Persons.remove({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.redirect('/list');
        } else {
            res.end(err);    
        }    
    });
});


// EDITAR
app.get('/edit/:id', function(req, res){
    Persons.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('edit', { title: 'Edit', person: doc});
        } else {
            res.end(err);    
        }    
    });
});
app.post('/edit/:id', function(req, res){
    Persons.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            doc.name = req.body.name; 
            doc.age = req.body.age;
            doc.save(function(err, doc){
                if(!err){
                    res.redirect('/list');
                } else {
                    res.end(err);    
                }    
            }); 
        } else {
            res.end(err);    
        }    
    });
});

// Login
app.get('/login', function(req, res){
  var msg = req.flash('message'); // Read the flash message
  res.render('login', { title: 'login', flashmsg: msg}); // Pass Flash Message to the view
});
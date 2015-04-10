var app = module.parent.exports.app;
var Persons = require('../models/persons.js');
var Admins = require('../models/admins.js');
var passport = module.parent.exports.passport;
var adminAuth = function(req, res, next){
    //authorize role
    if(typeof req.user != "undefined"){
        next();
    }else{
        //Not authorized redirect
        res.redirect('/');
    }
}
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

//LOGIN
app.get('/login', function(req, res){
  var msg = req.flash('message');
  res.render('login', { title: 'Login', flashmsg: msg});
});
app.post('/login', passport.authenticate('AdminLogin', 
    { successRedirect: '/list',
      failureRedirect: '/', //failureRedirect: '/login',
      failureFlash: true })
);
/*
app.post('/login', function(req, res){
    res.json(req.body);
});
*/
  
// LISTADO
app.get('/list', function(req, res){
  var msg = req.flash('message'); // Read the flash message
  Persons.find({}, function(err, docs){
    res.render('list', { title: 'List', persons: docs, flashmsg: msg}); // Pass Flash Message to the view
  });
});
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
  
// SEARCH
app.get('/search', adminAuth, function(req, res){
  var msg = req.flash('message');
  Persons.find({}, function(err, docs){
    res.render('search', { title: 'Search', flashmsg: msg});
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
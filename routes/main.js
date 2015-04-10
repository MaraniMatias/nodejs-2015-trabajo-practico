var app = module.parent.exports.app;
var Employees = require('../models/employees.js');
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
app.get('/admin', function(req, res){
  var msg = req.flash('message');
  res.render('admin', { title: 'Login', flashmsg: msg});
});
app.post('/admin', passport.authenticate('AdminLogin', 
    { successRedirect: '/panel', // autentificacion ok
      failureRedirect: '/', //failureRedirect: '/login',
      failureFlash: true })
);
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
/*
app.post('/login', function(req, res){
    res.json(req.body);
});
*/
  
// LISTADO
app.get('/list', function(req, res){
  var msg = req.flash('message'); // Read the flash message
  Employees.find({}, function(err, docs){
    res.render('list', { title: 'List', persons: docs, flashmsg: msg}); // Pass Flash Message to the view
  });
});

// SEARCH
app.get('/search', adminAuth, function(req, res){
  var msg = req.flash('message');
  Employees.find({}, function(err, docs){
    res.render('search', { title: 'Search', flashmsg: msg});
  });
});

// NUEVO
 app.get('/panel/employees/new', adminAuth, function(req, res){
    req.flash('message', 'You visited /new'); // Save the flash message
    res.render('new', { title: 'New Employees'});
 });
app.post('/panel/employees/new', adminAuth, function(req, res){
    //console.log(req.body);
    var p = new Employees({ name: req.body.name, age: req.body.age });
    p.save(function(err, doc){
        if(!err){
          res.redirect('/list');
        } else {
          res.end(err);    
        }    
    });
});

// BORRAR
app.get('/delete/:id', adminAuth, function(req, res){
    Employees.remove({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.redirect('/list');
        } else {
            res.end(err);    
        }    
    });
});


// EDITAR
app.get('/edit/:id',adminAuth, function(req, res){
    Employees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('edit', { title: 'Edit', person: doc});
        } else {
            res.end(err);    
        }    
    });
});
app.post('/edit/:id',adminAuth, function(req, res){
    Employees.findOne({ _id: req.params.id }, function(err, doc){
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
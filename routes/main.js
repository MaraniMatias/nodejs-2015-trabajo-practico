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
  res.render('admin', { title: 'Login', url: '/admin', flashmsg: msg});
});
app.post('/admin', passport.authenticate('AdminLogin', 
    { successRedirect: '/panel/employees', // autentificacion ok
      failureRedirect: '/', //failureRedirect: '/login',
      failureFlash: true })
);
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/panel/employees');
});
  
// LISTADO
app.get('/panel/employees', function(req, res){
  var msg = req.flash('message'); // Read the flash message
  Employees.find({}, function(err, docs){
    res.render('list', { title: 'List',  url: '/panel/employees' , persons: docs, flashmsg: msg}); // Pass Flash Message to the view
  });
});

// SEARCH
app.get('/search', function(req, res){
  var msg = req.flash('message');
  Employees.find({}, function(err, docs){
    res.render('search', { title: 'Search', url: '/search', flashmsg: msg});
  });
});

// NUEVO
 app.get('/panel/employees/new', adminAuth, function(req, res){
    req.flash('message', 'Employed successfully added.'); // Save the flash message
    res.render('new', { title: 'New Employees', url: '/panel/employees/new' });
 });
app.post('/panel/employees/new', adminAuth, function(req, res){
    //console.log(req.body);
    var p = new Employees({ name: req.body.name, surname: req.body.surname, email: req.body.email, password: req.body.password});
    p.save(function(err, doc){
        if(!err){
          res.redirect('/panel/employees');
        } else {
          res.end(err);    
        }    
    });
});

// BORRAR
app.get('/delete/:id', adminAuth, function(req, res){
    Employees.remove({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.redirect('/panel/employees');
        } else {
            res.end(err);    
        }    
    });
});

// EDITAR
app.get('/edit/:id',adminAuth, function(req, res){
    Employees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('edit', { title: 'Edit', url: '/panel/employees' , person: doc});
        } else {
            res.end(err);    
        }    
    });
});
app.post('/edit/:id',adminAuth, function(req, res){
    EmployeesEmployees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            doc.name = req.body.name; 
            doc.surname = req.body.surname;
            doc.email = req.body.email;
            doc.save(function(err, doc){
                if(!err){
                    res.redirect('/panel/employees');
                } else {
                    res.end(err);    
                }    
            }); 
        } else {
            res.end(err);    
        }    
    });
});
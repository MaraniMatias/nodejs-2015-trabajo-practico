var app = module.parent.exports.app;
var Employees = require('../models/employees.js');
var passport = module.parent.exports.passport;
var adminAuth = function(req, res, next){
  if(typeof req.user != "undefined"){
      next();
  }else{
      res.redirect('/');
  }
};
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
    { successRedirect: '/panel/employees', 
      failureRedirect: '/admin' })
);
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
  //FACEBOOK
  app.get('/admin/facebook', passport.authenticate('FacebookLogin'));
  app.get('/admin/facebook/callback', passport.authenticate('FacebookLogin',
      { successRedirect: '/panel/employees',failureRedirect: '/admin' })
  );
  //GITHUB
  app.get('/admin/github', passport.authenticate('GithubLogin'));
  app.get('/admin/github/callback', passport.authenticate('GithubLogin', 
      {failureRedirect: '/admin' }) ,
          function(req, res) { res.redirect('/panel/employees');}
  );

// LISTADO
app.get('/panel/employees', function(req, res){
  var msg = req.flash('message'); // Read the flash message
  Employees.find({}, function(err, docs){
    res.render('list', { title: 'Welcome',  
                        url: '/panel/employees' , 
                        persons: docs, 
                        flashmsg: msg}); // Pass Flash Message to the view
  });
});
// SEARCH
app.get('/search', function(req, res){
  var msg = req.flash('message');
  Employees.find({}, function(err, docs){
    res.render('search', { title: 'Search', url: '/search', flashmsg: msg});
  });
});
// SAVE
app.get('/panel/employees/new', adminAuth, function(req, res){
    req.flash('message', 'You visited /new'); 
    res.render('new', { title: 'New Employees', url: '/panel/employees/new' });
});
app.post('/panel/employees/new', adminAuth, function(req, res){
  var emp = new Employees({name: req.body.name, 
                           surname: req.body.surname,
                           email: req.body.email, 
                           password: req.body.password , 
                           provider: 'web'});
  emp.save(function(err, doc){
    if(!err){
      res.redirect('/panel/employees');
    }else{
      res.redirect('/error');   
    }
  })
});
// REMOVE
app.get('/delete/:id', adminAuth, function(req, res){
    Employees.remove({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.redirect('/panel/employees');
        } else {
            res.end(err);    
        }    
    });
});
// EDIT
app.get('/edit/:id',adminAuth, function(req, res){
    Employees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('edit', { title: 'Edit' , person: doc});
        } else {
            res.end(err);    
        }    
    });
});
app.post('/edit/:id',adminAuth, function(req, res){
    Employees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            doc.name = req.body.name; 
            doc.surname = req.body.surname;
            doc.email = req.body.email;
            doc.save(function(err, doc){
              if(!err){
                  res.redirect('/panel/employees');
              } else {
                console.log(err);
                  res.end(err);    
              }    
            }); 
        } else {
            res.end(err);    
        }    
    });
});
var app = module.parent.exports.app;
var Employees = require('../models/employees.js');
var config = require('../config.js');
var passport = module.parent.exports.passport;
var adminAuth = function(req, res, next){
  if(typeof req.user != "undefined"){ next();
  }else{  res.redirect('/'); }
};
app.use(function(req, res, next){res.locals.user = req.user; next(); });

//LOGIN
app.get('/admin', function(req, res){
  res.render('admin', { title: 'Login', url: '/admin'});
});
app.get('/admin/fail', function(req, res){
  res.render('admin', { title: 'Login', url: '/admin', flashmsg: 'Password or email invalid.'});
});
app.post('/admin', passport.authenticate('AdminLogin', 
    { successRedirect: '/panel/employees', 
      failureRedirect: '/admin/fail'}) 
);
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
  //FACEBOOK
  app.get('/admin/facebook', passport.authenticate('FacebookLogin'));
  app.get('/admin/facebook/callback', passport.authenticate('FacebookLogin',
      {successRedirect: '/panel/employees',failureRedirect: '/admin' })
  );
  //GITHUB
  app.get('/admin/github', passport.authenticate('GithubLogin'));
  app.get('/admin/github/callback', passport.authenticate('GithubLogin', 
      {failureRedirect: '/admin'}),function(req, res){res.redirect('/panel/employees');}
  );

// LISTADO
app.get('/panel/employees', function(req, res){
  var msg = req.flash('message');
  Employees.find({}, function(err, docs){
    res.render('list', { title: 'Welcome', url: '/panel/employees' , 
                        persons: docs, flashmsg: msg}); 
  });
});
// SEARCH
app.get('/search', function(req, res){
  Employees.find({}, function(err, docs){
    res.render('search', { title: 'Search', url: '/search'});
  });
});
app.get('/search/res', function(req, res,next){
  var re = new RegExp(req.query.q, 'i');
  if(req.query.q) {
	Employees.find().or([{name :{ $regex: re }},{  surname: { $regex: re } }]).exec(function(err, docs){
      docs.forEach(function(element, index, array){
                    element.password=undefined;
                    element.__v=undefined;
                    element.createdAt=undefined;
                    element.provider_id=undefined;
                   });
      res.json(docs);
    });
  }
});
app.post('/search', function(req, res){
  res.redirect('/edit/'+req.body.search);
});

// SAVE
app.get('/panel/employees/new', adminAuth, function(req, res){
    res.render('new', { title: 'New Employees', url: '/panel/employees/new', person: new Employees() });
});
app.post('/panel/employees/new', adminAuth, function(req, res){
  var emp = new Employees({name: req.body.name, 
                           surname: req.body.surname,
                           email: req.body.email,
                           password: req.body.password , 
                           provider: 'web'});
  emp.save(function(err, doc){ 
    if(!err){ req.flash('message', 'Employee '+doc.name+' '+doc.surname +' added successfully.'); 
      res.redirect('/panel/employees');
    }else{ 
      if(err.code!=11000){console.log(err);var msg = err}else{var msg =  'This email is already used ciendo';};
      res.render('new', { title: 'New Employees', url: '/panel/employees/new', person: emp , flashmsg: msg});
    }
  })
});
// REMOVE
app.get('/delete/:id', adminAuth, function(req, res){
  Employees.remove({ _id: req.params.id }, function(err, doc){
    if(!err){ req.flash('message', 'Employee delete successfully.'); 
      res.redirect('/panel/employees');
    } else { res.end(err);   }    
  });
});
// EDIT
app.get('/edit/:id',adminAuth, function(req, res){
  Employees.findOne({ _id: req.params.id }, function(err, doc){
    if(!err){ res.render('edit', { title: 'Edit' , person: doc});
    } else { req.flash('message', 'Error '+err.message); 
      res.end(err);    }    
  });
});
app.post('/edit/:id',adminAuth, function(req, res){
  Employees.findOne({ _id: req.params.id }, function(err, doc){
    if(!err){
      var emp = doc;
        doc.name = req.body.name; 
        doc.surname = req.body.surname;
        doc.email = req.body.email;
        doc.save(function(err, doc){
          if(!err){ req.flash('message', 'Employee '+doc.name+' '+doc.surname +' edited successfully.'); 
            res.redirect('/panel/employees');
          } else { 
            if(err.code!=11000){console.log(err);var msg = err}else{var msg =  'This email is already used ciendo';};       
            res.render('edit', { title: 'Edit', person: emp , flashmsg: msg});
        }}); 
    } else { req.flash('message', 'Error '+err.message); res.end(err);}    
  });
});
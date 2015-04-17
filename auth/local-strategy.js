var passport =  require('passport')//module.parent.exports.passport
  , Employess = require('../models/employees.js')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GitHubStrategy = require('passport-github').Strategy
  , config = require('../config.js')
  //, adminAuth = {}
;  

passport.serializeUser(function(user, done) { done(null, user);});
passport.deserializeUser(function(user, done) { done(null, user);});

passport.use('AdminLogin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Employess.findOne({ email:username }, function(err, adm) {
      if (err) { return done(err); }
      if (!adm) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!adm.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, adm);
    });
  }
));

passport.use('FacebookLogin', new FacebookStrategy(
  {
    clientID : config.facebook.id,
    clientSecret : config.facebook.secret,
    callbackURL: '/admin/facebook/callback',
    profileFields : ['id', 'displayName', /*'provider', */'name' ,'photos']
  }, function(accessToken, refreshToken, profile, done) {
		Employess.findOne({provider_id: profile.id /*,provider: profile.provider*/}, 
            function(err, user) {
              if(err) throw(err);
              if(!err && user!= null) return done(null, user);
              var user = new Employess({
                  provider_id	: profile.id,
                  provider : profile.provider,
                  surname : profile.name.familyName,
                  name : profile.name.givenName + ' ' + profile.name.middleName ,
                  photo : profile.photos[0].value
              });
              user.save(function(err) {
                  if(err) throw err;
                  done(null, user);
              });
		  });
    }
));

passport.use('GithubLogin', new GitHubStrategy({
    clientID: config.github.id,
    clientSecret: config.github.secret,
    callbackURL: '/admin/github/callback',
    profileFields : ['id', 'displayName']
  },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            var user = new Employess({
                  provider_id	: profile.id,
                  provider : 'github',
                  email : profile.email,
                  name : profile.displayName,
                  photo : profile.avatar_url
              });
              user.save(function(err) {
                  if(err) throw err;
                  done(null, user);
              });
          done(null, profile);
       })
    }


));

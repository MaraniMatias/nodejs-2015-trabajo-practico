var passport = module.parent.exports.passport
  , Admins = require('../models/employees.js')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , config = require('./config.js')
;
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('AdminLogin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Admins.findOne({ email:username }, function(err, adm) {
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
		profileFields : ['id', 'displayName', /*'provider', */'photos']
	}, function(accessToken, refreshToken, profile, done) {
		Admins.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			// Al igual que antes, si el usuario ya existe lo devuelve
			// y si no, lo crea y salva en la base de datos
			var user = new Admins({
				provider_id	: profile.id,
				provider : profile.provider,
				name : profile.displayName,
				photo : profile.photos[0].value
			});
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));
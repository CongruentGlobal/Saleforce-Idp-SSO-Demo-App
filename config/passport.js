var SamlStrategy = require('passport-saml').Strategy

module.exports = function (passport, _config) {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use(new SamlStrategy(
	  {
	    path: _config.passport.saml.path,
	    entryPoint: _config.passport.saml.entryPoint,
	    issuer: _config.passport.saml.issuer,
	    cert: _config.passport.saml.cert,
	    identifierFormat: _config.passport.saml.identifierFormat,
	  },
	  function(profile, done) {
		return done(null,
			{
				id : profile.nameID,
				email : profile.email,
				username : profile.username,
				displayName: profile.fullname,
				nickname: profile.nickname,
			});
	  })
	);

}

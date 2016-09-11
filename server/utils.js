var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(config, request, User){
	var module = {}
	module.ensureAuthenticated = function(req, res, next) {
	    if (!req.headers.authorization) {
	        return res.send({data:'Sin Autorizacion'});
	    }
	    var token = req.headers.authorization.split(' ')[1];

	    var payload = null;
	    try {
	        payload = jwt.decode(token, config.SECRET_TOKEN);
	    } catch (err) {
	        return res.send({data: "Error"});
	    }

	    if (payload.exp <= moment().unix()) {
	        return res.send({data: "Sesion Expirada"});
	    }
	    req.user = payload;
	    next();
	}

	module.createJWT = function(user) {
	    var payload = {
	        id: user.id,
	        iat: moment().unix(),
	        exp: moment().add(14, 'days').unix(),
	        username: user.username
	    };
	    return jwt.encode(payload, config.SECRET_TOKEN);
	}

	module.decode = function(token){
		return jwt.decode(token, config.SECRET_TOKEN)
	}

	module.noHeader = function(user, socialmedia){
		return new Promise(function(resolve, reject){
			var social = {}
			social[socialmedia] = user[socialmedia];
			User.findOne(social, function(err, existingUser) {
	            if (existingUser) {
	            	resolve({
	            		user: existingUser,
	            		token: module.createJWT(existingUser)
	            	})
	            }
	            else{
  					var nuser = new User();
            		nuser[socialmedia] = user[socialmedia];
            		nuser.name = user.name;
            		nuser.picture = user.picture;
            		if(user.email){
            			nuser.email = user.email;
            		}
            		nuser.save(function(err, user){
            			if(!err){
	            			resolve({
	            				user: user,
	            				token: module.createJWT(user)
	            			})
            			}
            			else{
            				resolve(err);
            			}
            		})
	            }
	        });
		})
	}

	return module;

}
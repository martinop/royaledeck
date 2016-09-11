module.exports = function(express, utils, request, qs, config){
	var facebook = express.Router()
	facebook.post('/facebook', function(req, res) {
	  var fields = ['id', 'email', 'name', 'picture.type(large)'];
	  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
	  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
	  var params = {
	    code: req.body.code,
	    client_id: req.body.clientId,
	    client_secret: config.FACEBOOK_SECRET,
	    redirect_uri: req.body.redirectUri
	  };
	  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
	    if (response.statusCode !== 200) {
	      return res.status(500).send({ message: accessToken.error.message });
	    }

	    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
	      if (response.statusCode !== 200) {
	        return res.status(500).send({ message: profile.error.message });
	      }
	        user = {
	          facebook: profile.id,
	          name: profile.name,
	          email: profile.email,
	          picture: profile.picture.data.url,
	        };
	        if (req.headers.authorization) {
	        	/*utils.haveHeader(req.headers.authorization, user, req.country).then(function (data){
	        		res.send(data)
	        	})*/
	        } else {
	        	utils.noHeader(user, "facebook").then(function (data){
	        		res.send(data);
	        	})
	        }
	    });
	  });
	});

	return facebook;
}

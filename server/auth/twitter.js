module.exports = function(express, utils, request, qs, config){
	var twitter = express.Router()
	twitter.post('/twitter', function (req, res) {
	    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
	    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
	    var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';
	 
	    if (!req.body.oauth_token || !req.body.oauth_verifier) {
	        var requestTokenOauth = {
	            consumer_key: config.TWITTER_WEB_KEY,
	            consumer_secret: config.TWITTER_WEB_SECRET,
	            callback: req.body.redirectUri
	        };

	        request.post({
	            url: requestTokenUrl,
	            oauth: requestTokenOauth
	        }, function (err, response, body) {
	            var oauthToken = qs.parse(body);

	            res.send(oauthToken);
	        });
	    } 
	    else {
	        var accessTokenOauth = {
	            consumer_key: config.TWITTER_WEB_KEY,
	            consumer_secret: config.TWITTER_WEB_SECRET,
	            token: req.body.oauth_token,
	            verifier: req.body.oauth_verifier
	        };

	        request.post({
	            url: accessTokenUrl,
	            oauth: accessTokenOauth
	        }, function (err, response, accessToken) {

	            accessToken = qs.parse(accessToken);

	            var profileOauth = {
	                consumer_key: config.TWITTER_WEB_KEY,
	                consumer_secret: config.TWITTER_WEB_SECRET,
	                oauth_token: accessToken.oauth_token
	            };
	            request.get({
	                url: profileUrl + accessToken.screen_name,
	                oauth: profileOauth,
	                json: true
	            }, function (err, response, profile) {

	            	var user = {};
	            	user.twitter = profile.id_str
	            	user.name = profile.name.split(".")[0]
	            	user.picture = profile.profile_image_url.replace("_normal", "")
			        if (req.headers.authorization) {
			        	/*utils.haveHeader(req.headers.authorization, user).then(function (data){
			        		res.send(data)
			        	})*/

	            		//This really could happen?
			        } 

			        else {
			        	utils.noHeader(user, "twitter").then(function (data){
			        		res.send(data);
			        	})
			        }
	            });
	        });
	    }
	});

	return twitter;
}

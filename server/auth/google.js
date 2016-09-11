module.exports = function(express, utils, request, config){
	var google = express.Router()
	google.post('/google', function(req, res) {
	    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
	    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
	    var params = {
	        code: req.body.code,
	        client_id: req.body.clientId,
	        client_secret: config.GOOGLE_SECRET,
	        redirect_uri: req.body.redirectUri,
	        grant_type: 'authorization_code'
	    };
	    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
	        var accessToken = token.access_token;
	        var headers = { Authorization: 'Bearer ' + accessToken };
	        request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
	            var user = {
	                google: profile.sub,
	                name: profile.name,
	                email: profile.email,
	                picture: profile.picture.replace('sz=50', 'sz=200')
	            };
	            if (profile.error) {
	                return res.status(500).send({message: profile.error.message});
	            }
		        if (!req.headers.authorization) {
		        	utils.noHeader(user, "google").then(function (data){
		        		res.send(data);
		        	})
		        }
	        });
	    });
	});

	return google;

}

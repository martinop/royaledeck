module.exports = function(express, utils, User, Deck){
	var profile = express.Router()
	profile.get('/profile', utils.ensureAuthenticated, function(req, res) {
    	User.findOne({_id: req.user.id}, function(err, existingUser) {
            if (existingUser) {
                Deck.find({author: existingUser._id}).select("id author elixir arena type description name likes")
                .exec(function(err, decks){
                    res.send({
                        user: existingUser,
                        token: utils.createJWT(existingUser),
                        decks: decks
                    })
                })
             }
            else{
            	res.send({data: "error"})
            }
        });
	});

    profile.post('/profile', utils.ensureAuthenticated, function(req, res) {
        User.findOne({_id: req.user.id}, function(err, existingUser) {
            if (existingUser) {
                existingUser.username = req.body.username
                existingUser.country = req.body.country
                existingUser.city = req.body.city
                existingUser.email = req.body.email
                existingUser.name = req.body.name
                existingUser.username_twitter = req.body.username_twitter
                existingUser.username_facebook = req.body.username_facebook
                existingUser.username_instagram = req.body.username_instagram
                existingUser.cover = req.body.cover
                existingUser.picture = req.body.picture
                existingUser.save(function(err, user){
                    if(!err){
                        res.send({data: "Tu perfi ha sido actualizado con exito"})
                    }
                    else{
                        res.send({data:"Hubo un error actualizando perfil, intenta mas tarde"});
                    }
                })
                      
            }
            else{
                res.send({data: "error"})
            }
        });
    });
	return profile
}
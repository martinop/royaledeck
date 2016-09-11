module.exports = function(express, utils, Card, Deck, User){
			//populate("cards", "name movement type arena image elixir")
	var cards = express.Router()
	cards.get('/cards', function (req, res) {
		Card.find({}, function(err, data){
			res.send(data);
		})
	});
	cards.post('/deck', function (req, res){
	   if(req.headers.authorization){
			var token = req.headers.authorization.split(' ')[1];
			var payload = utils.decode(token);
			if(payload.id){
				var deck = new Deck();
				deck.name = req.body.name;
				deck.description = req.body.description;
				deck.type = req.body.type;
				deck.arena = req.body.arena;
				deck.elixir = req.body.elixir.toFixed(1)
				deck.cards = req.body.cards;
				deck.author = payload.id;
				deck.disable = req.body.disable;
				deck.save(function(err){
					if(!err){
						res.send({data: "save"})
					}
					else{
						res.send({data:"error"});
					}
				})
			}
			else{
				res.send({data: "error"})
			}
		}
		else{
			res.send({data: "error"})
		}
	})

	cards.get('/decks', function (req, res){
		var init = req.query.start
		var query = {disable: false}

		if(req.query.id)
			query.id = req.query.id

		else{
			if(req.query.search){
				var name = decodeURIComponent(req.query.search).replace(/ /g, ".+")
				query.name = new RegExp(name, "ig")
			}

			if(req.query.type)
				query.type = req.query.type;
			
			if(req.query.arena)
				query.arena = req.query.arena
		}

		
		Deck.find(query).sort('-create_at').select("id author elixir arena type description name likes").populate("author", "name id").skip(init).limit(10).exec(function(err, docs){
			if(!err){
				res.send(docs)	
			}
			else{
				res.send(err);
			}
		})
	})
	cards.get('/decks/:username', function (req, res){
		var user = req.params.username
		User.findOne({username: user}, function(err, existingUser) {
			if (existingUser) {
				Deck.find({author: existingUser._id, disable: false}).sort('-create_at').select("id author elixir arena type description name likes")
				.populate("author", "name id").exec(function(err, docs){
					if(!err){
						res.send(docs)	
					}
					else{
						res.send({error: err});
					}
				})

			}
			else{
				res.send({error: "No existe"})
			}
		});
	})
	cards.get('/deck/:username/:index', function (req, res){
		var user = req.params.username
		var index = req.params.index;
		User.findOne({username: user}, function(err, existingUser) {
			if (existingUser) {
				Deck.findOne({author: existingUser._id, disable: false, index: index}).sort('-create_at').select("cards likers id author elixir arena type description name likes")
				.populate("author", "name id").populate("cards").exec(function(err, doc){
					if(!err){
						console.log(doc)
						res.send(doc)	
					}
					else{
						res.send({error: err});
					}
				})

			}
			else{
				res.send({error: "No existe"})
			}
		});

	})
	return cards
}
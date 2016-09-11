var express 	=		require("express"),
app 		    =     	express(),
bodyParser 		= 	  	require("body-parser"),
request 		= 		require("request"),
qs              =       require("qs"),  
mongoose        =     require("mongoose"),
User            =     require("./server/models/User"),
Card            =     require("./server/models/Card"),
Deck            =     require("./server/models/Deck"),
config          =       require("./server/config"),
utils           =       require('./server/utils')(config, request, User);

var authTwitter = require('./server/auth/twitter')(express, utils, request, qs, config)
var authFacebook = require('./server/auth/facebook')(express, utils, request, qs, config)
var authGoogle = require('./server/auth/google')(express, utils, request, config)
var profile = require('./server/auth/profile')(express, utils, User, Deck)
var cards = require('./server/cards')(express, utils, Card, Deck, User);

app.listen(12345);
console.log("ONLINE");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get("/random", function (req, res){
	var fullUrl = req.protocol + '://' + req.get('host') + "/#/random";
	res.redirect(fullUrl)
})
app.use("/api", cards);
app.use('/api/auth', authTwitter, authFacebook, authGoogle, profile);

mongoose.connect('mongodb://martinop:26471049m@ds019946.mlab.com:19946/royaldeck');
mongoose.connection.on('error', function(err) {
  console.log(err);
});
 
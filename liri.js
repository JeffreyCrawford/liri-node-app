require("dotenv").config();
var request = require("request");

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
 

var params = {screen_name: 'nodejs'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

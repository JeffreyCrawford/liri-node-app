require("dotenv").config();
var keys = require("./keys.js");

/* TWITTER */
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var myTweets = function() {
  
  var params = {
  screen_name: "JCBootCamp",
  count: 20
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        console.log("-------------------------------------------------------------------------------");
        console.log("");
      }
    }
  });

}

/* SPOTIFY */
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

/* OMDB */
var request = require("request");


input = process.argv[2];

switch (input) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    console.log("spotify-this-song")
    break;
  case "movie-this":
    console.log("movie-this")
    break;
  case "do-what-it-says":
    console.log("do-what-it-says")
    break;
}





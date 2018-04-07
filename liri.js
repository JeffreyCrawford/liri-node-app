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

  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        console.log("-------------------------------------------------------------------------------");
        console.log("");
      }
    }
    else {
      console.log("Error occurred: " + error);
    }
  });

}

/* SPOTIFY */
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var spotifyThisSong = function() {
  
  spotify.search({ 
    type: "track", 
    limit: 1,
    query: process.argv[3]
  }, function(error, response) {
    if (!error) {
      console.log(response.tracks); 
    }
    else {
      console.log("Error occurred: " + error);
    }
  
  });
      
}



/* OMDB */
var request = require("request");
var movieThis = function() {
  var query = process.argv[3];
  var url = "http://www.omdbapi.com/?apikey=trilogy" + "&t=" + query; 

  request(url, function(error, response, body) {
    if (!error) {
      console.log(JSON.parse(body).Title)
    }
    else {
      console.log("Error occurred: " + error);
    }
  })
}


command = process.argv[2];


switch (command) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    console.log("do-what-it-says")
    break;
}





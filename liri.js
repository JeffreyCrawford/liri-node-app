require("dotenv").config();
var keys = require("./keys.js");


/* TWITTER VARIABLES */
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
        console.log("-------------------------------------------------------------------------------");
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

/* SPOTIFY VARIABLES */
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var spotifyThisSong = function(query) {
  
  spotify.search({ 
    type: "track", 
    limit: 1,
    query: query,
  }, function(error, response) {
    if (!error) {
      var song = response.tracks.items[0]
      console.log("-------------------------------------------------------------------------------");
      console.log("Artist: " + song.artists[0].name)
      console.log("Title: " + song.name); 
      console.log("Album: " + song.album.name)
      console.log("Preview Song: " + song.preview_url);
      console.log("-------------------------------------------------------------------------------");
      console.log("");
    }
    else {
      console.log("Error occurred: " + error);
    }
  }); 
}


/* OMDB VARIABLES */
var request = require("request");

var movieThis = function(query) {
  var url = "http://www.omdbapi.com/?apikey=trilogy" + "&t=" + query; 

  request(url, function(error, response, body) {
    if (!error) {
      var movie = JSON.parse(body)
      console.log("-------------------------------------------------------------------------------");
      console.log("Title: " + movie.Title);
      console.log("Year: " + movie.Year);
      console.log("IMDB Rating: " + movie.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
      console.log("Country: " + movie.Country);
      console.log("Language: " + movie.Language);
      console.log("Actors: " + movie.Actors);
      console.log("Plot: " + movie.Plot);
      console.log("-------------------------------------------------------------------------------");
      console.log("");

    }
    else {
      console.log("Error occurred: " + error);
    }
  })
}


/* DO WHAT IT SAYS VARIABLES */
var fs = require("fs");

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (!error) {
      var output = data.split(",");
      execute(output[0], output[1]);
    }
    else {
      console.log("Error occurred: " + error);
    }
  })
}


/* EXECUTE VARIABLES */
var command = process.argv[2];
var query = process.argv[3]

var execute = function(command, query) {
  switch (command) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      spotifyThisSong(query);
      break;
    case "movie-this":
      movieThis(query);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
  }
}


/* RUN EXECUTE WITH PARAMETERS */
execute(command, query);




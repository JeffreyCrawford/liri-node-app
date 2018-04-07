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

  /* RETRIEVE 20 TWEETS FROM JCBOOTCAMP */
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
  
  /* RETRIEVE SONG INFO FROM SPOTIFY API */
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

  /* RETRIEVE MOVIE INFO FROM OMDB API */
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
  /* READ RANDOM.TXT AND RUN EXECUTE WITH THOSE PARAMETERS */
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


/* DEFINE DEFAULT EXECUTE PARAMETERS */
var command = process.argv[2];
var query = process.argv[3]

/* CHOOSES FUNCTION BASED ON USER INPUT */
var execute = function(command, query) {
  switch (command) {

    /* RETRIEVES TWEETS */
    case "my-tweets":
      myTweets();
      break;

    /* RETRIEVES SONG INFO */
    case "spotify-this-song":
      /* IF NO QUERY TERM, RETURN THE SIGN BY ACE OF BASE */
      if (!query) {
        var query = "The Sign Ace of Base";
      }
      spotifyThisSong(query);
      break;

    /* RETRIEVES MOVIE INFO */
    case "movie-this":
      /* IF NO QUERY ITEM, RETUN MR. NOBODY */
      if (!query) {
        var query = "Mr. Nobody";
      }
        movieThis(query);
      break;

    /* RETRIVES COMMAND FROM RANDOM.TXT */
    case "do-what-it-says":
      doWhatItSays();
      break;
  }
}


/* RUN EXECUTE WITH PARAMETERS */
execute(command, query);




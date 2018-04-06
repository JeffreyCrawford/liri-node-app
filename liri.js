require("dotenv").config();
var request = require("request");
var twitter = require("twitter");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

input = process.argv[2]

twitter.get(input, function (err, results) {
    if (err) {
       console.log(err)
    }

   
    console.log(JSON.stringify(results, null, 2))


})

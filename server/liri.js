// dotenv 
require('dotenv').config();
// keys
var keys = require('./keys'); 
// define variables for required packages
var fs = require('fs');
var axios = require('axios');
var time = require('moment'); 
var Spotify = require('node-spotify-api');
    var sptfy = new Spotify(keys.spotify);
//var omdb = require('omdb');
//------------------------//
// define var to grab all cmdLine args
var liriCMD = process.argv[2];
var searchCMD = process.argv.splice(3).join(" ");
// switch statement to execute the app in command line

function liriGO(liriCMD, searchCMD) {
    switch (liriCMD) {
        case "spotify-this-song":
            spotME(searchCMD);
            break;
        case "concert-this":
            getVenues(searchCMD);
            break;
        
        case "movie-this":
            getFlix(searchCMD);
            break;
        case "do-what-it-says":
            getRandom();
            break;
            // 
        default: 
            console.log("Please enter one of the following commands:\nconcert-this\nspotify-this-song\nmove-this\ndo-what-it-says");            
    }
};

// SPOTIFY-THIS-SONG
function spotME(trkName) {
    // export point for keys to spotify **
    if (!trkName) {
        trkName = "The Sign";
    }
    sptfy.search({ type: 'track', query: trkName}, function (err, data) {
        if (err) {
            return console.log("Error: "+err);
        }
        var look = data.tracks.items[0];
        var artsNme = look.album.artist[0].name;
        var song = look.name;
        var trkPreView = look.href;
        var trkBalbum = look.album.name
        //------\cLog/----------//
        console.log("Artist(s) Name: "+artsNme+"\n");
        console.log("Song Name: "+song+"\n");
        console.log("Song Preview: "+trkPreView+"\n");
        console.log("Album: "+trkBalbum+"\n");
        // append text to log.txt
        // THIS has to be modified to work right ******* !!!!
        var logSptfy = "========Begin Spotify Log=========" +
        "\nArtist: "+artsNme+"\nTrack: "+song+"\nPreview-Link: "+trkPreView+"\nAlbum: "+trkBalbum+"\n====================";
        // file system--APPEND_FILE
        fs.appendFile("log.txt", logSptfy, function(err) {
            if (err) throw err;
        })
        resultsEnd(data);
    });
}
// bandsintown function
function getVenues(artist) {
    var artist = searchCMD;
    var queryURL = "https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function(responseBOTR) {
            console.log("------------------");
                var axBack = responseBOTR.data[0];
                var vName = axBack.venue.name;
                var vLoc = axBack.venue.city;
                var eventDate = time(axBack.datetime).format("MM-DD-YYYY");
            // venueName    
            console.log("Venue Name: "+vName+"\r\n");
            // venueLocation
            console.log("Venue Location: "+vLoc+"\r\n");
            // date of event @ venue
            console.log("Scheduled for: "+eventDate+"\r\n");

            //log.txt variable
            var venLog = "=======BandsInTown-Log======"+"\nArtist Name: "+artist+"\nVenue Name: "+vName+"\nVenue Location: "+vLoc+"\r\n";
            // fs appendFile
            fs.appendFile("log.txt", venLog, function(err) {
                if (err) throw err;
            })
            resultsEnd(responseBOTR);
        }
    )
};
// OMDB
function getFlix(flic) {
    if (!flic) {
       var flic = "Mr. Nobody";
    }
    var omdbURL = "http://www.ombdapi.com/?t="+flic+"&y=&plot=short&apikey=trilogy";
    console.log(omdbURL);
    axios.request(omdbURL).then(
        function(omdbAxBk) {
            console.log("------------------------");
                var flicIsh = omdbAxBk.data;
            console.log("Movie Title: "+flicIsh.Title+"\r\n");
            console.log("Year Filmed: "+flicIsh.Year+"\r\n");
            console.log("IMdB Rating: "+flicIsh.imdbRating+"\r\n");
            console.log("Rotten Tomatoes: "+flicIsh.Ratings[1].Value+"\r\n");
            console.log("Country of Origin: "+flicIsh.Country+"\r\n");
            console.log("Language: "+flicIsh.Language+"\r\n");
            console.log("Movie Plot: "+flicIsh.Plot+"\r\n");
            console.log("Cast: "+flicIsh.Actors+"\r\n")
            //reseultsEnd(omdbAxBk)
            resultsEnd(omdbAxBk);
            // log.txt
            var omdbLog = "=====OMDB-INFO-LOG====="+"\nMovie: "+flicIsh.Title+"\nYear: "+flicIsh.Year+"\nIMdB: "+flicIsh.imdbRating+"\nPlot: "+flicIsh.Plot;
            // fs appendFile
            fs.appendFile("log.txt", omdbLog, function(err) {
                if (err) throw err;
            })
        }
    )
};
// utilize commands in 'random.txt'
// function getRandom() >>> exe
function getRandom() {
    fs.readFile("random.txt","utf8", function(err,metaData) {
        if (err) {
            return console.log(err);
        } else {
            console.log(metaData);
            var randomCmdData = metaData.split(",");
            liriGO(randomCmdData[0], randomCmdData[1]);
        }
    })
};
// log results from other functions
function resultsEnd(data) {
    fs.appendFile("log.txt", data, function(err) {
        if (err) throw err;
    })
};
liriGO(liriCMD, searchCMD);
   

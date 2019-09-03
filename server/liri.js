//Importing all necessarry packages and files
require("dotenv").config();
var keys = require("./keys.js");
require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var inquire = require('inquirer');
var args = process.argv; 
//the action that will be performed
var action = args[2];
//the term to use for the action 
var term = args.splice(3).join("%20");
//the liiRun function is called near the bottom. The act parameter will be used to determine which command to perform, while the query will be 
//used as a paramater for that action
var liriRun = function(act, query){
    switch (act){
        case "concert-this": 
            console.log("calling concert-this for " + query.replace(/%20/g, " "));
            var URL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
            console.log(URL);
            //axios call to bands in town api with the user's CL query
            axios.get(URL).then(
                function(response){
                    fs.appendFile("log.txt", ("concert-this\n"), function(err){
                        if (err){
                            throw err;
                        }
                    });
                    //for each concert object
                    response.data.forEach(function(concert){
                        //from moment docs to convert date format
                        var date = moment(concert.datetime, moment.ISO_8601).format("MM/DD/YYYY");

                        var concertInfo = "Venue: " + concert.venue.name + " Location: " + concert.venue.city + ", " + concert.venue.region +
                        " Date: " + date;

                        console.log(concertInfo);
                        console.log("-------------------------");
                        
                        fs.appendFile("log.txt", (concertInfo + "\n------\n"), function(err){
                            if (err){
                                throw err;
                            }
                        });
                    })
                    fs.appendFile("log.txt", ("----------------------\n"), function(err){
                        if (err){
                            throw err;
                        }
                        console.log("Concert search added to log.txt!");
                    });
            });
            break;
        case "spotify-this-song":
            //default query if the user did not provide one
            if(query === ""){
                query = "The%20Sign";
            }

            console.log("searching spotify for " + query.replace(/%20/g, " "));
            //searching the spotify databased with the provided query
            spotify.search({ type: 'track', query: query }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
                var songInfo =
                    "Artist(s): " + data.tracks.items[0].artists[0].name +
                    "\nTitle: " + data.tracks.items[0].name +
                    "\nLink: " + data.tracks.items[0].preview_url + 
                    "\nAlbum: " + data.tracks.items[0].album.name;

                console.log(songInfo);

                fs.appendFile("log.txt", ("spotify-this-song\n" + songInfo + "\n----------------------\n"), function(err){
                    if (err){
                        throw err;
                    }
                    console.log("Song search added to log.txt!");
                });
            });
            break;
        case "movie-this":
            //default query if the user doesn't provide one
            if(query === ""){
                query = "Mr.%20Nobody";
            } 

            console.log("movie-this searching for " + query.replace(/%20/g, " "));

            var URL = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`;
            //calling the OMDB api with the provided query 
            axios.get(URL).then(
                function(response) {
                    var movieInfo = 
                        "Title: " + response.data.Title + 
                        "\nReleased: " + response.data.Released + 
                        "\nIMDB Rating: " + response.data.imdbRating + 
                        "\nRotten Tomatoes: " + response.data.Ratings[1].Value +
                        "\nCountry: " + response.data.Country +
                        "\nLanguage: " + response.data.Language + 
                        "\nPlot: " + response.data.Plot + 
                        "\nActors: " + response.data.Actors;

                    console.log(movieInfo)

                    fs.appendFile("log.txt", ("movie-this\n" +movieInfo + "\n----------------------\n"), function(err){
                        if (err){
                            throw err;
                        }
                        console.log("Movie search added to log.txt!");
                    });
                }
                
            );
            break;
            
        case "do-what-it-says":
                //reads in the text from random.txt and calls liriRun() with the arguments it provides
                fs.readFile("random.txt", 'utf8', function(err, data){
                    console.log(data);
                    if (err){
                        console.log(err);
                        return;
                    } 
                    //The string is split into and array of two items at the comma
                    var actionTerm = data.split(",")
                    //the first argument for the command to be executed
                    var action = actionTerm[0];
                    //the second argument for the term to execute the command with
                    var term = actionTerm[1];
                    
                    liriRun(action, term);
                  
                });
                ;
            break;
            
        default: 
            console.log("Invalid action argument!");
    }

}


// inquirer ADDIN
// \put this INSIDE(inquirer)/
/*
inquire.prompt([{
    type: 'input',
    name: 'name',
    message: "Welcome to LIRI\nWhat's your name?"
}, 
{
    type: 'list',
    name: "doWhatYouChoose",
    message: "What do you want to do?",
    choices: ["spotify-this-song", "movie-this", "concert-this"]
}
]).then(function(user) {
    console.log('Hello '+user.name+' thanks for stopping by!');
    switch (user) {
        case user.doWhatYouChoose === "spotify-this-song":
            action = 'spotify-this-song';
            inquire.prompt([{
                type: 'input',
                name: 'songChoice',
                message: "What song do you want to spotify?"
            }
          ]).then(function(lemmieGetTheAux) {
              console.log(lemmieGetTheAux);
              term = lemmieGetTheAux;
              // liri
              liriRun(action, term);
          })
    }
})
*/
/* tried putting inquirer in but theres too much overlap,
 and I don't want to waste more time making this over involved 
 but I still must work on this to see how intricite i can make this app be! */
//==========================================================================

liriRun(action, term);

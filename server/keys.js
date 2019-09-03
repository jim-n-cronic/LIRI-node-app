require('dotenv/config');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    //id: "2d1be210b07b4fbba9a7d2659834aa3f",
    secret: process.env.SPOTIFY_SECRET
    //secret: "c45445784fb940b5b5fa529d38d4003c"
};
console.log("KEYS ARE LOADED, LET'S OPEN THE DOOR!");

/*
console.log(exports.spotify.process.env.SPOTIFY_ID);
console.log(exports.spotify.SPOTIFY_SECRET);
*/



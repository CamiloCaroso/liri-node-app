const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');

var spotify = new Spotify({
        id: "2df33f093956494b89a54953a22af2c4",
        secret: "907c1ed4166c437bb5e98138c216158a"
});

let pr = process.argv[2]
let value = process.argv[3]
value = value.replace(/-/g, '+');

if(pr === "movie-this" && value){
        runMovie(value)
} else if (pr === "spotify-this-song" && value){
        runSpotify(value)
        
} else if(pr === "concert-this" && value){
        runEvent(value)
} else {
        console.log("wrong parameter")
}



function runMovie(movie){
        axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=91ad2636`)
        .then(function(response){
                console.log("-----------------------------------------------")
                console.log(`Title: ${response.data.Title}`)
                console.log(`Year: ${response.data.Year}`)
                console.log(`Rated: ${response.data.Rated}`)
                console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`)
                console.log(`Country: ${response.data.Country}`)
                console.log(`Language: ${response.data.Language}`)
                console.log(`Actors: ${response.data.Actors}`)
                console.log(`Plot: ${response.data.Plot}`)
                console.log("-----------------------------------------------")
        })
}

function runSpotify(song){
        spotify.search({ type: 'track', query: song }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                console.log("-----------------------------------------------") 
                console.log(`Artist: ${data.tracks.items[0].artists[0].name}`)
                console.log(`Song: ${data.tracks.items[0].name}`)
                console.log(`Album: ${data.tracks.items[0].album.name}`)
              console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`); 
              console.log("-----------------------------------------------")
        });
}

function runEvent(artist){
        axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
        .then(function(response){
                console.log("-----------------------------------------------")
                console.log(`Artist: ${response.data[0].artist.name}`)
                console.log(`Venue Name: ${response.data[0].venue.name}`)
                console.log(`Country: ${response.data[0].venue.country}`)
                console.log(`City: ${response.data[0].venue.city}`)
                let date = response.data[0].datetime
                let time = date.substr(11, 19)
                date = date.substr(0, 10)
                date = date.replace(/-/g, '/');
                date = moment().format("MM/DD/YYYY")
                console.log(`Date: ${date} ${time}`)
                console.log("-----------------------------------------------")
        })
}





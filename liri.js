require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter")
var keys = require("./keys.js")
var fs = require("fs");
var request = require("request");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var arg = process.argv; 
var client = new Twitter(keys.twitterKeys)

var tweetThis = function(twitter) {
var params = {screen_name: 'MollyGi57815004'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for(var i =0; i < tweets.length; i++) {
        console.log("Tweet: " + tweets[i].text);
        console.log("Date: " + tweets[i].created_at)
        console.log(' ')

        var info = "my-tweet " + "\r\n" + "Tweet:"  + tweets[i].text + "\r\n" + "Date: " + tweets[i].created_at + "\r\n" + "--------------------------------------------" + "\r\n"
        appendthis(info);
      }
  }
});
}

var getArtistNames = function(artist) {
    return artist.name;
}

var spotifythis = function(songName) {
    spotify.search({ type: 'track', query: songName}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for (var i=0; i < songs.length; i++) {
            console.log(i + 1);
            console.log('Artist(s): ' + songs[i].artists.map(getArtistNames))
            console.log('Song Name: ' + songs[i].name)
            
            if (songs[i].preivew_url == null) {
                console.log("No Link Availible")
            } else {
                console.log("Link: " + songs[i].preivew_url)
            }
        
            console.log("Album: " + songs[i].album.name)
            console.log("__________________________________________")

            var info = "spotify-this " + songName + "\r\n" + "Title: "+songs[i].name + "\r\n" + "Artist: "+songs[i].artists.map(getArtistNames) + "\r\n" + songs[i].album.name + "\r\n" + "--------------------------------------------" + "\r\n"
            appendthis(info);
        }
    })
}

var moviethis = function(movie) {
    var url = "https://www.omdbapi.com/?t="+movie+"&plot=short&apikey=trilogy";
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            
            var results = JSON.parse(body);
    
            console.log("Title: "+results.Title);
            console.log("Year: "+results.Year);
            console.log("IMDB Rating: "+results.imdbRating);
            console.log("Country: "+results.Country);
            console.log("Language: "+results.Language);
            console.log("Plot: "+results.Plot);
            console.log("Actors: "+results.Actors);

            var info = "movie-this " + movie + "\r\n" + "Title: "+results.Title + "\r\n" + "Year: "+results.Year +"\r\n" 
            + "IMDB Rating: "+results.imdbRating + "\r\n" + "Country: "+results.Country + "\r\n" + "Language: "+results.Language + "\r\n" + "Plot: "+results.Plot + "\r\n" + "Actors: "+results.Actors + "\r\n" + "--------------------------------------------" + "\r\n"
            appendthis(info);
        }
    })
}

///API CALL AND KEY NO LONGER FUNCTIONAL./////////////////////////////////////////

// var concertthis = function(artist) {
//     var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//     request(url, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
           
//             var results = JSON.parse(body);
//             // var info = "concert-this " + artist + "\r\n";
            
//             for (var i =0; i < results.length; i++) {
//                 console.log(results[i].venue.name);
//                 console.log(results[i].venue.city);
//                 var time = moment(results[i].datetime).format("MM/DD/YYYY");
//                 console.log(time)
//                 console.log("---------------")

//                 // info += "---------------\r\n" + results[i].venue.name + "\r\n" + results[i].venue.city + "\r\n" + results[i].datetime + "\r\n"
//             }
//             // info += "\r\n" + "-------------------------------" + "\r\n"
//             // appendthis(info)
//         }
//     })
// }


var doWhatItSays = function() {
    fs.readFile('random.txt' , 'utf8', function(error, data){
        console.log(data)

        var dataArr = data.split(',')

        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr === 1) {
            pick(dataArr[0])

        }
    })
}

var appendthis = function(file) {
    fs.appendFile("log.txt", file, function(err){
        if (err) {
            return console.log("there was an error")
        }
    })
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            tweetThis();
            break;
        case 'spotify-this-song' :
            spotifythis(functionData);
            break;
        case 'movie-this' :
            moviethis(functionData);
            break;
        // case 'concert-this' :
        //     concertthis(functionData)
        //     break;
        case 'do-what-it-says' :
            doWhatItSays();
            break;
        default: 
        console.log("LIRI Doesn't Know that! Please type: my-tweet, movie-this AND a movie name, spotify-this AND a song name, concert-this AND an artist name, or do-what-it-says" )
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo)
}

runThis(process.argv[2], process.argv[3]);

//////////////////REPLACED IF STATEMENTS////////////////////
// if (input == "concert-this") {
//     var info = arg.slice(3, arg.length)
//     var artist = ""
//     for (var i in info){
//         if (i == info.length-1) {
//             artist = artist + info[i]
//         } else{
//             artist += info[i] + "%20"
//         }
        
//     }
//     artistthis(artist);

// } 
// else if (input == "spotify-this-song") {
//     if (typeof(process.argv[3]) == "undefined") {
//         var song = "The Sign"
//     } else {
//         var stuff = arg.slice(3, arg.length)
//         var song = ""
//         for (var i in stuff){
//             if (i == stuff.length-1) {
//                 song = song + stuff[i]
//             } else{
//                 song += stuff[i] + " "
//             }
//         }   
//     }
//     spotifythis(song);

// } 
// else if (input == "movie-this") {
//     if (typeof(process.argv[3]) == "undefined") {
//         var movie = "Moana"
//     } else {
//         var info = arg.slice(3, arg.length)
//         var movie = ""
//         for (var i in info){
//             if (i == info.length-1) {
//                 movie = movie + info[i]
//             } else{
//                 movie += info[i] + " "
//             }
//         }   
//     }
//     moviethis(movie);

// } 
// else if (input == "my-tweet") {
//     tweetThis()

// } 

// if (input=="do-what-it-says"){
//     fs.readFile('random.txt' , 'utf8', function(error, data){
//         if (error) throw error
//         console.log(data)
//     })
// }


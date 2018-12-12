// Initialize Firebase
var config = {
    apiKey: "AIzaSyBgSsPWXNag-QHEfyFUD448bfD_wvX7jag",
    authDomain: "alarm-7560f.firebaseapp.com",
    databaseURL: "https://alarm-7560f.firebaseio.com",
    projectId: "alarm-7560f",
    storageBucket: "",
    messagingSenderId: "197126652447"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();


var clockApp = {
    dropDownSet: function () {
        for (var i = 0; i < 24; i++) {
            $("#hoursInput").append("<option>" + i + "</option>" );
        }

        for (var i = 0; i < 60; i++) {
            if (i < 10) {
                $("#minutesInput").append("<option>0" + i + "</option>");
            }
            else {
                $("#minutesInput").append("<option>" + i + "</option>");
            }
        }
    },

    clockSet: function (e) {
        e.preventDefault();
        var hours = $("#hoursInput").val();
        var minutes = $("#minutesInput").val();
        var clock = hours + ":" + minutes;
        var artist = $("#soch").val();
        var artistName = "";
        var previewUrl = "";
        console.log(artist);

        function generateSpotifyAccessToken() { //cb is callback? (yes -Chris)  What else could it be?
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token',
                method: "POST",
                data: {
                    grant_type: "client_credentials"
                },
                headers: {
                    Authorization: "Basic " + btoa("21dad2969f2947419ba9fa2cac7560d8" + ":" + "5d62cecbdad943d9b8c5047a6c9e8aac")
                }
            }).then(res => {
                spotify_access_token = res.access_token;
                console.log(res);
                getArtist(artist);
            }).catch(err => console.error(err));
        };

        //         //
        // Spotify //
        //         //
        function getArtist(artist) {
            $.ajax({
                method: 'GET',
                url: 'https://api.spotify.com/v1/search',
                data: {
                    q: artist,
                    type: 'track'
                },
                headers: {
                    Authorization: "Bearer " + spotify_access_token
                }
            }).then(
                function (res) {
                    console.log(res);
                    for (var i = 0; i < res.tracks.items.length; i++) {
                        // console.log(res.tracks.items[i].preview_url);
                        var temporaryArtistName = res.tracks.items[i].artists[0].name;
                        // console.log("TEMP ARTIST NAME:", temporaryArtistName);
                        if (!res.tracks.items[i].preview_url) {
                            console.log(temporaryArtistName + ": UNAVAILABLE");
                        } else {
                            console.log(temporaryArtistName);
                            $("#song-info").html("<p>" + temporaryArtistName + "</p>");
                        };
                    }
                    // for (i=0; i<res.tracks.items.length; i++) {
                    //     console.log(res.tracks.items[i].preview_url);
                    //     if (res.tracks.items[i].preview_url == null) {
                    //         console.log(res.tracks.items[i].artists[0].name + ": UNAVAILABLE");
                    //     } else {console.log(res.tracks.items[i].artists[0].name)};
                    // }
                    temporaryArtistName = res.tracks.items[0].artists[0].name;
                    previewUrl = res.tracks.items[1].preview_url;
                    console.log(previewUrl);
                    var audioElement = document.createElement("audio");
                    audioElement.setAttribute("src", previewUrl);
                    audioElement.play();
                    var snoozing;
                    $(document).on("click", "#snooze-button", function () {
                        event.preventDefault();
                        // alert("Snoozed for 1 minute!");
                        audioElement.pause();
                        snoozing = setInterval(function () {
                            audioElement.play();
                        }, 60000);
                    });
                    $(document).on("click", "#stop-button", function () {
                        event.preventDefault();
                        audioElement.pause();
                       
                    });
                }

            ).catch(() => generateSpotifyAccessToken(() => getArtist(artist)));
        }

        var alarm = setInterval(function () {
            if (moment().format("H:mm") == clock) {
                console.log("wake up idiot");
                generateSpotifyAccessToken(artist);
                clearInterval(alarm);
            }
        }, 1000);
    },

    allCoordinates: [
        {station: "LINDBERGH STATION", statLong: -84.367447, statLat: 33.821995}, //Lindbergh
        {station: "LENOX STATION", statLong: -84.35631, statLat: 33.847144}, //Lenox
        {station: "OMNI DOME STATION", statLong: -84.397759, statLat: 33.756293}, //Omni Dome
        {station: "FIVE POINTS STATION", statLong: -84.391571, statLat: 33.753826}, //Five Points
        {station: "EDGEWOOD CANDLER PARK STATION", statLong: -84.339579, statLat: 33.762001}, //Edgewood/Candler
        {station: "BROOKHAVEN STATION", statLong: -84.340003, statLat: 33.860705}, //Brookhaven
        {station: "PEACHTREE CENTER STATION", statLong: -84.387548, statLat: 33.759677}, //Peachtree Center
        {station: "GEORGIA STATE STATION", statLong: -84.386464, statLat: 33.750539}, //Georgia State
        {station: "ARTS CENTER STATION", statLong: -84.387789, statLat: 33.789705}, //Arts Center
        {station: "BUCKHEAD STATION", statLong: -84.367018, statLat: 33.84841}, //Buckhead 
        {station: "INMAN PARK STATION", statLong: -84.352797, statLat: 33.757497}, //Inman Park
        {station: "CIVIC CENTER STATION", statLong: -84.387209, statLat: 33.766305}, //Civic Center
        {station: "MIDTOWN STATION", statLong: -84.386345, statLat: 33.781121}, //Midtown
        {station: "KING MEMORIAL STATION", statLong: -84.37544, statLat: 33.749959}, //King Memorial
        {station: "NORTH AVE STATION", statLong: -84.386699, statLat: 33.771712}, //North Avenue
        {station: "CHAMBLEE STATION", statLong: -84.306957, statLat: 33.886191}, //Chamblee
        {station: "DORAVILLE STATION", statLong: -84.280389, statLat: 33.902079}, //Doraville
        {station: "MEDICAL CENTER STATION", statLong: -84.352684, statLat: 33.910689}, //Medical Center
        {station: "DUNWOODY STATION", statLong: -84.3444, statLat: 33.9212}, //Dunwoody
        {station: "EAST LAKE STATION", statLong: -84.312665, statLat: 33.765166}, //East Lake
        {station: "VINE CITY STATION", statLong: -84.40391, statLat: 33.75687}, //Vine City
        {station: "GARNETT STATION", statLong: -84.396415, statLat: 33.747845}, //Garnett
        {station: "SANDY SPRINGS STATION", statLong: -84.352019, statLat: 33.933035}, //Sandy Springs
        {station: "ASHBY STATION", statLong: -84.417556, statLat: 33.756346}, //Ashby
        {station: "DECATUR STATION", statLong: -84.295588, statLat: 33.774717}, //Decatur
        {station: "WEST END STATION", statLong: -84.41296, statLat: 33.73581}, // West End
        {station: "NORTH SPRINGS STATION", statLong: -84.356206, statLat: 33.944552}, //North Springs
        {station: "WEST LAKE STATION", statLong: -84.44658, statLat: 33.75314}, //West Lake
        {station: "AVONDALE STATION", statLong: -84.281903, statLat: 33.775277}, //Avondale
        {station: "OAKLAND CITY STATION", statLong: -84.4252, statLat: 33.716848}, //Oakland
        {station: "HAMILTON E HOLMES STATION", statLong: -84.46794, statLat: 33.754638}, //HE Holmes
        {station: "LAKEWOOD STATION", statLong: -84.428859, statLat: 33.700457}, //Lakewood
        {station: "KENSINGTON STATION", statLong: -84.251937, statLat: 33.772664}, //Kensington
        {station: "EAST POINT STATION", statLong: -84.440344, statLat: 33.677814}, //East Point
        {station: "INDIAN CREEK STATION", statLong: -84.229656, statLat: 33.769794}, //Indian Creek
        {station: "COLLEGE PARK STATION", statLong: -84.448793, statLat: 33.651673}, //College Park
        {station: "AIRPORT STATION", statLong: -84.446341, statLat: 33.640758},
        {station: "BANKHEAD STATION", statLong: -84.42884, statLat: 33.77189} //Airport
     ] //Airport

    ,

    marta: function (currLong, currLat, destLong, destLat) {
        
        var stationsRunning = [];
        var uniqStatRun = [];
        
        var queryURL = "https://cors-anywhere.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apiKey=f0748228-fd30-475b-828c-e03e6dd4aad5";

        //ajax call for api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            // get a list of ALL stations currently running
            for (i= 0; i <response.length; i++) {
                stationsRunning[i] = response[i].STATION;
            };

            console.log(response);

            //find the unique set of stations running currently so we can get the longitude and latitude from our pre defined list

            uniqStatRun = _.uniq(stationsRunning);

            //console.log(stationsRunning, uniqStatRun);

            // find the closest station to each of the current and destination longitude and latitudes

            var allDestDist = [];
            var allCurrDist = [];

            // loop through the array of stations and long/lat, find the magnitude of distance from current location and destination location and store them in an array

            for (var i = 0; i < clockApp.allCoordinates.length; i++) {
                //currLong, currLat, destLong, destLat
                //statLong: -84.367447, statLat: 33.821995

                // length of marta stations from destination point using Victor js
                allDestDist[i] = {};
                allDestDist[i].station = clockApp.allCoordinates[i].station;
                allDestDist[i].distance = new Victor(destLong-clockApp.allCoordinates[i].statLong, destLat - clockApp.allCoordinates[i].statLat).length();

                // console.log(destLong,clockApp.allCoordinates[i].statLong, destLat, clockApp.allCoordinates[i].statLong);

                //length of marta stations from starting point using Victor js
                allCurrDist[i] = {};
                allCurrDist[i].station = clockApp.allCoordinates[i].station;
                allCurrDist[i].distance = new Victor(currLong-clockApp.allCoordinates[i].statLong, currLat - clockApp.allCoordinates[i].statLat).length();

                

            
            }
            
            var currArr = [];
            var destArr = [];

            var minCurrDist;
            var minDestDist;

            var currStation;
            var destStation;

            for (var i = 0; i < allCurrDist.length; i++) {
                currArr[i] = allCurrDist[i].distance;
            }

            for (var i = 0; i < allDestDist.length; i++) {
                destArr[i] = allDestDist[i].distance;
            }

            minCurrDist = _.min(currArr);
            minDestDist = _.min(destArr);

            console.log("min distance from current location: " + minCurrDist);
            console.log("min distance from destination location: " + minDestDist);

            // we have the minimum distances of the stations from our current and destination locations - now go back and find what stations they're at

            var indexMinCurrStat;
            var indexMinDestStat;
            var currStatName;
            var destStatName;

            indexMinCurrStat = _.indexOf(currArr, minCurrDist);
            indexMinDestStat = _.indexOf(destArr, minDestDist);

            currStatName = allCurrDist[indexMinCurrStat].station;
            destStatName = allDestDist[indexMinDestStat].station;

            console.log(currStatName);
            console.log(destStatName);

            //we now have the stations that we'll need for our start and end points. now we have to find the MARTA lines they live on

            var myLines = [];

            for (var i = 0; i < response.length; i++) {   

                //
                if (response[i].STATION == currStatName || response[i].STATION === destStatName) {
                    myLines.push({station: response[i].STATION,  line: response[i].LINE, arrival: response[i].NEXT_ARR, direction: response[i].DIRECTION, destination: response[i].DESTINATION})
                }
            }

            // console.log(myLines);

            // we have all the lines running into the station, we need to organize them

            // get all the lines (blue, red, gold, etc.)
            // get all the directions (N, S, E, W)
            // get all the destinations

            var lineColor = [];
            var compass = [];
            var endPoint = [];

            for (var i = 0; i < myLines.length; i++) {
                lineColor[i] = myLines[i].line;
                compass[i] = myLines[i].direction;
                endPoint[i] = myLines[i].destination;
            }

            // not sure if we need these or not yet
            lineColor = _.uniq(lineColor);
            compass = _.uniq(compass);
            endPoint = _.uniq(endPoint);

            // console.log(lineColor);
            // console.log(compass);
            // console.log(endPoint);

            // we need all the stations that fall on each line in each direction. MARTA api doesn't return this every api call because not every train has sent its info to the api

            var redNorth = [];
            var redSouth = [];
            var goldNorth = [];
            var goldSouth = [];
            var blueEast = [];
            var blueWest = [];
            var greenEast = [];
            var greenWest = [];

            redSouth = ["NORTH SPRINGS STATION", "SANDY SPRINGS STATION", "DUNWOODY STATION", "MEDICAL CENTER STATION", "BUCKHEAD STATION", "LINDBERGH STATION", "ARTS CENTER STATION", "MIDTOWN STATION", "NORTH AVE STATION", "CIVIC CENTER STATION", "PEACHTREE CENTER STATION", "FIVE POINTS STATION", "GARNETT STATION", "WEST END STATION", "OAKLAND CITY STATION", "LAKEWOOD STATION", "EAST POINT STATION", "COLLEGE PARK STATION", "AIRPORT STATION"];


            redNorth = [].concat(redSouth).reverse();

            goldSouth = ["DORAVILLE STATION", "CHAMBLEE STATION", "BROOKHAVEN STATION", "LENOX STATION", "LINDBERGH STATION", "ARTS CENTER STATION", "MIDTOWN STATION", "NORTH AVE STATION", "CIVIC CENTER STATION", "PEACHTREE CENTER STATION", "FIVE POINTS STATION", "GARNETT STATION", "WEST END STATION", "OAKLAND CITY STATION", "LAKEWOOD STATION", "EAST POINT STATION", "COLLEGE PARK STATION", "AIRPORT STATION"];

            goldNorth = [].concat(goldNorth).reverse();

            blueWest = ["INDIAN CREEK STATION", "KENSINGTON STATION", "AVONDALE STATION", "DECATUR STATION", "EAST LAKE STATION", "EDGEWOOD CANDLER PARK STATION", "INMAN PARK STATION", "KING MEMORIAL STATION", "GEORGIA STATE STATION", "FIVE POINTS STATION", "OMNI DOME STATION", "VINE CITY STATION", "ASHBY STATION", "WEST LAKE ST  ATION", "HAMILTON E HOLMES STATION"];

            blueEast = [].concat(blueWest).reverse();


            greenWest = ["EDGEWOOD CANDLER PARK STATION", "INMAN PARK STATION", "KING MEMORIAL STATION", "GEORGIA STATE STATION", "FIVE POINTS STATION", "OMNI DOME STATION", "VINE CITY STATION", "ASHBY STATION", "BANKHEAD STATION"];

            greenEast = [].concat(greenWest).reverse();


            console.log(redNorth);

         // we have all the lines in order by direction

            // cycle through each line, see if the starting point and end points are on them. find where they intersect if we can

            // scenario 1: the starting point and ending point are on the same line

            //currStatName, destStatName

            // if both are on the same line, and the index of the starting point is less than the destination, then grab the line and the direction

            var whichLine;
            var whichDirection; 

            console.log(redSouth);
            console.log(_.indexOf(redSouth, currStatName));
            console.log(_.indexOf(redSouth, destStatName));

            if (_.indexOf(redSouth, currStatName) > -1 && _.indexOf(redSouth, destStatName) > -1 && _.indexOf(redSouth, currStatName) < _.indexOf(redSouth, destStatName)) {
                whichLine = "RED";
                whichDirection = "S";
            }
            else if (_.indexOf(redNorth, currStatName) > -1 && _.indexOf(redNorth, destStatName) > -1 && _.indexOf(redNorth, currStatName) < _.indexOf(redNorth, destStatName)) {
                whichLine = "RED";
                whichDirection = "N";
            }

            else if (_.indexOf(goldSouth, currStatName) > -1 && _.indexOf(goldSouth, destStatName) > -1 && _.indexOf(goldSouth, currStatName) < _.indexOf(goldSouth, destStatName)) {
                whichLine = "GOLD";
                whichDirection = "S";
            }

            else if (_.indexOf(goldNorth, currStatName) > -1 && _.indexOf(goldNorth, destStatName) > -1 && _.indexOf(goldNorth, currStatName) < _.indexOf(goldNorth, destStatName)) {
                whichLine = "GOLD";
                whichDirection = "N";
            }
            else if (_.indexOf(blueEast, currStatName) > -1 && _.indexOf(blueEast, destStatName) > -1 && _.indexOf(blueEast, currStatName) < _.indexOf(blueEast, destStatName)) {
                whichLine = "BLUE";
                whichDirection = "E";
            }
            else if (_.indexOf(blueWest, currStatName) > -1 && _.indexOf(blueWest, destStatName) > -1 && _.indexOf(blueWest, currStatName) < _.indexOf(blueWest, destStatName)) {
                whichLine = "BLUE";
                whichDirection = "W";
            }
            else if (_.indexOf(greenEast, currStatName) > -1 && _.indexOf(greenEast, destStatName) > -1 && _.indexOf(greenEast, currStatName) < _.indexOf(greenEast, destStatName)) {
                whichLine = "GREEN";
                whichDirection = "E";
            }
            else if (_.indexOf(greenWest, currStatName) > -1 && _.indexOf(greenWest, destStatName) > -1 && _.indexOf(greenWest, currStatName) < _.indexOf(greenWest, destStatName)) {
                whichLine = "GREEN";
                whichDirection = "W";
            } 

            else {
                whichLine = "No Direct Line";
                whichDirection = "No Direct Line";
            }

            console.log("we're on the line: " + whichLine, "we're headed: " + whichDirection);

            console.log(myLines);

            var myLines2 = [];
            
            if (whichLine !== "No Direct Line") {
                // myLines.push({station: response[i].STATION,  line: response[i].LINE, arrival: response[i].NEXT_ARR, direction: response[i].DIRECTION, destination: response[i].DESTINATION}

                for (i = 0; i < myLines.length; i++) {
                    //find the lines we want for the direciton we're headed in
                    if (myLines[i].line === whichLine && myLines[i].direction === whichDirection && myLines[i].station === currStatName) {
                        myLines2.push(myLines[i]);
                    }


                }
            }

            console.log(myLines2);

            var arrival = "";
            var trainInfo = "";

        if (myLines2.length !== 0 && whichLine !== "No Direct Line") {
            for (var i = 0; i < myLines2.length; i++) {
                
                arrival = "Train Arriving at " + myLines2[i].station + 
                " " + moment(myLines2[i].arrival, "hh:mm:ss a").fromNow();

                console.log(arrival);

                trainInfo = "You'll be taking the " + whichLine + " line " + "heading " + whichDirection + " at the " + currStatName;

                console.log(trainInfo)
                
            };

        }

        else if (whichLine === "No Direct Line") {
            trainInfo = "No Direct Line to Your Destination!";
            console.log(trainInfo);
        }
        
        else {
            arrival = "Waiting on the MARTA Schedule!";

            console.log(arrival);

            trainInfo = "You'll be taking the " + whichLine + " line " + "heading " + whichDirection + " at the " + currStatName;

            console.log(trainInfo);
        }

        // the next section will handle a non-direct line trip, save this for the future
            

        })
    },

    MQapikey: "lk4t8vdc1GbFGarz3jGhhCvcH03NQYbX",

    MQurl: "http://www.mapquestapi.com/directions/v2/route?", //key=KEY&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA"

    mapquest: function (e, MQapikey, MQurl) {
        e.preventDefault();
        url = MQurl + $.param({ key: MQapikey, from: $("#yolo").val(), to: $("#dest").val() });
        $.ajax(url, "Get").then(function (response) {
            console.log(response);
            var man = response.route.legs[0].maneuvers;
            for (var i in man) {
                $("#dir").append(response.route.legs[0].maneuvers[i].narrative + "<br>");
            }

            var currLong = response.route.locations[0].displayLatLng.lng;
            var currLat = response.route.locations[0].displayLatLng.lat;
            var destLong = response.route.locations[1].displayLatLng.lng;
            var destLat = response.route.locations[1].displayLatLng.lat;

            console.log("currLong = "  + currLong, "currLat = " + currLat, "destLong = " + destLong, "destLat = " + destLat);

            // call marta api to get the 
            clockApp.marta(currLong, currLat, destLong, destLat);

        })
    },
}


$(document).ready(function () { clockApp.dropDownSet() });

$(document).on("click", "#clockSet", function (e) { clockApp.clockSet(e) });

$(document).on("click", "#go", function (e) { clockApp.mapquest(e, clockApp.MQapikey, clockApp.MQurl) });
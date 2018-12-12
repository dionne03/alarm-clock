
//user enters destination
var destLong = 0;
var destLat = 0;

//use geolocation to get current location
var currLong = 0;
var currLat = 0;

// list of marta stations and coordinates

var stations = [];
var stationsRunning = [];
var uniqStatRun =[];

//find destination of marta station long, lat
var martaLong = 0;
var martaLat = 0;

//array for storing magnitude of distance from user to closest marta station
var magnitude = 0;

//variable for storing magnitude of distance from marta station to destination

function whereAmI() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
   currLat = position.coords.latitude;
   currLong = position.coords.longitude;

   console.log(currLong, currLat);

   magnitude = new Victor(currLong-destLong, currLat-destLat).magnitude();

   console.log("distance between destination and curr location is " + magnitude);

}

function marta() {

    $("#train-time").on("click", function () {
        // create new variable , give it give it the data name of the clicked button
        var clickedTopic = $(this).attr("data-name");
        //query url for giphy api
        var queryURL = "https://cors-anywhere.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apiKey=f0748228-fd30-475b-828c-e03e6dd4aad5";
        
        //ajax call for api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            //log the respone data to a variable, console log
            console.log(response.length);

            for (i = 0; i < response.length; i++) {
                stationsRunning[i] = response[i].STATION;
            };

            console.log(stationsRunning);

            uniqStatRun = _.uniq(stationsRunning);
            
            console.log(uniqStatRun);

            destLong = -84.35306650000001;

            destLat = 33.9087083;

            console.log(destLong, destLat);
            // clear the gifs;
            
            whereAmI();
            showPosition();


            
            

            //create new divs for returned gifs
        });
    });
};



$(document).ready(function(){
    marta();
});
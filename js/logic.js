var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;


var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

// Create the createMap function
function createMap(bikeStations) {
  // Define variables for our tile layers
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Dark: dark
  };

  var bikeStationMarkers = [];

  for (var i = 0; i < bikeStations.length; i++) {
    var station = bikeStations[i];

    // loop through the bikeStations array, create a new marker, push it to the bikeStationMarkers array
    bikeStationMarkers.push(
      L.marker([station.lat, station.lon])
           .bindPopup("<h2>" + station.name + "</h2> <hr> <h3>Station ID: " + station.station_id + "<br>Capacity: " + station.capacity + "</h3>"));
  }
  
  var bikeStationLayer = L.layerGroup(bikeStationMarkers);

  // Creating map object
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [light, bikeStationLayer]
  });


  // L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  L.control.layers(baseMaps).addTo(myMap);

}

// function createMarkers(response) {
  
// }

// Grab the data with d3
d3.json(url, function(response) {
  console.log(response.data.stations[0]);

  createMap(response.data.stations);

});


var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Creating map object
var myMap = L.map("map-id", {
  center: newYorkCoords,
  zoom: mapZoomLevel
});

// // Creating map object
// var myMap = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12
// });

var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

// Create the createMap function

// Grab the data with d3
d3.json(url, function(response) {

  // Create the tile layer that will be the background of our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Grabbing our GeoJSON data..
  // d3.json(url, function(data) {
  //   // Creating a GeoJSON layer with the retrieved data
  //   L.geoJson(data).addTo(myMap);
  // });


  // Create a baseMaps object to hold the lightmap layer


  // Create an overlayMaps object to hold the bikeStations layer


  // Create the map object with options


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
});


// Create the createMarkers function

  // Pull the "stations" property off of response.data

  // Initialize an array to hold bike markers

  // Loop through the stations array
    // For each station, create a marker and bind a popup with the station's name

    // Add the marker to the bikeMarkers array

  // Create a layer group made from the bike markers array, pass it into the createMap function


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json(url, function(response) {

//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();

  // Loop through data
  // for (var i = 0; i < response.length; i++) {

  //   // Set the data location property to a variable
  //   var location = response[i].location;

  //   // Check for location property
  //   if (location) {

  //     // Add a new marker to the cluster group and bind a pop-up
  //     markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
  //       .bindPopup(response[i].descriptor));
  //   }

  // }

//   var data = response.data;
//   console.log(data);

//   data.forEach(station => {
//     if (station.station_id) {
//         heatArray.push([station.lat, station.lon]);
//     }
// });

//   // Add our marker cluster layer to the map
//   myMap.addLayer(markers);

// });
d3.json(url, function(response) {
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // console.log(response);

  var data = response.data.stations;
  console.log(data);


  // Loop through data
  // data.forEach(station => {
  //     // Set the data location property to a variable

  //     // var location = station.location;
  //     // Check for location property

  //     if (station) {
  //         // console.log(station.name);
  //         var name = station.name;
  //         // console.log(name);
  //         // Add a new marker to the cluster group and bind a pop-up
  //         markers.addLayer(L.marker([station.lat,station.lon]))
  //             .bindPopup("<h1>" + station.name + "</h1> <hr> <h2>Capacity: " + station.capacity + "</h2>");
  //             // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
  //           }

  for (var i = 0; i < data.length; i++) {

    // Set the data location property to a variable
    var station = data[i];

    // Check for station property
    if (station) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([station.lat, station.lon])
        .bindPopup("<h2>" + station.name + "</h2> <hr> <h3>Station ID: " + station.station_id + "<br>Capacity: " + station.capacity + "</h3>"));
    }

  }


  // });
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
});
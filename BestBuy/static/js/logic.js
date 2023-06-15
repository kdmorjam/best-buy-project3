// let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
let url = '/static/station.json';
let torontoCoords = [43.79, -79.47]; // [40.73, -74.0059];
let mapZoomLevel = 8;


// Create the createMap function.
function createMap (bstations) {

  // Create the tile layer that will be the background of our map.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


//   // Create a baseMaps object to hold the lightmap layer.
//   let baseMaps = {
//     "Street Map" : street
//   }
  

//   // Create an overlayMaps object to hold the bikeStations layer.
//   let overlayMaps = {
//     "Bicycle Stations" : bicycleStations
//  }

  // Create the map object with options.
  let myMap = L.map("map-id", {
    center: torontoCoords,
    zoom: mapZoomLevel,
    layers: [street, bstations]
  })

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers({
    collapsed: false
  }).addTo(myMap)
}

// Create the createMarkers function.
function createMarkers(response) {

  // Pull the "stations" property from response.data.
  let stations = response.stations

  // Initialize an array to hold the bike markers.
  let bikeMarkers = []
  // console.log(stations)

  // Loop through the stations array.
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i]
    let bikeCoords = [station.lat, station.lon]

    // For each station, create a marker, and bind a popup with the station's name.
    // let bikeMarker = L.marker(bikeCoords).bindPopup("<h3>" + station.name + "<h3>")
    let bikeMarker = L.marker(bikeCoords)
    
    // Add the marker to the bikeMarkers array.
    // console.log(bikeCoords)
    bikeMarkers.push(bikeMarker)
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers))
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(url).then(createMarkers);




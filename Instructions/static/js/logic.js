
var myMap = L.map("map", {
    center: [30, 0],
    zoom: 2,
});

var color ;
var mag ;

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: "pk.eyJ1IjoibmF0aGFubWFjZSIsImEiOiJjazcxNHN0ZTEwMzBzM250M3htczVvYzhxIn0.Cm6Khu9SA3k7tt9Xfm1dcQ"
}).addTo(myMap);

  function insertData(data) {

    var features = data.features;
    console.log(features);

    
    
    // // Initialize an array to hold bike markers
    var eqLocs = [];

    for (var index = 0; index < features.length; index++) {
      var eqData = features[index];
      mag = eqData.properties.mag;

        if (mag < 0.1) { continue;};
        if (0.1 <= mag && mag < 1) {
            color = "Gold"
        }
        else if (1 <= mag && mag <2) {
            color = "Orange"
        }
        else if (2 <= mag && mag <3) {
            color = "DarkOrange"
        }
        else if (3 <= mag && mag <4) {
            color = "Coral"
        }
        else if (4 <= mag && mag <5) {
            color = "OrangeRed"
        }
        else if (5 <= mag && mag<6) {
            color = "DarkRed"
        }
        else if (6 <= mag) {
            color = "Black"
        };

      L.circle([eqData.geometry.coordinates[1], eqData.geometry.coordinates[0]], {
        Opacity: .40,
        fillOpacity: 0.75,
        color: color,
        fillColor: color,
        radius: (mag ** mag) * 30
      }).bindTooltip("<h3>" + eqData.properties.place + "<h3><h3>Magnitude: " + mag + "<h3><hr>Depth: " + eqData.geometry.coordinates[2]).addTo(myMap);
    

    // eqLocs.push(eqLoc);
    
    }
    // // Create a layer group made from the bike markers array, pass it into the createMap function
    // L.layerGroup(eqLocs);
    console.log(eqLocs);
  }

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var mags = ["0-1","1-2","2-3","3-4","4-5","5-6",">6"];
      var colors = ["Gold","Orange","DarkOrange","Coral","OrangeRed","DarkRed","Black"];
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Earthquake Magnitude</h1>"
        // "<div class=\"labels\">" +
        //   "<div class=\"min\">" + mags[0] + "</div>" +
        //   "<div class=\"max\">" + mags[1] + "</div>" +
        // "</div>";
  
      div.innerHTML = legendInfo;
  
      mags.forEach(function(mags, index) {
        labels.push("<div>"+mags+"<div style=\"background-color: " + colors[index] + "\"></div></div>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);


  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", insertData);
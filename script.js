/*var $ = window.jQuery = require("jquery")
require("jquery-ui")*/

mapboxgl.accessToken = 'pk.eyJ1IjoibG9sbmV5IiwiYSI6Il9rMGRGa2cifQ.xtEz-bJjWVzaJBUK2sWBsA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/lolney/cj40toyp15dsn2ss1t7o1wocs', //stylesheet location
    center: [-122.435887,37.765618], // starting position
    zoom: 12 // starting zoom
});

var ageFilter = function(l,h){
	var newfilter = ['all', ['>', 'Year Property Built', l], ['<', 'Year Property Built', h]];
	map.setFilter('building-footprints-vector', newfilter);
}

var ageFilterRange = function(range){
	ageFilter(range['l'].toString(), range['h'].toString());
}

var range = {'l':1860, 'h':1900};

map.on("load", function(){

    map.addLayer({
        "id": "building-footprints-vector",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://lolney.bqk3icqv'
        },
        "source-layer": "joinedLotsgeojson",
        "paint": {
            "fill-color": "#666666",
            "fill-opacity": 0.7
        }
    });

    $( "#slider-range" ).slider({
	  range: true,
	  min: 1850,
	  max: 2000,
	  values: [ range['l'], range['h'] ],
	  slide: function( event, ui ) {
	    $( "#amount" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
	    range['l'] = ui.values[0];
	    range['h'] = ui.values[1];
	    ageFilterRange(range);
	  }
	});

	$( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) +
	  " - " + $( "#slider-range" ).slider( "values", 1 ) );

	ageFilterRange(range)

})




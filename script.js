mapboxgl.accessToken = 'pk.eyJ1IjoibG9sbmV5IiwiYSI6Il9rMGRGa2cifQ.xtEz-bJjWVzaJBUK2sWBsA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-122.415887,37.735618], // starting position
    zoom: 17 // starting zoom
});

map.on("load", function(){

    map.addLayer({
        "id": "building-footprints-vector",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://lolney.61zxsbxz'
        },
        "source-layer": "building_footprintsgeojson",
        "paint": {
            "fill-color": "#666666",
            "fill-opacity": 0.7
        }
    });

})
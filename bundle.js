(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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




},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKnZhciAkID0gd2luZG93LmpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIilcbnJlcXVpcmUoXCJqcXVlcnktdWlcIikqL1xuXG5tYXBib3hnbC5hY2Nlc3NUb2tlbiA9ICdway5leUoxSWpvaWJHOXNibVY1SWl3aVlTSTZJbDlyTUdSR2EyY2lmUS54dEV6LWJKaldWemFKQlVLMnNXQnNBJztcbnZhciBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgICBjb250YWluZXI6ICdtYXAnLCAvLyBjb250YWluZXIgaWRcbiAgICBzdHlsZTogJ21hcGJveDovL3N0eWxlcy9sb2xuZXkvY2o0MHRveXAxNWRzbjJzczF0N28xd29jcycsIC8vc3R5bGVzaGVldCBsb2NhdGlvblxuICAgIGNlbnRlcjogWy0xMjIuNDM1ODg3LDM3Ljc2NTYxOF0sIC8vIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAgem9vbTogMTIgLy8gc3RhcnRpbmcgem9vbVxufSk7XG5cbnZhciBhZ2VGaWx0ZXIgPSBmdW5jdGlvbihsLGgpe1xuXHR2YXIgbmV3ZmlsdGVyID0gWydhbGwnLCBbJz4nLCAnWWVhciBQcm9wZXJ0eSBCdWlsdCcsIGxdLCBbJzwnLCAnWWVhciBQcm9wZXJ0eSBCdWlsdCcsIGhdXTtcblx0bWFwLnNldEZpbHRlcignYnVpbGRpbmctZm9vdHByaW50cy12ZWN0b3InLCBuZXdmaWx0ZXIpO1xufVxuXG52YXIgYWdlRmlsdGVyUmFuZ2UgPSBmdW5jdGlvbihyYW5nZSl7XG5cdGFnZUZpbHRlcihyYW5nZVsnbCddLnRvU3RyaW5nKCksIHJhbmdlWydoJ10udG9TdHJpbmcoKSk7XG59XG5cbnZhciByYW5nZSA9IHsnbCc6MTg2MCwgJ2gnOjE5MDB9O1xuXG5tYXAub24oXCJsb2FkXCIsIGZ1bmN0aW9uKCl7XG5cbiAgICBtYXAuYWRkTGF5ZXIoe1xuICAgICAgICBcImlkXCI6IFwiYnVpbGRpbmctZm9vdHByaW50cy12ZWN0b3JcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZmlsbFwiLFxuICAgICAgICBcInNvdXJjZVwiOiB7XG4gICAgICAgICAgICB0eXBlOiAndmVjdG9yJyxcbiAgICAgICAgICAgIHVybDogJ21hcGJveDovL2xvbG5leS5icWszaWNxdidcbiAgICAgICAgfSxcbiAgICAgICAgXCJzb3VyY2UtbGF5ZXJcIjogXCJqb2luZWRMb3RzZ2VvanNvblwiLFxuICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgIFwiZmlsbC1jb2xvclwiOiBcIiM2NjY2NjZcIixcbiAgICAgICAgICAgIFwiZmlsbC1vcGFjaXR5XCI6IDAuN1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlcih7XG5cdCAgcmFuZ2U6IHRydWUsXG5cdCAgbWluOiAxODUwLFxuXHQgIG1heDogMjAwMCxcblx0ICB2YWx1ZXM6IFsgcmFuZ2VbJ2wnXSwgcmFuZ2VbJ2gnXSBdLFxuXHQgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHQgICAgJCggXCIjYW1vdW50XCIgKS52YWwodWkudmFsdWVzWyAwIF0gKyBcIiAtIFwiICsgdWkudmFsdWVzWyAxIF0gKTtcblx0ICAgIHJhbmdlWydsJ10gPSB1aS52YWx1ZXNbMF07XG5cdCAgICByYW5nZVsnaCddID0gdWkudmFsdWVzWzFdO1xuXHQgICAgYWdlRmlsdGVyUmFuZ2UocmFuZ2UpO1xuXHQgIH1cblx0fSk7XG5cblx0JCggXCIjYW1vdW50XCIgKS52YWwoJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDAgKSArXG5cdCAgXCIgLSBcIiArICQoIFwiI3NsaWRlci1yYW5nZVwiICkuc2xpZGVyKCBcInZhbHVlc1wiLCAxICkgKTtcblxuXHRhZ2VGaWx0ZXJSYW5nZShyYW5nZSlcblxufSlcblxuXG5cbiJdfQ==

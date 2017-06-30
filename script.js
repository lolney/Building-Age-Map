/*var $ = window.jQuery = require("jquery")
require("jquery-ui")*/

import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

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
	ageFilter(range['min'].toString(), range['max'].toString());
}


class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: {
        min: 1900,
        max: 1920,
      },
    };

    ageFilterRange(this.state.value1);
  }

  render() {
    return (
      <form className="form">
        <InputRange
          maxValue={2000}
          minValue={1850}
          formatLabel={value => `${value} `}
          value={this.state.value1}
          onChange={value => {
            this.setState({ value1: value });
            ageFilterRange(value);
        }}
          onChangeComplete={value => console.log(value)} />
      </form>
    );
  }
}

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

    ReactDOM.render(
      <ExampleApp />,
      document.getElementById('app')
    );

})




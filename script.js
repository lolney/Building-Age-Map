/*var $ = window.jQuery = require("jquery")
require("jquery-ui")*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactHover from 'react-hover';
import InputRange from 'react-input-range';
import HoverComponent from './HoverComponent';
import TriggerComponent from './TriggerComponent';


mapboxgl.accessToken = 'pk.eyJ1IjoibG9sbmV5IiwiYSI6Il9rMGRGa2cifQ.xtEz-bJjWVzaJBUK2sWBsA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/lolney/cj40toyp15dsn2ss1t7o1wocs', //stylesheet location
    center: [-122.435887,37.765618], // starting position
    zoom: 12 // starting zoom
});

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0
}

class AgeFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: {
        min: 1900,
        max: 1920,
      },
    };

    this.ageFilterRange(this.state.value1);
  }

  ageFilter(l,h){
    var newfilter = ['all', ['>', 'Year Property Built', l], ['<', 'Year Property Built', h]];
    map.setFilter('building-footprints-vector', newfilter);
  }

  ageFilterRange(range){
    this.ageFilter(range['min'].toString(), range['max'].toString());
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
            this.ageFilterRange(value);
        }}
          onChangeComplete={value => console.log(value)} />
      </form>
    );
  }
}

class Hover extends Component {

  render () {
    return (
      <div>
        <ReactHover
          options={optionsCursorTrueWithMargin}>
          <ReactHover.Trigger>
            <h1 className='background'></h1>
          </ReactHover.Trigger>
          <ReactHover.Hover>
            <HoverComponent />
          </ReactHover.Hover>
        </ReactHover>
      </div>
    )
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
      <div>
        <Hover/> 
        <AgeFilter/>
      </div>,
      document.getElementById('app')
    );

})




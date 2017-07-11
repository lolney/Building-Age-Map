import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactHover from 'react-hover';
import InputRange from 'react-input-range';
import HoverHelper from './HoverHelper';
import HoverComponent from './HoverComponent';
import ModTrigger from './ModTrigger';


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
    map.setFilter('joinedlotsgeojson', newfilter);
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
        <HoverHelper
          options={optionsCursorTrueWithMargin}>
          <ModTrigger>
            <h1 className='background'></h1>
          </ModTrigger>
          <HoverComponent map={map}/>
        </HoverHelper>
      </div>
    )
  }
}

map.on("load", function(){

    ReactDOM.render(
      <div>
        <Hover/> 
        <AgeFilter/>
      </div>,
      document.getElementById('app')
    );

})




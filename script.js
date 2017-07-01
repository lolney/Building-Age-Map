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

    class HoverClicker extends ReactHover {
      constructor(props) {
        super(props);
        this.state = {
          coords : null
        }
      }

      getCursorPos(e) {
        super.getCursorPos(e);
        this.setState({coords : {x:e.clientX,y:e.clientY}});
      }

      renderItem (item, index) {
        if (item.type.name == 'Trigger') {
          return (
            <ReactHover.Trigger key={index}>
              {item}
            </ReactHover.Trigger>
          )
        } else if (item.type.name == 'HoverComponent') {
          return (
            <HoverComponent key={index} coords={item.props.coords} map={item.props.map} styles={item.props.styles}>
            </HoverComponent>
          )
        }
      }

      render() {
        const { hoverComponentStyle } = this.state
        let childrenWithProps = [];
        for (let child of this.props.children) {
          if (child.type.name == 'Trigger') {
             childrenWithProps.push(React.cloneElement(child, {
                setVisibility:this.setVisibility.bind(this),
                getCursorPos: this.getCursorPos.bind(this)
              }));
          } else if(child.type.name == 'HoverComponent') {
              let clone = React.cloneElement(child, {
                styles: hoverComponentStyle,
                coords: this.state.coords
               });
               //clone.componentWillReceiveProps(clone.props);
               childrenWithProps.push(clone);
          }
        }

        return (
          <div>
            {childrenWithProps.map((item,index) => this.renderItem(item, index))}
          </div>
        )
      }

      // Get cursor position updates state
      // Send mouse coordinates as prop to hoverComponent
    }

    class Hover extends Component {

      render () {
        return (
          <div>
            <HoverClicker
              options={optionsCursorTrueWithMargin}>
              <ReactHover.Trigger>
                <h1 className='background'></h1>
              </ReactHover.Trigger>
              <HoverComponent map={map}/>
            </HoverClicker>
          </div>
        )
      }
    }

    ReactDOM.render(
      <div>
        <Hover/> 
        <AgeFilter/>
      </div>,
      document.getElementById('app')
    );

})




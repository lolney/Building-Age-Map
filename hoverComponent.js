import React, { Component, PropTypes } from 'react'
import MapboxGL, {Point} from 'mapbox-gl'
import ReactDOM from 'react-dom';
import ReactHover from 'react-hover';

export default class HoverComponent extends ReactHover.Hover {

    constructor (props) {
        super(props);

        this.state = {
          address: "",
          built: "",
          map: props.map
        };

        if(props.coords != null) {console.log("coords not null")};

        this.render = this.render.bind(this);
        this.blank = this.blank.bind(this);
    }

    blank() {
        this.setState({
          address: "",
          built: ""
        });
    }

    // Better done with react-map-gl?
    componentWillReceiveProps(props) {
        console.log("onMouseMove");
        if(props.coords == null) {
            this.blank();
            return;
        }
        let width = 20.0;
        let height = 20.0;
        let features = this.state.map.queryRenderedFeatures([
              [props.coords.x - width / 2, props.coords.y - height / 2],
              [props.coords.x + width / 2, props.coords.y + height / 2]
            ],
            {"layers":["building-footprints-vector"]});

        if(features.length < 1) {
            this.blank();
            return;
        }
        let fprops = features[0].properties;
        this.setState({
          address: [fprops.to_st, fprops.street, fprops.st_type].join(" "),
          built: fprops["Year Property Built"]
        });
    }

    render () {
        let styles = this.props.styles;
        styles = styles == null ? {} : styles;
        
        return (
          <div
          className="hover" 
          style={Object.assign(styles,
            {overflowY: 'auto',
            visibility: ((this.state.address=="" || this.state.built=="") ? "hidden" : "visible")})}>
            <div>
              <h1> {this.state.address} </h1> 
              <p> Built {this.state.built} </p>
            </div>
          </div>
        )
    }
}
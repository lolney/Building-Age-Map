import React, { Component } from 'react'

export default class HoverComponent extends Component {
  render () {
    return (
      <div className="hover" style={{overflowY: 'auto'}}>
        <h1> pop up header </h1> <p> pop up content </p>
      </div>
    )
  }
}
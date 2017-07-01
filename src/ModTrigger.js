import React, { Component, PropTypes } from 'react'

/* Eliminates the clumsy passing of props to a dummy child node
*  from the original Trigger
*/
export default class ModTrigger extends Component {

  constructor (props) {
    super(props)
    this.state = {
      styles: props.styles
    }
  }

  render () {
    const {styles} = this.state
    return (
      <div
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onTouchStart={this.onTouchStart.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
        ref='triggerContainer'
        style={styles}
        >
        {this.props.children}
      </div>
    )
  }

  onMouseOver () {
    const { setVisibility } = this.props
    setVisibility(true)
  }

  onMouseOut () {
    const { setVisibility } = this.props
    setVisibility(false)
  }

  onMouseMove (e) {
    const { getCursorPos } = this.props
    getCursorPos(e)
  }

  onTouchStart () {
    const { setVisibility } = this.props
    setVisibility(true)
  }

  onTouchEnd () {
    const { setVisibility } = this.props
    setVisibility(false)
  }
}

import React from 'react';
import ReactHover from 'react-hover';
import HoverComponent from './HoverComponent';
import ModTrigger from './ModTrigger';

export default class HoverHelper extends ReactHover {
      constructor(props) {
        super(props);
        this.state = {
          coords : null
        }
      }

      getCursorPos(e) {
        const cursorX = e.pageX
        const cursorY = e.pageY
        let {options: { followCursor, shiftX, shiftY }} = this.props
        let { hoverComponentStyle } = this.state
        if (!followCursor) {
          return
        }
        if (isNaN(shiftX)) {
          shiftX = 0
        }
        if (isNaN(shiftY)) {
          shiftY = 0
        }

        let top = cursorY + shiftY;
        let left = cursorX + shiftX;
        // This style could be included in hoverComponentStyle
        let elem = document.getElementsByClassName("hover")[0];
        let height = parseInt(window.getComputedStyle(elem,null).getPropertyValue("height")); 
        let width = parseInt(window.getComputedStyle(elem,null).getPropertyValue("width"));

        // Map is only accessible here because it's a global variable in the browserified script
        // Can't be passed as a prop, for some reason
        top = top + height > map.clientHeight ? map.clientHeight - height : top;
        left = left + width > map.clientWidth ? map.clientWidth - width : left;

        let updatedStyles = Object.assign(hoverComponentStyle, {top: top, left: left});

        this.setState({
          hoverComponentStyle: updatedStyles,
          coords : {x:cursorX, y:cursorY}
        })

      }

      render() {
        const { hoverComponentStyle } = this.state
        let childrenWithProps = [];
        for (const [index, child] of this.props.children.entries()) {
          if (child.type.name == 'ModTrigger') {
             childrenWithProps.push(React.cloneElement(child, {
                setVisibility:this.setVisibility.bind(this),
                getCursorPos: this.getCursorPos.bind(this),
                key: index
              }));
          } else if(child.type.name == 'HoverComponent') {
              let clone = React.cloneElement(child, {
                styles: hoverComponentStyle,
                coords: this.state.coords,
                key: index
               });
               childrenWithProps.push(clone);
          }
        }

        return (
          <div>
            {childrenWithProps}
          </div>
        )
      }

      // Get cursor position updates state
      // Send mouse coordinates as prop to hoverComponent
    }
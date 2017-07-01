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
        super.getCursorPos(e);
        this.setState({coords : {x:e.clientX,y:e.clientY}});
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
import React, { Component } from 'react';
import { createRef } from 'react';
class SheetMusic extends Component {

    wrapperRef = createRef();

    static defaultProps = {
        onInsideClick: () => {}
      };

    componentDidMount(){
        document.addEventListener("mousedown", this.handleInsideClick);
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown", this.handleInsideClick);
    }

    handleInsideClick = (event) => {
        if(this.wrapperRef.current && this.wrapperRef.current.contains(event.target)){
            this.props.onInsideClick();
        }
    }

    render() { 
        return (
            <div div id="image-mapper-div" className="image-mapper" ref={this.wrapperRef}>
                {this.props.children}
            </div>
        )
    }
}
 
export default SheetMusic;
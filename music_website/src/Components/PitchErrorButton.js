import React, { Component } from 'react';

class PitchErrorButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            errorCount: 0,
        }
        this.tempHandleClick = this.tempHandleClick.bind(this);
    }

    tempHandleClick(){
        this.setState({ errorCount : this.state.errorCount + 1 });
    }

    render() { 
        return(
            <button id="pitch-error" className="button" onClick={this.props.handler}>Add Pitch Error</button>
        );
    }
}
 
export default PitchErrorButton;
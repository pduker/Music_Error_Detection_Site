import React, { Component } from 'react';

class RythmErrorButton extends Component {

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
            <div id="rythm-error" className="button" onClick={this.props.handler}>Add Rythm Error</div>
        );
    }
}
 
export default RythmErrorButton;
import React, { Component } from 'react';

class IntonationErrorButton extends Component {

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
            <div id="intonation-error" className="button" onClick={this.props.handler}>Add Intonation Error</div>
        );
    }
}
 
export default IntonationErrorButton;
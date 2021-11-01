import React, { Component } from 'react';

class Music extends Component {

    constructor(props){
        super(props);
        this.state = {
            play: false,
        }
        this.audio = new Audio(this.props.url)
        this.togglePlay = this.togglePlay.bind(this);
    }
    
    componentDidMount() {
        this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }
    
    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    }

    render() {
        return (
            <button className="button music-button" onClick={this.togglePlay}>{this.state.play ? 'Pause Sound' : 'Play Sound'}</button>
        );
    }
}
 
export default Music;
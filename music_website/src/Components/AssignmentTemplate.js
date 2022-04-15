import React, { Component } from 'react';
import IntonationErrorButton from './IntonationButton';
import Music from './Music';
import PitchErrorButton from './PitchErrorButton';
import RythmErrorButton from './RythmErrorButton';
//import musicSheetExample1 from "./../Resources/Images/Example1Display.png";
//import audioExample1 from "./../Resources/Audio/Example1.m4a";
import history from "./../Scripts/history";
import './../Styles/assignmentTemplate.css';

class AssignmentTemplate extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentErrorType: '',
            pitchErrorCount: 0,
            rythmErrorCount: 0,
            intonationErrorCount: 0,
        }
        this.handleErrorButtonClick = this.handleErrorButtonClick.bind(this);
    }

    handleErrorButtonClick(event){
        let newErrorType = event.target.id;
        switch(newErrorType){
            case "pitch-error":
                this.setState({ pitchErrorCount: this.state.pitchErrorCount + 1 });
                break;
            case "rythm-error":
                this.setState({ rythmErrorCount: this.state.rythmErrorCount + 1 });
                break;
            case "intonation-error":
                this.setState({ intonationErrorCount: this.state.intonationErrorCount + 1 });
                break;
            default:
                console.log("UNKNOWN ERROR TYPE HAS BEEN SET");
        }
        this.setState({ currentErrorType: newErrorType });
    }

    render() {
        return (
        <div className="assignment-template">
            <h1 className="assignment-header">Assignment Template {this.props.assignmentNumber}</h1>
            <div className="instructions">
                <p>{/*Styling should be done with CSS and not HTML tags*/}
                Instruction: Click the "Play Sound" button to hear the music.
                You will only be able to play the sound 3 times. After listening to the music,
                place the hotspots over each note error. There are 3 differnt types of error:
                Pitch Error (Purple), Rhythm Error (Red), and Intonation Error (Green).
                <br></br>
                How to place the hotspot?
                <br></br>
                1. Click the error button
                <br></br>
                2. Place the hotspot on the note error
                <br></br>
                3. Click the error button again.
                <br></br>
                4. If you want to add more errors, click on the note to place hotspot and click the error button.
                <br></br>
                5. After you are done, click the submit button to check your answer
                </p>
            </div>
            <Music url={this.props.audioUrl}></Music>
            <PitchErrorButton handler={this.handleErrorButtonClick}></PitchErrorButton>
            <RythmErrorButton handler={this.handleErrorButtonClick}></RythmErrorButton>
            <IntonationErrorButton handler={this.handleErrorButtonClick}></IntonationErrorButton>
            <img id="img1" className="music-sheet" src={this.props.sheetMusic} alt="musicSheet"/>
            <button className="button back-button" onClick={() => {
                history.push('/');
                history.go();
            }}>Back</button>
            <button className="button submit-button">Submit</button>
        </div>
        );
    }
}

export default AssignmentTemplate;
import React, { Component } from 'react';
import IntonationErrorButton from './IntonationButton';
import Music from './Music';
import PitchErrorButton from './PitchErrorButton';
import RythmErrorButton from './RythmErrorButton';
import musicSheetExample1 from "./../Resources/Images/Example1Display.png";
import audioExample1 from "./../Resources/Audio/Example1.m4a";
import history from "./../Scripts/history";
import './../Styles/assignmentTemplate.css';

class AssignmentTemplate extends Component {

    constructor(props){
        super(props);
        this.state = {
            errorType: '',
            count: 0,
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
        this.setState({ errorType: newErrorType });
    }

    render() { 
        return (
        <div className="assignment-template">
            <h1 className="assignment-header">Assignment {/*insert assignment number here*/}</h1>
            <div className="instructions">
                <p>{/*Styling should be done with CSS and not HTML tags*/}
                Instruction: Click the "Play Sound" button to hear the music. 
                You will only be able to play the sound 3 times. After listening to the music, 
                place the hotspots over each note error. There are 3 differnt types of error:
                Pitch Error (Purple), Rhythm Error (Red), and Intonation Error (Green).
                How to place the hotspot?
                1. Click the error button
                2. Place the hotspot on the note error
                3. Click the error button again.
                4. If you want to add more errors, click on the note to place hotspot and click the error button.
                5. After you are done, click the submit button to check your answer
                </p>
            </div>
            <Music url={audioExample1}></Music>
            <PitchErrorButton handler={this.handleErrorButtonClick}></PitchErrorButton>
            <RythmErrorButton handler={this.handleErrorButtonClick}></RythmErrorButton>
            <IntonationErrorButton handler={this.handleErrorButtonClick}></IntonationErrorButton>
            <img id="img1" className="music-sheet" src={musicSheetExample1} alt="musicSheet"/>
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
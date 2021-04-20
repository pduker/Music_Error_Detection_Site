import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../music_example/Example1.m4a";
import example1 from "./../music_example/Example1Display.png";
import example1Ans from "./../music_example/Example1Answer.png";
// import headerImg from "./../Images/Header.png";
var count;
var isPlaying = false;
var audio = new Audio(Tmp);
var hotspotCountP = 1;
var hotspotCountR = 1;
var hotspotCountI = 1;
const imageStyle1 = {
  display: 'block'
};
const imageStyle2 = {
  display: 'none'
};

class Assignment1 extends Component {
    RenderButtonAndSound = () => {
        audio.onended=function()
        {
            count++;
            isPlaying = false;
            console.log(count);
        }
    return (
      <Button
        onClick={() => {
            if (count < 3) {
                if (! isPlaying) {
                    audio.play();
                    isPlaying = true;
                    console.log("playing");
                }
            }
            if (count === 2){
              alert("You can only play this sound one more time")
            }
            if (count === 3){
              alert("You have maxed out your attempts to play this sound")
            }      
        }
        }
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--medium"
      >Play Sound</Button>
    ) 
  }
  render() {
    if (!count) {
      count = 0;
    }

    return (
      <div className="Assignment1">
        {/* <header>
        <img id="img1" className="center-fit" src={headerImg} alt="Header"/>
        </header> */}
        <h2>Assignment 1</h2>
        <div className="Instruction">
          <h2><u>Instruction:</u>  Click the "Play Sound" button to hear the music. 
          You will only be able to play the sound 3 times. After listening to the music, 
          place the hotspots over each note error. There are 3 differnt types of error:
          Pitch Error (Red), Rhythm Error (Green), and Intonation Error (Purple). 
          <br></br>
          <br></br>
          <u>How to place the hotspot?</u>
          <br></br>
          <br></br>
          1. Click the error button
          <br></br>
          2. Place the hotspot on the note error
          <br></br>
          3. Click the error button again.</h2>
        </div>
        {this.RenderButtonAndSound()}

        <Button
          onClick={() => {
            history.push('/');
            history.go();
          }
          }
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--medium"
        >Go Back to Assignments</Button>
        <Button
        onClick={() => {
          hotspotCountP++;
          document.getElementById('shapeP').style.display = "block";
          let clone = document.querySelector('#shapeP').cloneNode(true);
          clone.setAttribute('id', 'shapeP'+hotspotCountP.toString());
          document.querySelector('div').appendChild( clone );
        }
        }
        type="button"
        buttonStyle="btn--pitch--solid"
        buttonSize="btn--medium"
        >Add Pitch Error</Button>
        <Button
        onClick={() => {
          hotspotCountR++;
          document.getElementById('shapeR').style.display = "block";
          let clone = document.querySelector('#shapeR').cloneNode(true);
          clone.setAttribute('id', 'shapeR'+hotspotCountR.toString());
          document.querySelector('div').appendChild( clone );
        }
        }
        type="button"
        buttonStyle="btn--rhythm--solid"
        buttonSize="btn--medium"
        >Add Rhythm Error</Button>
        <Button
        onClick={() => {
          hotspotCountI++;
          document.getElementById('shapeI').style.display = "block";
          let clone = document.querySelector('#shapeI').cloneNode(true);
          clone.setAttribute('id', 'shapeI'+hotspotCountI.toString());
          document.querySelector('div').appendChild( clone );
        }
        }
        type="button"
        buttonStyle="btn--intonation--solid"
        buttonSize="btn--medium"
        >Add Intonation Error</Button>
        <br></br>
        <img id="img1" className="center-fit" style={imageStyle1} src={example1} alt="Assignment 1"/>
        <img id="img1ans" className="center-fit" style={imageStyle2} src={example1Ans} alt="Assignment 1"/>
        <br></br>
        <Button id = 'submit'
          onClick={() => {
            document.getElementById('img1').style.display = "none";
            document.getElementById('img1ans').style.display = "block";
          }
          }
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--medium"
        >Submit</Button>     

        
      </div>
    );
  }
}

export default withRouter(Assignment1);
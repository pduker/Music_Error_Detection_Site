import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../music_example/Example1.m4a";
import example4 from "./../music_example/Example1Display.png";
import example4Ans from "./../music_example/Example1Answer.png";
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

class Assignment4 extends Component {
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
      <div className="Assignment4">
        <h2>Assignment 4</h2>
        <div className="Instruction">
          <h2><u>Instruction:</u>  Click the "Play Sound" button to hear the music. 
          You will only be able to play the sound 3 times. After listening to the music, 
          place the hotspots over each note error. There are 3 differnt types of error:
          Pitch Error (Purple), Rhythm Error (Red), and Intonation Error (Green). 
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
      <img id="img4" className="center-fit" style={imageStyle1} src={example4} alt="Assignment 4"/>
        <img id="img4ans" className="center-fit" style={imageStyle2} src={example4Ans} alt="Assignment 4"/>
        <br></br>
        <Button
          onClick={() => {
            history.push('/');
            history.go();
          }
          }
          type="button"
          buttonStyle="btn--primary--solid-go-back"
          buttonSize="btn--medium"
        >Back</Button>

        <Button id = 'submit'
          onClick={() => {
            document.getElementById('img4').style.display = "none";
            document.getElementById('img4ans').style.display = "block";
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

export default withRouter(Assignment4);
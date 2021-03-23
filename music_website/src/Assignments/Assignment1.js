import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../music_example/Example1.m4a";
import example1 from "./../music_example/example1.jpg";
var count;
var isPlaying = false;
var audio = new Audio(Tmp);
var hotspotCountP = 1;
var hotspotCountR = 1;
var hotspotCountI = 1;

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
            if (count === 3){
              alert("You have maxed out your attempts to play this sound")
            }
        }
        }
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--large"
      >Play Sound</Button>
    )
  }
  render() {
    if (!count) {
      count = 0;
    }

    return (
      <div className="Assignment1">
        <h2>Assignment 1</h2>
        {this.RenderButtonAndSound()}
        <Button
          onClick={() => {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                console.log("paused");
            } 
          }
          }
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--large"
        >Pause Sound</Button>
        <Button
          onClick={() => {
            history.push('/');
            history.go();
          }
          }
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--large"
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
        buttonSize="btn--large"
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
        buttonSize="btn--large"
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
        buttonSize="btn--large"
        >Add Intonation Error</Button>
        <br></br>
        <img class="center-fit" src={example1} alt="Assignment 1"/>
      </div>
    );
  }
}

export default withRouter(Assignment1);
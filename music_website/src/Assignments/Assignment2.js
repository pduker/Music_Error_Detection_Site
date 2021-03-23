import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../music_example/Example2wErr.m4a";
import example2 from "./../music_example/example2.jpg";
var count;
var isPlaying = false;
var audio = new Audio(Tmp);
var hotspotCount = 1;

class Assignment2 extends Component {
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
      <div className="Assignment2">
        <h2>Assignment 2</h2>
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
        <Button className="hotspot"
        onClick={() => {
          hotspotCount++;
          document.getElementById('shape').style.display = "block";
          let clone = document.querySelector('#shape').cloneNode(true);
          clone.setAttribute('id', 'shape'+hotspotCount.toString());
          document.querySelector('div').appendChild( clone );
        }
        }
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--large"
      >Add Shape</Button>
        <img src={example2} alt="Assignment 2" width="1200" height="400"/>
      </div>
    );
  }
}

export default withRouter(Assignment2);
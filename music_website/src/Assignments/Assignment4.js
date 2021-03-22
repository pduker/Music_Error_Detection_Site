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
      <div className="Assignment4">
        <h2>Assignment 4</h2>
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
        <img src={example1} alt="Assignment 4" />
      </div>
    );
  }
}

export default withRouter(Assignment4);
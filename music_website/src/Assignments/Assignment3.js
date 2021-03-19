import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";
import {Howl, Howler} from 'howler';
import Tmp from "./../Audio/tmp.mp3";
var count;

class Assignment3 extends Component {
  SoundPlay = (src) => {
    const sound = new Howl({
      src
    })
    sound.play();
  }
  RenderButtonAndSound = () => {
    return(
        <Button 
            onClick={() => {
              if (count < 3){
                  this.SoundPlay(Tmp);
              }
              count++;
            }
            }
            type = "button"
            buttonStyle = "btn--primary--solid"
            buttonSize = "btn--large"
            >Play Sound
        </Button>
    )
  }   
  render() {
    Howler.volume(1.0)
    if (! count){
      count = 0;
    }
    return (
        <div className="Assignment3">
            <h2>Assignment 3</h2>
        {this.RenderButtonAndSound()}
        <Button
          onClick={()=> {
            history.push('/');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Go Back to Assignments</Button>
      </div>
    );
  }
}

export default withRouter(Assignment3);
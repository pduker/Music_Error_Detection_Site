import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";
import { Howl, Howler } from 'howler';
import Tmp from "./../music_example/Example1.m4a";
import example1 from "./../music_example/example1.jpg";
var count;

class Assignment1 extends Component {
  SoundPlay = (src) => {
    const sound = new Howl({
      src
    })
    sound.play();
  }
  RenderButtonAndSound = () => {
    return (
      <Button
        onClick={() => {
          if (count < 3) {
            this.SoundPlay(Tmp);
          }
          count++;
        }
        }
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--large"
      >Play Sound: 
                </Button>
    )
  }
  render() {
    Howler.volume(1.0)
    if (!count) {
      count = 0;
    }

    return (
      <div className="Assignment1">
        <h2>Assignment 1</h2>
        {this.RenderButtonAndSound()}
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
        <img src={example1} alt="Assignment 1" />
      </div>
    );
  }
}

export default withRouter(Assignment1);
import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/assignment.css";
import { withRouter } from "react-router-dom";
import ImageMapper from "react-img-mapper";
// import SheetMusic from "../Components/SheetMusic";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react'

import IMAGE_PATH from "../Resources/Images/L1Ex1Display.png";
import headerImg from "./../Resources/Images/Header.png";

class Example1 extends Component {
    render() {
        return (
            <div className="Example1">
                <h2>Level 1 - Example 1</h2>
                <div className="Instructions">
                    <h2>This assignment is used to help students recognize pitch, intonation, and rhythm errors.
                        <br></br>
                        <br></br>
                        Hovering over each note, you will notice a yellow circle appear. When clicking the circle, you will be able to switch between purple, orange, and yellow colors. Each color is represented below:
                        <br></br>
                        1. Pitch errors - purple
                        <br></br>
                        2. Intonation errors - orange
                        <br></br>
                        3. No error - yellow
                        <br></br>
                        <br></br>
                        Also, when hovering above some notes you will see a yellow rectangle appear. This rectangle is used to help recognize where rhythm errors are located. Each color in the rectangle is represented below:
                        <br></br>
                        1. Rhythm errors - red
                        <br></br>
                        2. No error - yellow
                        <br></br>
                        <br></br>
                        You may click the “Play Sound” button to hear the music from the blank sheet below. You will only be able to play the music a maximum of 3 times, so listen carefully.
                        If you would like to start fresh before submitting, you can press the “Reset” button to clear the errors from the sheet music.
                        <br></br>
                        <br></br>
                        Once you are satisfied with your work, you can press the “Submit” button. At the bottom of the screen you will see how many errors you identified correctly. Each error that is not identified correctly will return a light blue circle. Try to identify the correct error again.</h2>
                </div>
            </div>
        );
    }
}


export default withRouter(Example1);
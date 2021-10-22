import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../Resources/Audio/Example1.m4a";
import example5 from "./../Resources/Images/Example1Display.png";
import example5Ans from "./../Resources/Images/Example1Answer.png";

import ImageMapper from "react-img-mapper";
import URL from "../Resources/Images/assignment-debug.jpg";
import mapJSON from "../Resources/JSON/debug.json";

var count;
var isPlaying = false;
var audio = new Audio(Tmp);
var hotspotCountP = 1;
var hotspotCountR = 1;
var hotspotCountI = 1;
let buttVal = "";

const imageStyle1 = {
    display: 'block'
};

const imageStyle2 = {
    display: 'none'
};

const IMAGE_MAP = {
    name: 'debug-map',
    areas: mapJSON
};

class Debug extends Component {
    RenderButtonAndSound = () => {
        audio.onended = function () {
            count++;
            isPlaying = false;
            console.log(count);
        }
        return (
            <Button
                onClick={() => {
                    if (count < 3) {
                        if (!isPlaying) {
                            audio.play();
                            isPlaying = true;
                            console.log("playing");
                        }
                    }
                    if (count === 2) {
                        alert("You can only play this sound one more time")
                    }
                    if (count === 3) {
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

    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };

        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });

        document.getElementById("x-coordinate").innerText = `CURRENT X COORDINATE IS ${coords.x}`;
        document.getElementById("y-coordinate").innerText = `CURRENT Y COORDINATE IS ${coords.y}`;
        document.getElementById("coordinate-json").innerText = `COORDINATE JSON IS "coords": [${coords.x},${coords.y},20]`;
    }

    render() {
        if (!count) {
            count = 0;
        }

        return (
            <div className="Debug">
                <h2>Debug</h2>
                <div className="Instructions">
                    <h2><u>Instructions:</u>  Click the "Play Sound" button to hear the music.
                        You will only be able to play the sound 3 times. After listening to the music,
                        place the hotspots over each note error. There are 3 different types of error:
                        Pitch Error (Purple), Rhythm Error (Red), and Intonation Error (Green).
                        <br></br>
                        <br></br>
                        <u>How to place the hotspot?</u>
                        <br></br>
                        1. Click the error button
                        <br></br>
                        2. Place the hotspot on the note error
                        <br></br>
                        3. Click the error button again.
                        <br></br>
                        4. If you want to add more errors, click on the note to place hotspot and click the error button.
                        <br></br>
                        5. After you are done, click the submit button to check your answer</h2>
                </div>
                {this.RenderButtonAndSound()}

                <Button
                    onClick={() => {
                        hotspotCountP++;

                        document.getElementById('shapeP').style.display = "block";

                        if (buttVal === "R") {
                            document.getElementById('shapeR').style.display = "none";
                        }
                        else if (buttVal === "I") {
                            document.getElementById('shapeI').style.display = "none";
                        }
                        else {
                            let clone = document.querySelector('#shapeP').cloneNode(true);
                            clone.setAttribute('id', 'shapeP' + hotspotCountP.toString());
                            document.querySelector('div').appendChild(clone);

                        }
                        buttVal = "P";
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

                        if (buttVal === "P") {
                            document.getElementById('shapeP').style.display = "none";
                        }

                        else if (buttVal === "I") {
                            document.getElementById('shapeI').style.display = "none";
                        }

                        else {
                            let clone = document.querySelector('#shapeR').cloneNode(true);
                            clone.setAttribute('id', 'shapeR' + hotspotCountR.toString());
                            document.querySelector('div').appendChild(clone);
                        }

                        buttVal = "R";
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

                        if (buttVal === "R") {
                            document.getElementById('shapeR').style.display = "none";
                        }

                        else if (buttVal === "P") {
                            document.getElementById('shapeP').style.display = "none";
                        }

                        else {
                            let clone = document.querySelector('#shapeI').cloneNode(true);
                            clone.setAttribute('id', 'shapeI' + hotspotCountI.toString());
                            document.querySelector('div').appendChild(clone);
                        }

                        buttVal = "I";
                    }
                    }
                    type="button"
                    buttonStyle="btn--intonation--solid"
                    buttonSize="btn--medium"
                >Add Intonation Error</Button>
                <br></br>

                {/* <img id="img5" className="center-fit" style={imageStyle1} src={example5} alt="Debug" /> */}

                <br></br>

                <div>
                    <p>Color Coding Key</p>
                    <p>Pitch errors are represented by RED, Hex is #fc110080 (80 means 50% transparency)</p>
                    <p>Rhythm errors are represented by BLUE, Hex is #1500fc80 (80 means 50% transparency)</p>
                    <p>Intonation errors are represented by GREEN, Hex is #00fc4380 (80 means 50% transparency)</p>
                </div>

                <br></br>

                <div id="debug-information">
                    DEBUG INFORMATION
                </div>

                <div id="x-coordinate">
                    CURRENT X COORDINATE IS: UNKNOWN
                </div>

                <div id="y-coordinate">
                    CURRENT Y COORDINATE IS: UNKNOWN
                </div>

                <div id="coordinate-json">
                    COORDINATE JSON: UNKNOWN
                </div>

                <br></br>

                <div className="image-mapper-div">
                    <ImageMapper
                        src={URL}
                        map={IMAGE_MAP}
                        onImageMouseMove={evt => this.moveOnImage(evt)}
                    />
                </div>

                <img id="img5ans" className="center-fit" style={imageStyle2} src={example5Ans} alt="Debug" />
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

                <Button id='reset'
                    onClick={() => {
                        window.location.reload(false);
                    }
                    }
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium"
                >Reset</Button>

                <Button id='submit'
                    onClick={() => {
                        document.getElementById('img5').style.display = "none";
                        document.getElementById('img5ans').style.display = "block";
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

export default withRouter(Debug);
import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../Resources/Audio/Example1.m4a";
import ImageMapper from "react-img-mapper";
import IMAGE_PATH from "../Resources/Images/assignment-debug.jpg";
import mapJSON from "../Resources/JSON/debug.json";
import { v4 as uuidv4 } from 'uuid';

var count;
var isPlaying = false;
var audio = new Audio(Tmp);

var IMAGE_MAP = {
    name: 'debug-map',
    areas: mapJSON
};

// The 80 at the end of a hex value means 50% transparency
const COLOR_NO_ERROR = "#e3fc0080";
const COLOR_PITCH_ERROR = "#9013fe80";
const COLOR_RHYTHM_ERROR = "#d0021b80";
const COLOR_INTONATION_ERROR = "#78e60080";
// The color used for transparency
const COLOR_TRANSPARENT = "#ffffff00";
// The color used for incorrect answers
const COLOR_INCORRECT = "#0eebb980";

const MAX_PLAY_COUNT = 3;

class Debug extends Component {
    constructor() {
        super();
        this.state = {
            coordinates: [0, 0],
            selectedArea: { "id": "0", "isError": false, "errorType": "noError" },
            imageWidth: 0,
            windowWidth: window.innerWidth,
            jsonGeneratorSelection: "noError",
            toggle: true,
            theMap: IMAGE_MAP
        };

        window.addEventListener("resize", this.updateWindowWidth);
    }

    /**
     * Updates the windowWidth state to the current window width
     */
    updateWindowWidth = () => {
        this.setState({ windowWidth: window.innerWidth });
    };

    async componentDidMount() {
        this.setState({
            imageWidth: await this.getImageWidth(),
            theMap: IMAGE_MAP,
        });
    }

    RenderButtonAndSound = () => {
        audio.onended = function () {
            count++;
            isPlaying = false;
            console.log(count);
        };
        return (
            <Button
                onClick={() => {
                    if (count < MAX_PLAY_COUNT) {
                        if (!isPlaying) {
                            audio.play();
                            isPlaying = true;
                            console.log("playing");
                        }
                    }
                    if (count === MAX_PLAY_COUNT - 1) {
                        alert("You can only play this sound one more time");
                    }
                    if (count === MAX_PLAY_COUNT) {
                        alert("You have maxed out your attempts to play this sound");
                    }
                }
                }
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--medium"
            >Play Sound</Button>
        );
    };

    /**
     * Given a mouse event, this updates the stored coordinates to where the cursor is
     */
    updateCoordinates(evt) {
        this.setState({ coordinates: [evt.nativeEvent.layerX, evt.nativeEvent.layerY] });
    }

    /**
     * Given a mouse event, this updates the HTML and displays some information like the X and Y coordinates
     */
    updateCoordinateHtml(evt) {
        this.updateCoordinates(evt);
        const coordX = this.state.coordinates[0];
        const coordY = this.state.coordinates[1];

        document.getElementById("x-coordinate").innerText = `X coordinate is ${coordX}`;
        document.getElementById("y-coordinate").innerText = `Y coordinate is ${coordY}`;
        document.getElementById("coordinate-json").innerText = `Coordinate JSON is "coords": [${coordX},${coordY},20]`;
    }

    /**
     * This is triggered when the mouse is moved over the image (not a shape)
     */
    moveOnImage(evt) {
        this.updateCoordinateHtml(evt);
    }

    /**
     * This is triggered when the mouse is moved over a shape
     */
    moveOnArea(area, evt) {
        this.updateCoordinateHtml(evt);
        this.setState({ selectedArea: area });

        const areaId = this.state.selectedArea.id;
        const areasIsError = this.state.selectedArea.isError;
        const areaErrorType = this.state.selectedArea.errorType;

        document.getElementById("shape-id").innerText = `Shape info: ID=${areaId}, isError=${areasIsError}, errorType=${areaErrorType}`;
    }

    /**
     * This is triggered when a click occurs on the image (not a shape)
     */
    clickedOutside(evt) {
        this.updateCoordinates(evt);
        const newId = uuidv4();
        const coordX = this.state.coordinates[0];
        const coordY = this.state.coordinates[1];

        let isError = false;
        if (this.state.jsonGeneratorSelection != "noError") {
            isError = true;
        }
        let errorType = this.state.jsonGeneratorSelection;

        let generatedJson = `{`;
        generatedJson += `"id":"${newId}",`;
        generatedJson += `"isError":${isError},`;
        generatedJson += `"errorType":"${errorType}",`;
        generatedJson += `"shape":"circle",`;
        generatedJson += `"preFillColor":"${COLOR_NO_ERROR}",`;
        generatedJson += `"fillColor":"${COLOR_NO_ERROR}",`;
        generatedJson += `"strokeColor":"black",`;
        generatedJson += `"coords":[${coordX},${coordY},20]`;
        generatedJson += `}`;

        document.getElementById("generated-json").innerText = generatedJson;
    }

    /**
     * This is triggered when a shape is clicked
     */
    clicked(area) {
        for (const shape of IMAGE_MAP.areas) {
            if (shape.id == area.id) {
                if (area.fillColor == COLOR_PITCH_ERROR) {
                    shape.fillColor = COLOR_RHYTHM_ERROR;
                    shape.preFillColor = COLOR_RHYTHM_ERROR;
                } else if (area.fillColor == COLOR_RHYTHM_ERROR) {
                    shape.fillColor = COLOR_INTONATION_ERROR;
                    shape.preFillColor = COLOR_INTONATION_ERROR;
                } else if (area.fillColor == COLOR_INTONATION_ERROR) {
                    shape.fillColor = COLOR_NO_ERROR;
                    shape.preFillColor = COLOR_NO_ERROR;
                } else if (area.fillColor == COLOR_NO_ERROR) {
                    shape.fillColor = COLOR_PITCH_ERROR;
                    shape.preFillColor = COLOR_PITCH_ERROR;
                } else {
                    shape.fillColor = COLOR_NO_ERROR;
                    shape.preFillColor = COLOR_NO_ERROR;
                }
            }
        }

        this.refreshMapper();
    }

    /**
     * This gets the image's width and returns it
     */
    async getImageWidth() {
        var img = new Image();

        img.onload = async function () {
            return img.width;
        };

        img.src = IMAGE_PATH;
        return img.onload();
    }

    /**
     * This is a temporary fix to make React refresh the mapper
     */
    refreshMapper() {
        if (this.state.toggle === true) {
            this.setState({
                windowWidth: window.innerWidth + 1,
                toggle: false
            });
        } else {
            this.setState({
                windowWidth: window.innerWidth - 1,
                toggle: true
            });
        }
    }

    render() {
        if (!count) {
            count = 0;
        }

        return (
            <div id="assignment-debug" className="assignment">
                <h2>Debug</h2>
                <div className="Instructions">
                    <h2>Instructions:  Click the "Play Sound" button to hear the music.
                        You will only be able to play the sound 3 times. After listening to the music,
                        place the hotspots over each note error. There are 3 different types of errors:
                        Pitch Error (Red), Rhythm Error (Blue), and Intonation Error (Green).
                        <br></br>
                        <br></br>
                        How to select the errors:
                        <br></br>
                        1. todo
                        <br></br>
                        2. todo
                        <br></br>
                        3. todo
                        <br></br>
                        4. todo
                        <br></br>
                        5. todo</h2>
                </div>

                {this.RenderButtonAndSound()}

                <Button
                    onClick={() => {
                        for (const shape of IMAGE_MAP.areas) {
                            // If the shape is transparent, make it visible
                            if (shape.preFillColor == COLOR_TRANSPARENT) {
                                shape.preFillColor = COLOR_NO_ERROR;
                                shape.strokeColor = "black";
                            }
                            // Otherwise make it transparent
                            else {
                                shape.preFillColor = COLOR_TRANSPARENT;
                                shape.strokeColor = COLOR_TRANSPARENT;
                            }
                        }

                        this.refreshMapper();
                    }
                    }
                    type="button"
                    buttonStyle="btn--primary--solid-go-back"
                    buttonSize="btn--medium"
                >Toggle Transparency</Button>

                <br></br>
                <br></br>

                <div>
                    <p>Color Coding Key</p>
                    <p>See the top of Debug.js for the color key</p>
                </div>

                <br></br>

                <div id="debug-information">
                    Debug Information
                </div>

                <div id="x-coordinate">
                    X coordinate is unknown
                </div>

                <div id="y-coordinate">
                    Y coordinate is unknown
                </div>

                <div id="coordinate-json">
                    Coordinate JSON is unknown
                </div>

                <div id="shape-id">
                    Shape info: unknown
                </div>

                <br></br>

                <div id="instructions">
                    New Instructions
                    <li>test</li>
                    <li>test</li>
                </div>

                <br></br>

                <div id="image-mapper-div" className="image-mapper">
                    <ImageMapper
                        id="mapper-debug"
                        src={IMAGE_PATH}
                        map={this.state.theMap}
                        onImageMouseMove={evt => this.moveOnImage(evt)}
                        onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                        onImageClick={evt => this.clickedOutside(evt)}
                        onClick={area => this.clicked(area)}
                        stayMultiHighlighted={true}
                        width={this.state.windowWidth}
                        imgWidth={this.state.imageWidth}
                    />
                </div>

                <br></br>
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
                        if (window.confirm("Are you sure you want to reset?")) {
                            window.location.reload(false);
                        }
                    }
                    }
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium"
                >Reset</Button>

                <Button id='submit'
                    onClick={() => {
                        let pitchErrorsCorrect = 0;
                        let pitchErrorsMissed = 0;
                        let rhythmErrorsCorrect = 0;
                        let rhythmErrorsMissed = 0;
                        let intonationErrorsCorrect = 0;
                        let intonationErrorsMissed = 0;
                        let noErrorsCorrect = 0;
                        let noErrorsMissed = 0;

                        for (const shape of IMAGE_MAP.areas) {
                            // Check if the shape's fill color is correct
                            if (shape.errorType == "pitchError") {
                                if (shape.fillColor == COLOR_PITCH_ERROR) {
                                    pitchErrorsCorrect += 1;
                                } else {
                                    pitchErrorsMissed += 1;
                                    if (shape.fillColor != COLOR_NO_ERROR){
                                        shape.fillColor = COLOR_INCORRECT;
                                        shape.preFillColor = COLOR_INCORRECT;
                                    }
                                }
                            } else if (shape.errorType == "intonationError") {
                                if (shape.fillColor == COLOR_INTONATION_ERROR) {
                                    intonationErrorsCorrect += 1;
                                } else {
                                    intonationErrorsMissed += 1;
                                    if (shape.fillColor != COLOR_NO_ERROR){
                                        shape.fillColor = COLOR_INCORRECT;
                                        shape.preFillColor = COLOR_INCORRECT;
                                    }
                                }
                            } else if (shape.errorType == "rhythmError") {
                                if (shape.fillColor == COLOR_RHYTHM_ERROR) {
                                    rhythmErrorsCorrect += 1;
                                } else {
                                    rhythmErrorsMissed += 1;
                                    if (shape.fillColor != COLOR_NO_ERROR){
                                        shape.fillColor = COLOR_INCORRECT;
                                        shape.preFillColor = COLOR_INCORRECT;
                                    }
                                }
                            } else if (shape.errorType == "noError") {
                                if (shape.fillColor == COLOR_NO_ERROR) {
                                    noErrorsCorrect += 1;
                                    shape.preFillColor = COLOR_TRANSPARENT;
                                    shape.strokeColor = COLOR_TRANSPARENT;
                                } else {
                                    noErrorsMissed += 1;
                                    shape.fillColor = COLOR_INCORRECT;
                                    shape.preFillColor = COLOR_INCORRECT;
                                }
                            }

                            const totalCorrect = pitchErrorsCorrect + rhythmErrorsCorrect + intonationErrorsCorrect + noErrorsCorrect;
                            const totalMissed = pitchErrorsMissed + rhythmErrorsMissed + intonationErrorsMissed + noErrorsMissed;
                            const pitchErrors = pitchErrorsCorrect + pitchErrorsMissed;
                            const rythmErrors = rhythmErrorsCorrect + rhythmErrorsMissed;
                            const intonationErrors = intonationErrorsCorrect + intonationErrorsMissed;




                            let reportText =
                            `Here are the results:
                            Incorrect guesses are represented by the cyan circles
                            `;




                            if (totalMissed > 0){
                                reportText = reportText.concat(`You missed: \n`);
                                if (pitchErrorsMissed > 0){
                                    reportText = reportText.concat(`${pitchErrorsMissed} pitch error`);
                                    if (pitchErrorsMissed > 1){
                                        reportText = reportText.concat(`s`);
                                    }
                                    reportText = reportText.concat(`\n`);

                                }
                                if (rhythmErrorsMissed > 0){
                                    reportText = reportText.concat(`${rhythmErrorsMissed} rythm error`);
                                    if (rhythmErrorsMissed > 1){
                                        reportText = reportText.concat(`s`);
                                    }
                                    reportText = reportText.concat(`\n`);

                                }
                                if (intonationErrorsMissed > 0){
                                    reportText = reportText.concat(`${intonationErrorsMissed} intonation error`);
                                    if (intonationErrorsMissed > 1){
                                        reportText = reportText.concat(`s`);
                                    }
                                    reportText = reportText.concat(`\n`);

                                }

                            }
                            else{
                                reportText = reportText.concat(`You correctly identified all errors!\n`);
                            }
                            document.getElementById("results").innerText = reportText;

                        }
                        this.refreshMapper();
                    }

                    }
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium"
                >Submit</Button>

                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div id="results">
                    Results
                </div>

                <div className="radio-buttons-error-type" style={{ marginTop: 20 + 'px' }}>
                    <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "noError"} />No error
                    <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "pitchError"} />Pitch error
                    <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "rhythmError"} />Rhythm error
                    <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "intonationError"} />Intonation error
                </div>

                <br></br>

                <div id="generated-json" style={{ marginRight: 20 + 'px' }, { marginLeft: 20 + 'px' }}>
                    Copy the generated JSON below
                </div>
            </div>
        );
    }
}

export default withRouter(Debug);
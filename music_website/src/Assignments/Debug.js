import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../Resources/Audio/Example1.m4a";
import ImageMapper from "react-img-mapper";
// import SheetMusic from "../Components/SheetMusic";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react'

import IMAGE_PATH from "../Resources/Images/assignment-debug.jpg";
import mapJSON from "../Resources/JSON/debug.json";

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
const COLOR_INTONATION_ERROR = "#ffa50080";
// The color used for transparency
const COLOR_TRANSPARENT = "#ffffff00";
// The color used for incorrect answers
const COLOR_INCORRECT = "#0eebb980";

const MAX_PLAY_COUNT = 3;

var topLeftX = 0;
var topLeftY = 0;
var bottomRightX = 0;
var bottomRightY = 0;

// This indicates whether a temporary shape should be created on clicking the image
// Useful for creating an assignment
var previewEnabled = true;

class Debug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [0, 0],
            selectedArea: { "id": "0", "isError": false, "errorType": "noError" },
            imageWidth: 0,
            windowWidth: window.innerWidth,
            jsonGeneratorSelection: "noError",
            toggle: true,
            allCurrentErrors: mapJSON,
            theMap: IMAGE_MAP,
            rhythmSide: "topLeft"
        };
        // this.handleClickSheetMusic = this.handleClickSheetMusic.bind(this);

        /*
        This watches for when the window is resized and updates the
        windowWidth so the mapper gets set to the width of the window
        */
        window.addEventListener('resize', () => {
            console.log(`window resize detected, updating windowWidth to ${window.innerWidth}`);
            this.setState({ windowWidth: window.innerWidth });
        });
    }

    /**
     * Updates the windowWidth state to the current window width
     */
    updateWindowWidth = () => {
        this.setState({ windowWidth: window.innerWidth });
    };

    /**
     * Sets the initial state of the mapper and image width
     */
    async setInitialState() {
        console.log(`setInitialState running`);

        const imgData = await this.getImageWidthHeight();

        this.setState({
            imageWidth: imgData.width,
            theMap: IMAGE_MAP
            // theMap: this.state.allCurrentErrors
        });
    }

    /**
     * Runs on component mount
     */
    async componentDidMount() {
        console.log(`componentDidMount running`);

        this.setInitialState()
            .then(this.getImageWidthHeight()
                .then(data => document.getElementById("image-properties").innerText = `Image width = ${data.width}\nImage height = ${data.height}`))
            .finally(() => { this.refreshMapper(); this.refreshMapper(); });
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

        document.getElementById("x-coordinate").innerText = `X coordinate is ${coordX}\n`;
        document.getElementById("y-coordinate").innerText = `Y coordinate is ${coordY}\n`;
        document.getElementById("coordinate-json").innerText = `Coordinate JSON:\n"coords": [${coordX},${coordY},20]`;
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

        document.getElementById("shape-id").innerText = ``;
        document.getElementById("shape-id").innerText += `Shape info:\n`;
        document.getElementById("shape-id").innerText += `ID: ${areaId}\n`;
        document.getElementById("shape-id").innerText += `isError: ${areasIsError}\n`;
        document.getElementById("shape-id").innerText += `errorType: ${areaErrorType}\n\n`;
        document.getElementById("shape-id").innerText += `JSON:\n${JSON.stringify(this.state.selectedArea)}`;
    }

    /**
     * This adds a shape to the mapper temporarily so the user
     * can get a preview of where the shape will be placed
     */
    addShapeToMapper(shapeObject) {
        IMAGE_MAP.areas.push(shapeObject);
        this.refreshMapper();
    }

    /**
     * This removes the temporary shape with id "tmp"
     */
    removeShapeFromMapper() {
        // Remove "tmp"
        const removeIndex = IMAGE_MAP.areas.findIndex(item => item.id === "tmp");

        if (removeIndex != -1) {
            IMAGE_MAP.areas.splice(removeIndex, 1);
        }

        this.refreshMapper();
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
        if (this.state.jsonGeneratorSelection !== "noError") {
            isError = true;
        }
        let errorType = this.state.jsonGeneratorSelection;

        let newShape = "";
        let newCoords = "";

        if (this.state.jsonGeneratorSelection == "rhythmError") {
            console.log(`rhythm error selected`);

            if (this.state.rhythmSide == "topLeft") {
                console.log(`picked the top left side`);
                topLeftX = coordX;
                topLeftY = coordY;
                bottomRightX = topLeftX + 5;
                bottomRightY = topLeftY + 5;

                this.setState({ rhythmSide: "bottomRight" });
            }

            if (this.state.rhythmSide == "bottomRight") {
                console.log(`picked the bottom right side`);
                bottomRightX = coordX;
                //bottomRightY = topLeftY;
                bottomRightY = coordY;
                // topLeftY = topLeftY + 20;

                this.setState({ rhythmSide: "topLeft" });
            }

            console.log(`rhythmSide=${this.state.rhythmSide}`);

            newShape = `"shape":"rect",`;
            newCoords = `"coords":[${topLeftX},${topLeftY},${bottomRightX},${bottomRightY}]`;
        } else {
            console.log(`non rhythm error detected`);

            newShape = `"shape":"circle",`;
            newCoords = `"coords":[${coordX},${coordY},20]`;
        }

        let generatedJson = `{`;
        generatedJson += `"id":"${newId}",`;
        generatedJson += `"isError":${isError},`;
        generatedJson += `"errorType":"${errorType}",`;
        generatedJson += newShape;
        generatedJson += `"preFillColor":"${COLOR_TRANSPARENT}",`;
        generatedJson += `"fillColor":"${COLOR_NO_ERROR}",`;
        generatedJson += `"strokeColor":"${COLOR_TRANSPARENT}",`;
        generatedJson += newCoords;
        generatedJson += `}`;

        let shapeObject = JSON.parse(generatedJson);
        let formatted = JSON.stringify(shapeObject, null, 4);

        console.log(`shapeObject=${formatted}`);

        document.getElementById("generated-json").innerText = generatedJson;

        //testing stuff for adding errors onClick -- uncomment to use
        // let newErrors = this.state.allCurrentErrors;
        // let newError = {
        //     "id" : newId,
        //     "isError" : true,
        //     "errorType" : "pitchError",
        //     "shape" : "circle",
        //     "preFillColor" : COLOR_PITCH_ERROR,
        //     "fillColor" : COLOR_PITCH_ERROR,
        //     "strokeColor" : "black",
        //     "coords" : [coordX, coordY, 20],
        // }
        // newErrors.push(newError);
        // this.setState({ allCurrentErrors: newErrors });
        // this.refreshMapper();
        shapeObject.id = "tmp";
        shapeObject.preFillColor = "#F012BE";

        if (previewEnabled) {
            this.removeShapeFromMapper();
            this.addShapeToMapper(shapeObject);
        }
    }

    /**
     * This calculates the number of correct and incorrect selections
     * and displays it on the webpage
     */
    generateShapeInfo() {
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
                }
            } else if (shape.errorType == "intonationError") {
                if (shape.fillColor == COLOR_INTONATION_ERROR) {
                    intonationErrorsCorrect += 1;
                } else {
                    intonationErrorsMissed += 1;
                }
            } else if (shape.errorType == "rhythmError") {
                if (shape.fillColor == COLOR_RHYTHM_ERROR) {
                    rhythmErrorsCorrect += 1;
                } else {
                    rhythmErrorsMissed += 1;
                }
            } else if (shape.errorType == "noError") {
                if (shape.fillColor == COLOR_NO_ERROR) {
                    noErrorsCorrect += 1;
                } else {
                    noErrorsMissed += 1;
                }
            }

            const totalCorrect = pitchErrorsCorrect + rhythmErrorsCorrect + intonationErrorsCorrect + noErrorsCorrect;
            const totalMissed = pitchErrorsMissed + rhythmErrorsMissed + intonationErrorsMissed + noErrorsMissed;

            const reportText =
                `Shapes Debug Info
                There are ${IMAGE_MAP.areas.length} shapes
                pitchErrorsCorrect=${pitchErrorsCorrect}, pitchErrorsMissed=${pitchErrorsMissed}
                intonationErrorsCorrect=${intonationErrorsCorrect}, intonationErrorsMissed=${intonationErrorsMissed}
                rhythmErrorsCorrect=${rhythmErrorsCorrect}, rhythmErrorsMissed=${rhythmErrorsMissed}
                noErrorsCorrect=${noErrorsCorrect}, noErrorsMissed=${noErrorsMissed}
                totalCorrect=${totalCorrect}/${IMAGE_MAP.areas.length}\n totalMissed=${totalMissed}/${IMAGE_MAP.areas.length}
                `;

            document.getElementById("shapes-info").innerText = reportText;
        }
    }

    /**
     * This is triggered when a shape is clicked
     */
    clicked(area) {
        for (const shape of IMAGE_MAP.areas) {
            if (shape.errorType != "rhythmError") {
                if (shape.id === area.id) {
                    if (area.fillColor === COLOR_PITCH_ERROR) {
                        shape.fillColor = COLOR_INTONATION_ERROR;
                        shape.preFillColor = COLOR_INTONATION_ERROR;
                    } else if (area.fillColor === COLOR_INTONATION_ERROR) {
                        shape.fillColor = COLOR_NO_ERROR;
                        shape.preFillColor = COLOR_TRANSPARENT;
                    } else if (area.fillColor === COLOR_NO_ERROR) {
                        shape.fillColor = COLOR_PITCH_ERROR;
                        shape.preFillColor = COLOR_PITCH_ERROR;
                    } else {
                        shape.fillColor = COLOR_NO_ERROR;
                        shape.preFillColor = COLOR_TRANSPARENT;
                    }
                }
            }
            else {
                if (shape.id === area.id) {
                    if (area.fillColor === COLOR_NO_ERROR) {
                        shape.fillColor = COLOR_RHYTHM_ERROR;
                        shape.preFillColor = COLOR_RHYTHM_ERROR;
                    } else if (area.fillColor === COLOR_RHYTHM_ERROR) {
                        shape.fillColor = COLOR_NO_ERROR;
                        shape.preFillColor = COLOR_TRANSPARENT;
                    } else {
                        shape.fillColor = COLOR_NO_ERROR;
                        shape.preFillColor = COLOR_TRANSPARENT;
                    }
                }
            }
        }

        this.refreshMapper();
        this.generateShapeInfo();
    }

    /**
     * This gets the image's width and height and returns it
     */
    async getImageWidthHeight() {
        var img = new Image();

        img.onload = async function () {
            const data = { "width": img.width, "height": img.height };
            return data;
        };

        img.src = IMAGE_PATH;
        return img.onload();
    }

    // handleClickSheetMusic(){
    //     console.log("component has been clicked at coordinates: (", this.state.coords.x, ",", this.state.coords.y,")");
    //     let newAreas = this.state.imageMapAreas;
    //     let newError = {
    //         // "id": "azsexdcfvgbhawsexdrcvfgbhqwsedrf",
    //         "isError": true,
    //         "errorType": "pitchError",
    //         "shape": "circle",
    //         "preFillColor": "#e3fc0080",
    //         "fillColor": "#e3fc0080",
    //         "strokeColor": "black",
    //         "coords": [
    //             this.state.coords.x,
    //             this.state.coords.y,
    //             20
    //         ]
    //     };
    //     newAreas.push(newError);
    //     this.setState({ imageMapAreas: newAreas });
    // }

    /**
     * This is a temporary fix to make React refresh the mapper
     */
    // a potential fix to this would be to use componentDidUpdate() for changing things immediately
    refreshMapper() {
        if (this.state.toggle === true) {
            this.setState({
                imageWidth: window.imageWidth + 1,
                toggle: false
            });
        } else {
            this.setState({
                imageWidth: window.imageWidth - 1,
                toggle: true
            });
        }
    }

    render() {
        if (!count) {
            count = 0;
        }

        return (
            <div id="assignment-debug" className="assignment" >
                <h2>Debug</h2>
                <div className="Instructions">
                    <h2>This assignment is used to help students recognize pitch, intonation, and rhythm errors.
                        <br></br>
                        <br></br>
                        Hovering over each note, you will notice a yellow circle appear. The circles are used to help recognize where pitch and intonation errors are located. When clicking the circle, you will be able to switch between purple, orange, and transparent. Each color is represented below:
                        <br></br>
                        1. Pitch errors - purple
                        <br></br>
                        2. Intonation errors - orange
                        <br></br>
                        3. No error - transparent
                        <br></br>
                        <br></br>
                        Also, when hovering above some notes you will see a yellow rectangle appear. The rectangles are used to help recognize where rhythm errors are located. When clicking the rectangle, you will be able to switch between red and transparent. Each color is represented below:
                        <br></br>
                        1. Rhythm errors - red
                        <br></br>
                        2. No error - transparent
                        <br></br>
                        <br></br>
                        You may click the “Play Sound” button to hear the music from the blank sheet below. You will only be able to play the music a maximum of 3 times, so listen carefully.
                        If you would like to start fresh before submitting, you can press the “Reset” button to clear the errors from the sheet music.
                        <br></br>
                        <br></br>
                        Once you are satisfied with your work, you can press the “Submit” button. At the bottom of the screen you will see how many errors you identified correctly. Each error that is not identified correctly will return a light blue circle. Try to identify the correct error again.</h2>
                </div>

                {this.RenderButtonAndSound()}

                <br></br>
                <br></br>

                <Button
                    onClick={() => {
                        for (const shape of this.state.allCurrentErrors) {
                            // If the shape is transparent, make it visible
                            if (shape.preFillColor === COLOR_TRANSPARENT) {
                                shape.preFillColor = COLOR_NO_ERROR;
                            }
                            // Otherwise make it transparent
                            else {
                                shape.preFillColor = COLOR_TRANSPARENT;
                            }
                        }

                        this.refreshMapper();
                    }
                    }
                    type="button"
                    buttonStyle="btn--primary--solid-go-back"
                    buttonSize="btn--medium"
                >Toggle Transparency</Button>

                <Button
                    onClick={() => this.refreshMapper()}
                    type="button"
                    buttonStyle="btn--primary--solid-go-back"
                    buttonSize="btn--medium"
                >Refresh Mapper</Button>

                {/* <Button
                    onClick={() => this.setInitialState()}
                    type="button"
                    buttonStyle="btn--primary--solid-go-back"
                    buttonSize="btn--medium"
                >Set State Test</Button> */}

                <br></br>
                <br></br>

                <Button
                    onClick={() => {
                        console.log(`toggle preview pressed`);
                        previewEnabled = !previewEnabled;
                        console.log(`previewEnabled=${previewEnabled}`);
                    }}
                    type="button"
                    buttonStyle="btn--primary--solid-go-back"
                    buttonSize="btn--medium"
                >Toggle Preview</Button>

                <Button
                    onClick={() => {
                        this.removeShapeFromMapper();
                    }}
                    type="button"
                    buttonStyle="btn--primary--solid-go-back"
                    buttonSize="btn--medium"
                >Remove Preview Shape</Button>

                <br></br>
                <br></br>

                <div>
                    <p>See the top of Debug.js for the color coding key</p>
                </div>

                <br></br>

                <div id="debug-information">
                    Debug Information
                </div>

                <br></br>

                <div id="image-properties">
                    ...
                </div>

                <br></br>

                <div id="x-coordinate">
                    X coordinate is unknown
                </div>

                <div id="y-coordinate">
                    Y coordinate is unknown
                </div>

                <br></br>

                <div id="coordinate-json">
                    Coordinate JSON is unknown
                </div>

                <br></br>

                <div id="shape-id">
                    Shape info: unknown
                </div>

                <br></br>
                <br></br>

                {/* <SheetMusic onInsideClick={this.handleClickSheetMusic}> */}
                {/* <SheetMusic> */}
                <div id="mapper-container" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <ImageMapper
                        id="mapper-debug"
                        src={IMAGE_PATH}
                        map={this.state.theMap}
                        onImageMouseMove={evt => this.moveOnImage(evt)}
                        onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                        onImageClick={evt => this.clickedOutside(evt)}
                        onClick={area => this.clicked(area)}
                        stayMultiHighlighted={true}
                        width={this.state.imageWidth}
                        imgWidth={this.state.imageWidth}
                    />
                </div>

                {/* </SheetMusic> */}

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
                        /*
                        This generates a summary of correct/incorrect selections for the user
                        */

                        let pitchErrorsCorrect = 0;
                        let pitchErrorsMissed = 0;
                        let rhythmErrorsCorrect = 0;
                        let rhythmErrorsMissed = 0;
                        let intonationErrorsCorrect = 0;
                        let intonationErrorsMissed = 0;
                        let noErrorsCorrect = 0;
                        let noErrorsMissed = 0;

                        for (const shape of this.state.allCurrentErrors) {
                            // Check if the shape's fill color is correct
                            if (shape.errorType === "pitchError") {
                                if (shape.fillColor === COLOR_PITCH_ERROR) {
                                    pitchErrorsCorrect += 1;
                                } else {
                                    pitchErrorsMissed += 1;
                                    if (shape.fillColor != COLOR_NO_ERROR) {
                                        shape.fillColor = COLOR_INCORRECT;
                                        shape.preFillColor = COLOR_INCORRECT;
                                    }
                                }
                            } else if (shape.errorType === "intonationError") {
                                if (shape.fillColor === COLOR_INTONATION_ERROR) {
                                    intonationErrorsCorrect += 1;
                                } else {
                                    intonationErrorsMissed += 1;
                                    if (shape.fillColor != COLOR_NO_ERROR) {
                                        shape.fillColor = COLOR_INCORRECT;
                                        shape.preFillColor = COLOR_INCORRECT;
                                    }
                                }
                            } else if (shape.errorType === "rhythmError") {
                                if (shape.fillColor === COLOR_RHYTHM_ERROR) {
                                    rhythmErrorsCorrect += 1;
                                } else {
                                    rhythmErrorsMissed += 1;
                                    if (shape.fillColor != COLOR_NO_ERROR) {
                                        shape.fillColor = COLOR_INCORRECT;
                                        shape.preFillColor = COLOR_INCORRECT;
                                    }
                                }
                            } else if (shape.errorType === "noError") {
                                if (shape.fillColor === COLOR_NO_ERROR) {
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

                            if (totalMissed > 0) {
                                reportText = reportText.concat(`You missed: \n`);
                                if (pitchErrorsMissed > 0) {
                                    reportText = reportText.concat(`${pitchErrorsMissed} pitch error`);
                                    if (pitchErrorsMissed > 1) {
                                        reportText = reportText.concat(`s`);
                                    }
                                    reportText = reportText.concat(`\n`);

                                }
                                if (rhythmErrorsMissed > 0) {
                                    reportText = reportText.concat(`${rhythmErrorsMissed} rhythm error`);
                                    if (rhythmErrorsMissed > 1) {
                                        reportText = reportText.concat(`s`);
                                    }
                                    reportText = reportText.concat(`\n`);

                                }
                                if (intonationErrorsMissed > 0) {
                                    reportText = reportText.concat(`${intonationErrorsMissed} intonation error`);
                                    if (intonationErrorsMissed > 1) {
                                        reportText = reportText.concat(`s`);
                                    }
                                    reportText = reportText.concat(`\n`);

                                }

                            }
                            else {
                                reportText = reportText.concat(`You correctly identified all errors!\n`);
                            }
                            document.getElementById("results").innerText = reportText;

                        }
                        this.refreshMapper();
                    }

                    }
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium" f
                >Submit</Button>

                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div id="results">
                    Results
                </div>

                <br></br>

                <p>
                    Use the below buttons and information to create an assignment
                    <br></br>
                    If the preview shape isn't enabled. you will likely want to click the "Toggle Preview" button at the top of this page
                    <br></br>
                    When adding a rhythm error, click on the area where you want the TOP LEFT of the rectangle to be.
                    <br></br>
                    Then, click on the area where you want the BOTTOM RIGHT of the rectangle to be.
                </p>

                <br></br>

                <div className="radio-buttons-error-type">
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({ jsonGeneratorSelection: "noError" })} />No error
                    <br></br>
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({ jsonGeneratorSelection: "pitchError" })} />Pitch error
                    <br></br>
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({ jsonGeneratorSelection: "intonationError" })} />Intonation error
                    <br></br>
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({ jsonGeneratorSelection: "rhythmError" })} />Rhythm error

                    {/* <input type="radio" name="clickType" value="" onClick={() => this.setState({jsonGeneratorSelection: "rhythmError"})} />Rhythm error */}
                    {/* <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "noError"} />No error */}
                    {/* <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "pitchError"} />Pitch error */}
                    {/* <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "rhythmError"} />Rhythm error */}
                    {/* <input type="radio" name="clickType" value="" onClick={() => this.state.jsonGeneratorSelection = "intonationError"} />Intonation error */}
                </div>

                <br></br>

                <div id="generated-json" style={{ marginRight: 20 + 'px', marginLeft: 20 + 'px' }}>
                    Copy the generated JSON below
                </div>

                <br></br>
                <br></br>

                <div id="shapes-info" style={{ marginTop: 30 + 'px', marginRight: 20 + 'px', marginLeft: 20 + 'px' }}>
                    Shapes Info
                </div>
            </div >
        );
    }
}

export default withRouter(Debug);

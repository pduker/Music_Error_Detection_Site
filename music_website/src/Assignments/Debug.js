import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../Resources/Audio/Example1.m4a";
import ImageMapper from "react-img-mapper";
import URL from "../Resources/Images/assignment-debug.jpg";
import mapJSON from "../Resources/JSON/debug.json";
import SheetMusic from "../Components/SheetMusic";
import { v4 as uuidv4 } from 'uuid';

var count;
var isPlaying = false;
var audio = new Audio(Tmp);

var IMAGE_MAP = {
    name: 'debug-map',
    areas: mapJSON
};

// The color for no error is yellow
const COLOR_NO_ERROR = "#e3fc0080";
// The color for a pitch error is red
const COLOR_PITCH_ERROR = "#fc110080";
// The color for a rhythm  error is red
const COLOR_RHYTHM_ERROR = "#1500fc80";
// The color for an intonation  error is green
const COLOR_INTONATION_ERROR = "#00fc4380";

// The color used for transparency
const COLOR_TRANSPARENT = "#e3fc0000";

class Debug extends Component {

    constructor(props){
        super(props);
        this.state = {
            coordinates: [0, 0],
            selectedArea: { "id": "0", "isError": false, "errorType": "noError" },
            imageWidth: 0,
            windowWidth: window.innerWidth,
            jsonGeneratorSelection: "noError",
            toggle: true
        };
        this.handleClickSheetMusic = this.handleClickSheetMusic.bind(this);
    }

    async componentDidMount() {
        this.setState({
            imageWidth: await this.getImageWidth(),
            theMap: IMAGE_MAP.areas
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
        );
    };

    // moveOnImage(evt) {
    //     const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    //     this.setState({
    //         coords: coords
    //     });
    // }
    updateCoordinates(evt) {
        this.setState({ coordinates: [evt.nativeEvent.layerX, evt.nativeEvent.layerY] });
    }

    updateCoordinateHtml(evt) {
        this.updateCoordinates(evt);
        const coordX = this.state.coordinates[0];
        const coordY = this.state.coordinates[1];

        document.getElementById("x-coordinate").innerText = `X coordinate is ${coordX}`;
        document.getElementById("y-coordinate").innerText = `Y coordinate is ${coordY}`;
        document.getElementById("coordinate-json").innerText = `Coordinate JSON is "coords": [${coordX},${coordY},20]`;
    }

    moveOnImage(evt) {
        this.updateCoordinateHtml(evt);
    }

    moveOnArea(area, evt) {
        this.updateCoordinateHtml(evt);
        this.setState({ selectedArea: area });

        const areaId = this.state.selectedArea.id;
        const areasIsError = this.state.selectedArea.isError;
        const areaErrorType = this.state.selectedArea.errorType;

        document.getElementById("shape-id").innerText = `Shape info: ID=${areaId}, isError=${areasIsError}, errorType=${areaErrorType}`;
    }

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

    async getImageWidth() {
        var img = new Image();

        img.onload = async function () {
            return img.width;
        };

        img.src = URL;
        return img.onload();
    }

    handleClickSheetMusic(){
        console.log("component has been clicked at coordinates: (", this.state.coords.x, ",", this.state.coords.y,")");
        let newAreas = this.state.imageMapAreas;
        let newError = {
            // "id": "azsexdcfvgbhawsexdrcvfgbhqwsedrf",
            "isError": true,
            "errorType": "pitchError",
            "shape": "circle",
            "preFillColor": "#e3fc0080",
            "fillColor": "#e3fc0080",
            "strokeColor": "black",
            "coords": [
                this.state.coords.x,
                this.state.coords.y,
                20
            ]
        };
        newAreas.push(newError);
        this.setState({ imageMapAreas: newAreas });
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
                    <p>Pitch errors are represented by RED, Hex is #fc110080 (80 means 50% transparency)</p>
                    <p>Rhythm errors are represented by BLUE, Hex is #1500fc80 (80 means 50% transparency)</p>
                    <p>Intonation errors are represented by GREEN, Hex is #00fc4380 (80 means 50% transparency)</p>
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

                {/* <SheetMusic onInsideClick={this.handleClickSheetMusic}> */}
                <SheetMusic>
                    <ImageMapper
                        id="mapper-debug"
                        src={URL}
                        map={IMAGE_MAP}
                        onImageMouseMove={evt => this.moveOnImage(evt)}
                        onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                        onImageClick={evt => this.clickedOutside(evt)}
                        onClick={area => this.clicked(area)}
                        stayMultiHighlighted={true}
                        width={this.state.windowWidth}
                        imgWidth={this.state.imageWidth}
                    />
                </SheetMusic>
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
                            `Here are the results:
                            There are ${IMAGE_MAP.areas.length} shapes
                            pitchErrorsCorrect=${pitchErrorsCorrect}, pitchErrorsMissed=${pitchErrorsMissed}
                            intonationErrorsCorrect=${intonationErrorsCorrect}, intonationErrorsMissed=${intonationErrorsMissed}
                            rhythmErrorsCorrect=${rhythmErrorsCorrect}, rhythmErrorsMissed=${rhythmErrorsMissed}
                            noErrorsCorrect=${noErrorsCorrect}, noErrorsMissed=${noErrorsMissed}
                            totalCorrect=${totalCorrect}/${IMAGE_MAP.areas.length}\n totalMissed=${totalMissed}/${IMAGE_MAP.areas.length}
                            `;

                            document.getElementById("results").innerText = reportText;
                        }
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
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({jsonGeneratorSelection: "noError"})} />No error
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({jsonGeneratorSelection: "pitchError"})} />Pitch error
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({jsonGeneratorSelection: "rythmError"})} />Rythm error
                    <input type="radio" name="clickType" value="" onClick={() => this.setState({jsonGeneratorSelection: "intonationError"})} />Intonation error
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
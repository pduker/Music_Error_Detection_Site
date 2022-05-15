import IMAGE_PATH from "../Exercises/Debug/display2.png";
import SHAPE_JSON from "../Exercises/Debug/shapes.json";
import AUDIO_FILE from "../Exercises/Debug/sound.mp3";

import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/exercise.css";
import { withRouter } from "react-router-dom";
import ImageMapper from "react-img-mapper";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";

import * as Constants from "../Components/Constants";

import { LEVEL_DATA } from "../Exercises/LevelData";

var count;
var isPlaying = false;

var imagePath = IMAGE_PATH;
var shapeJson = SHAPE_JSON;
var audio = new Audio(AUDIO_FILE);

var IMAGE_MAP = { name: "debug-map", areas: shapeJson };

var topLeftX = 0;
var topLeftY = 0;
var bottomRightX = 0;
var bottomRightY = 0;

// This indicates whether a temporary shape should be created on clicking the image
// Useful for creating an exercise
var previewEnabled = true;

class Debug extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [0, 0],
      selectedArea: { id: "0", errorType: "noError" },
      imageWidth: 0,
      windowWidth: window.innerWidth,
      shapeToGenerate: "noError",
      toggle: true,
      theMap: IMAGE_MAP,
      rhythmSide: "topLeft",
      errorIndicatorSide: "topLeft",
      noErrorRectSide: "topLeft",
      currentImagePath: imagePath,
      currentAudio: audio
    };

    /*
        This watches for when the window is resized and updates the
        windowWidth so the mapper gets set to the width of the window
        */
    window.addEventListener("resize", () => {
      console.log(
        `window resize detected, updating windowWidth to ${window.innerWidth}`
      );
      this.setState({ windowWidth: window.innerWidth });
    });
  }

  /*
    This sets the initial color of each shape
    */
  setInitialShapeColors(someShapes) {
    for (let shape of someShapes) {
      shape["preFillColor"] = Constants.INITIAL_PREFILL_COLOR;
      shape["fillColor"] = Constants.INITIAL_FILL_COLOR;
      shape["strokeColor"] = Constants.INITIAL_STROKE_COLOR;
    }
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

    this.setInitialShapeColors(shapeJson);

    this.setState({
      imageWidth: imgData.width,
      theMap: IMAGE_MAP,
    });
  }

  /**
   * Runs on component mount
   */
  async componentDidMount() {
    console.log(`componentDidMount running`);

    await this.setInitialState().then(
      await this.getImageWidthHeight()
        .then(
          (data) =>
          (document.getElementById(
            "image-properties"
          ).innerText = `Image width = ${data.width}\nImage height = ${data.height}`)
        )
        .then(() => {
          this.refreshMapper();
          this.refreshMapper();
          this.refreshMapper();
        })
        .then(() => {
          for (const someLevel of LEVEL_DATA) {
            console.log(`someLevel:`, someLevel);
            const levelName = someLevel.number;

            for (const someExercise of someLevel.exercises) {
              console.log(`someExercise:`, someExercise);

              let optionText = `Level ${someLevel.number} Exercise ${someExercise.number}`;
              let optionElement = `<option value="${someLevel.number}_${someExercise.number}">${optionText}</option>`;

              document.getElementById("exercise_picker").innerHTML += optionElement;
            }
          }
        })
    );
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
          if (!isPlaying) {
            audio.play();
            isPlaying = true;
          }
        }}
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--medium"
      >
        Play Sound (ignore this)
      </Button>
    );
  };

  /*
  This is triggered when a drop down option is selected in the exercise picker
  */
  handleExercisePicker = () => {
    let input = document.getElementById("exercise_picker").value;

    if (input === "debug") {
      this.setState({ theMap: { name: "debug-map", areas: shapeJson } });
      this.setState({ currentImagePath: IMAGE_PATH, currentAudio: new Audio(AUDIO_FILE) });
      audio = new Audio(AUDIO_FILE);
      return;
    }

    const split = input.split("_");
    const levelNumber = parseInt(split[0]);
    const exerciseNumber = parseInt(split[1]);

    for (const someLevel of LEVEL_DATA) {
      if (someLevel.number === levelNumber) {
        for (const someExercise of someLevel.exercises) {
          if (someExercise.number === exerciseNumber) {
            imagePath = someExercise.display;
            shapeJson = someExercise.shapes;
            audio = new Audio(someExercise.sound);

            this.setState({ currentImagePath: imagePath, currentAudio: new Audio(someExercise.sound) });
            this.setState({ theMap: { name: "debug-map", areas: shapeJson } });

            // Update the image state
            this.getImageWidthHeight().then(data => {
              this.setState({ imageWidth: data.width, })
            });
          }
        }
      }
    }

    this.refreshMapper();
  }

  /**
   * Given a mouse event, this updates the stored coordinates to where the cursor is
   */
  updateCoordinates(evt) {
    this.setState({
      coordinates: [evt.nativeEvent.layerX, evt.nativeEvent.layerY],
    });
  }

  /**
   * Given a mouse event, this updates the HTML and displays some information like the X and Y coordinates
   */
  updateCoordinateHtml(evt) {
    this.updateCoordinates(evt);
    const coordX = this.state.coordinates[0];
    const coordY = this.state.coordinates[1];

    document.getElementById(
      "x-coordinate"
    ).innerText = `X coordinate is ${coordX}\n`;
    document.getElementById(
      "y-coordinate"
    ).innerText = `Y coordinate is ${coordY}\n`;
    document.getElementById(
      "coordinate-json"
    ).innerText = `Coordinate JSON:\n"coords": [${coordX},${coordY},20]`;
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
    const areaErrorType = this.state.selectedArea.errorType;

    document.getElementById("shape-id").innerText = ``;
    document.getElementById("shape-id").innerText += `Shape info:\n`;
    document.getElementById("shape-id").innerText += `ID: ${areaId}\n`;
    document.getElementById("shape-id").innerText += `errorType: ${areaErrorType}\n\n`;

    document.getElementById("shape-json").innerText = `${JSON.stringify(this.state.selectedArea)}`;
  }

  /**
   * This adds a shape to the mapper temporarily so the user
   * can get a preview of where the shape will be placed
   */
  addTempShape(shapeObject) {
    let tmp = this.state.theMap;
    tmp.areas.push(shapeObject);
    this.setState({ theMap: tmp });
    this.refreshMapper();
  }

  /**
   * This removes the temporary shape with id "tmp"
   */
  removeTempShape() {
    let tmp = this.state.theMap;
    const removeIndex = tmp.areas.findIndex((item) => item.id === "tmp");

    if (removeIndex !== -1) {
      tmp.areas.splice(removeIndex, 1);
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

    let isError = true;

    if (this.state.shapeToGenerate == Constants.NO_ERROR) {
      isError = false;
    }

    if (this.state.shapeToGenerate == Constants.NO_ERROR_RECT) {
      isError = false;
    }

    if (this.state.shapeToGenerate == Constants.ERROR_INDICATOR) {
      isError = false;
    }

    let errorType = this.state.shapeToGenerate;

    let newShape = "";
    let newCoords = "";

    if (this.state.shapeToGenerate == Constants.RHYTHM_ERROR) {
      if (this.state.rhythmSide == "topLeft") {
        topLeftX = coordX;
        topLeftY = coordY;
        bottomRightX = topLeftX + 5;
        bottomRightY = topLeftY + 5;
        this.setState({ rhythmSide: "bottomRight" });
      }

      if (this.state.rhythmSide == "bottomRight") {
        bottomRightX = coordX;
        bottomRightY = coordY;
        this.setState({ rhythmSide: "topLeft" });
      }

      newShape = `rect`;
      newCoords = [topLeftX, topLeftY, bottomRightX, bottomRightY];
    }
    else if (this.state.shapeToGenerate == Constants.ERROR_INDICATOR) {
      if (this.state.errorIndicatorSide == "topLeft") {
        topLeftX = coordX;
        topLeftY = coordY;
        bottomRightX = topLeftX + 5;
        bottomRightY = topLeftY + 5;
        this.setState({ errorIndicatorSide: "bottomRight" });
      }

      if (this.state.errorIndicatorSide == "bottomRight") {
        bottomRightX = coordX;
        bottomRightY = coordY;
        this.setState({ errorIndicatorSide: "topLeft" });
      }

      newShape = `rect`;
      newCoords = [topLeftX, topLeftY, bottomRightX, bottomRightY];
    }
    else if (this.state.shapeToGenerate == Constants.NO_ERROR_RECT) {
      if (this.state.noErrorRectSide == "topLeft") {
        topLeftX = coordX;
        topLeftY = coordY;
        bottomRightX = topLeftX + 5;
        bottomRightY = topLeftY + 5;
        this.setState({ noErrorRectSide: "bottomRight" });
      }

      if (this.state.noErrorRectSide == "bottomRight") {
        bottomRightX = coordX;
        bottomRightY = coordY;
        this.setState({ noErrorRectSide: "topLeft" });
      }

      newShape = `rect`;
      newCoords = [topLeftX, topLeftY, bottomRightX, bottomRightY];
    }
    else {
      newShape = `circle`;
      newCoords = [coordX, coordY, 20];
    }

    let generated = {
      id: newId,
      errorType: errorType,
      shape: newShape,
      coords: newCoords,
    };

    let formatted = JSON.stringify(generated, null, 0);

    document.getElementById("generated-json").innerText = formatted;

    generated.id = "tmp";
    generated.preFillColor = "#F012BE80";

    if (previewEnabled) {
      this.removeTempShape();
      this.addTempShape(generated);
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

    let errorIndicators = 0;

    for (const shape of IMAGE_MAP.areas) {
      // Check if the shape's fill color is correct
      if (shape.errorType == Constants.PITCH_ERROR) {
        if (shape.fillColor == Constants.COLOR_PITCH_ERROR) {
          pitchErrorsCorrect += 1;
        } else {
          pitchErrorsMissed += 1;
        }
      } else if (shape.errorType == Constants.INTONATION_ERROR) {
        if (shape.fillColor == Constants.COLOR_INTONATION_ERROR) {
          intonationErrorsCorrect += 1;
        } else {
          intonationErrorsMissed += 1;
        }
      } else if (shape.errorType == Constants.RHYTHM_ERROR) {
        if (shape.fillColor == Constants.COLOR_RHYTHM_ERROR) {
          rhythmErrorsCorrect += 1;
        } else {
          rhythmErrorsMissed += 1;
        }
      } else if (shape.errorType == Constants.NO_ERROR) {
        if (shape.fillColor == Constants.COLOR_NO_ERROR) {
          noErrorsCorrect += 1;
        } else {
          noErrorsMissed += 1;
        }
      } else if (shape.errorType == Constants.ERROR_INDICATOR) {
        errorIndicators += 1;
      }

      const totalCorrect =
        pitchErrorsCorrect +
        rhythmErrorsCorrect +
        intonationErrorsCorrect +
        noErrorsCorrect;
      const totalMissed =
        pitchErrorsMissed +
        rhythmErrorsMissed +
        intonationErrorsMissed +
        noErrorsMissed;

      const reportText = `Shapes Debug Info
                There are ${IMAGE_MAP.areas.length} shapes
                pitchErrorsCorrect=${pitchErrorsCorrect}, pitchErrorsMissed=${pitchErrorsMissed}
                intonationErrorsCorrect=${intonationErrorsCorrect}, intonationErrorsMissed=${intonationErrorsMissed}
                rhythmErrorsCorrect=${rhythmErrorsCorrect}, rhythmErrorsMissed=${rhythmErrorsMissed}
                noErrorsCorrect=${noErrorsCorrect}, noErrorsMissed=${noErrorsMissed}
                totalCorrect=${totalCorrect}/${IMAGE_MAP.areas.length}\n totalMissed=${totalMissed}/${IMAGE_MAP.areas.length}

                errorIndicators=${errorIndicators}
                `;

      document.getElementById("shapes-info").innerText = reportText;
    }
  }

  /**
   * This is triggered when a shape is clicked
   */
  clicked(area) {
    for (const shape of this.state.theMap.areas) {
      if (shape.errorType == Constants.ERROR_INDICATOR) {
        continue;
      }
      else if (shape.errorType == Constants.RHYTHM_ERROR) {
        if (shape.id === area.id) {
          if (area.fillColor === Constants.COLOR_NO_ERROR) {
            shape.fillColor = Constants.COLOR_RHYTHM_ERROR;
            shape.preFillColor = Constants.COLOR_RHYTHM_ERROR;
          } else if (area.fillColor === Constants.COLOR_RHYTHM_ERROR) {
            shape.fillColor = Constants.COLOR_NO_ERROR;
            shape.preFillColor = Constants.COLOR_TRANSPARENT;
          } else {
            shape.fillColor = Constants.COLOR_NO_ERROR;
            shape.preFillColor = Constants.COLOR_TRANSPARENT;
          }
        }
      }
      else {
        if (shape.id === area.id) {
          if (area.fillColor === Constants.COLOR_PITCH_ERROR) {
            shape.fillColor = Constants.COLOR_INTONATION_ERROR;
            shape.preFillColor = Constants.COLOR_INTONATION_ERROR;
          } else if (area.fillColor === Constants.COLOR_INTONATION_ERROR) {
            shape.fillColor = Constants.COLOR_NO_ERROR;
            shape.preFillColor = Constants.COLOR_TRANSPARENT;
          } else if (area.fillColor === Constants.COLOR_NO_ERROR) {
            shape.fillColor = Constants.COLOR_PITCH_ERROR;
            shape.preFillColor = Constants.COLOR_PITCH_ERROR;
          } else {
            shape.fillColor = Constants.COLOR_NO_ERROR;
            shape.preFillColor = Constants.COLOR_TRANSPARENT;
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
      const data = { width: img.width, height: img.height };
      return data;
    };

    img.src = this.state.currentImagePath;
    return img.onload();
  }

  /**
   * This is a temporary fix to make React refresh the mapper
   */
  // a potential fix to this would be to use componentDidUpdate() for changing things immediately
  refreshMapper() {
    if (this.state.toggle === true) {
      this.setState({
        imageWidth: window.imageWidth + 1,
        toggle: false,
      });
    } else {
      this.setState({
        imageWidth: window.imageWidth - 1,
        toggle: true,
      });
    }
  }

  /*
    This returns a summary of correct/incorrect selections for the user
    */
  generateResults() {
    let reportText = "";

    let pitchErrorsCorrect = 0;
    let pitchErrorsMissed = 0;
    let rhythmErrorsCorrect = 0;
    let rhythmErrorsMissed = 0;
    let intonationErrorsCorrect = 0;
    let intonationErrorsMissed = 0;
    let noErrorsCorrect = 0;
    let noErrorsMissed = 0;

    for (const shape of this.state.theMap.areas) {
      // Check if the shape's fill color is correct
      if (shape.errorType === Constants.PITCH_ERROR) {
        if (shape.fillColor === Constants.COLOR_PITCH_ERROR) {
          pitchErrorsCorrect += 1;
        } else {
          pitchErrorsMissed += 1;
          if (shape.fillColor != Constants.COLOR_NO_ERROR) {
            shape.fillColor = Constants.COLOR_INCORRECT;
            shape.preFillColor = Constants.COLOR_INCORRECT;
          }
        }
      } else if (shape.errorType === Constants.INTONATION_ERROR) {
        if (shape.fillColor === Constants.COLOR_INTONATION_ERROR) {
          intonationErrorsCorrect += 1;
        } else {
          intonationErrorsMissed += 1;
          if (shape.fillColor != Constants.COLOR_NO_ERROR) {
            shape.fillColor = Constants.COLOR_INCORRECT;
            shape.preFillColor = Constants.COLOR_INCORRECT;
          }
        }
      } else if (shape.errorType === Constants.RHYTHM_ERROR) {
        if (shape.fillColor === Constants.COLOR_RHYTHM_ERROR) {
          rhythmErrorsCorrect += 1;
        } else {
          rhythmErrorsMissed += 1;
          if (shape.fillColor != Constants.COLOR_NO_ERROR) {
            shape.fillColor = Constants.COLOR_INCORRECT;
            shape.preFillColor = Constants.COLOR_INCORRECT;
          }
        }
      } else if (shape.errorType === Constants.NO_ERROR) {
        if (shape.fillColor === Constants.COLOR_NO_ERROR) {
          noErrorsCorrect += 1;
          shape.preFillColor = Constants.COLOR_TRANSPARENT;
          shape.strokeColor = Constants.COLOR_TRANSPARENT;
        } else {
          noErrorsMissed += 1;
          shape.fillColor = Constants.COLOR_INCORRECT;
          shape.preFillColor = Constants.COLOR_INCORRECT;
        }
      }

      const totalCorrect =
        pitchErrorsCorrect +
        rhythmErrorsCorrect +
        intonationErrorsCorrect +
        noErrorsCorrect;
      const totalMissed =
        pitchErrorsMissed +
        rhythmErrorsMissed +
        intonationErrorsMissed +
        noErrorsMissed;
      const pitchErrors = pitchErrorsCorrect + pitchErrorsMissed;
      const rhythmErrors = rhythmErrorsCorrect + rhythmErrorsMissed;
      const intonationErrors = intonationErrorsCorrect + intonationErrorsMissed;

      reportText = `Here are the results of your submission:\n\nIncorrect guesses are represented by the cyan circles.\n\n`;

      reportText += `There are ${pitchErrors + rhythmErrors + intonationErrors
        } errors in this exercise.\n`;
      reportText += `You found ${pitchErrorsCorrect + rhythmErrorsCorrect + intonationErrorsCorrect
        } errors and missed ${pitchErrorsMissed + rhythmErrorsMissed + intonationErrorsMissed
        } errors.\n\n`;

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
          reportText = reportText.concat(
            `${intonationErrorsMissed} intonation error`
          );
          if (intonationErrorsMissed > 1) {
            reportText = reportText.concat(`s`);
          }
          reportText = reportText.concat(`\n`);
        }
      } else {
        reportText = reportText.concat(
          `You correctly identified all errors!\n`
        );
      }

      reportText += "\n";
      reportText += `You incorrectly labeled ${noErrorsMissed} shapes as being errors when they were not errors.\n\n`;
    }

    return reportText;
  }

  render() {
    if (!count) {
      count = 0;
    }

    return (
      <div id="exercise-debug" className="exercise">
        <h2>Debug</h2>
        <div className="Instructions">
          <h2>
            This page is used to create exercises.
            <br></br>
            See ExerciseTemplate.js to view or modify the instructions and text that is shown on every exercise.
            <br></br>
            <br></br>
            Look in the Google Drive folder for exercise creation instructions.
            <br></br>
            <br></br>
          </h2>
        </div>

        {this.RenderButtonAndSound()}

        <br></br>
        <br></br>

        <Button
          onClick={() => {
            for (const shape of this.state.theMap.areas) {
              // If the shape is transparent, make it visible
              if (shape.preFillColor === Constants.COLOR_TRANSPARENT) {
                shape.preFillColor = Constants.COLOR_NO_ERROR;
              }
              // Otherwise make it transparent
              else {
                shape.preFillColor = Constants.COLOR_TRANSPARENT;
              }
            }

            this.refreshMapper();
          }}
          type="button"
          buttonStyle="btn--primary--solid-go-back"
          buttonSize="btn--medium"
        >
          Toggle Transparency (ignore this)
        </Button>

        <Button
          onClick={() => this.refreshMapper()}
          type="button"
          buttonStyle="btn--primary--solid-go-back"
          buttonSize="btn--medium"
        >
          Refresh Mapper
        </Button>

        <Button
          onClick={() => {
            for (const shape of this.state.theMap.areas) {
              switch (shape.errorType) {
                case Constants.PITCH_ERROR:
                  shape.fillColor = Constants.COLOR_PITCH_ERROR;
                  shape.preFillColor = Constants.COLOR_PITCH_ERROR;
                  break;
                case Constants.INTONATION_ERROR:
                  shape.fillColor = Constants.COLOR_INTONATION_ERROR;
                  shape.preFillColor = Constants.COLOR_INTONATION_ERROR;
                  break;
                case Constants.RHYTHM_ERROR:
                  shape.fillColor = Constants.COLOR_RHYTHM_ERROR;
                  shape.preFillColor = Constants.COLOR_RHYTHM_ERROR;
                  break;
                case Constants.NO_ERROR:
                  shape.fillColor = Constants.COLOR_NO_ERROR;
                  shape.preFillColor = Constants.COLOR_NO_ERROR;
                  break;
                case Constants.NO_ERROR_RECT:
                  shape.fillColor = Constants.COLOR_NO_ERROR;
                  shape.preFillColor = Constants.COLOR_NO_ERROR;
                  break;
                case Constants.ERROR_INDICATOR:
                  shape.fillColor = Constants.COLOR_ERROR_INDICATOR;
                  shape.preFillColor = Constants.COLOR_ERROR_INDICATOR;
                  break;
                default:
                  console.log(`Unknown error type`);
              }
            }

            this.refreshMapper();
          }}
          type="button"
          buttonStyle="btn--primary--solid-go-back"
          buttonSize="btn--medium"
        >
          Make shapes' colors correct
        </Button>

        <br></br>
        <br></br>

        <Button
          onClick={() => {
            previewEnabled = !previewEnabled;
          }}
          type="button"
          buttonStyle="btn--primary--solid-go-back"
          buttonSize="btn--medium"
        >
          Toggle Preview
        </Button>

        <Button
          onClick={() => {
            this.removeTempShape();
          }}
          type="button"
          buttonStyle="btn--primary--solid-go-back"
          buttonSize="btn--medium"
        >
          Remove Preview Shape
        </Button>

        <br></br>
        <br></br>

        <Button
          onClick={() => {
            history.goBack();
          }}
          type="button"
          buttonStyle="btn--primary--solid-go-back"
          buttonSize="btn--medium"
        >
          Back
        </Button>

        <Button
          id="reset"
          onClick={() => {
            if (window.confirm("Are you sure you want to reset?")) {
              window.location.reload(false);
            }
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--medium"
        >
          Reset
        </Button>

        <Button
          id="submit"
          onClick={() => {
            const results = this.generateResults();
            //swal(results);
            this.refreshMapper();
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--medium"
        >
          Submit (ignore this)
        </Button>

        <br></br>
        <br></br>

        <select id="exercise_picker" onChange={this.handleExercisePicker}>
          <option value="debug" defaultValue>Debug</option>
        </select>

        <br></br>
        <br></br>

        <div>
          <p>To see the color coding key, look at the top of Debug.js or ExerciseTemplate.js or open any exercise.</p>
        </div>

        <div
          id="mapper-container"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            border: "2px solid red"
          }}
        >
          <ImageMapper
            id="mapper-debug"
            src={this.state.currentImagePath}
            map={this.state.theMap}
            onImageMouseMove={(evt) => this.moveOnImage(evt)}
            onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
            onImageClick={(evt) => this.clickedOutside(evt)}
            onClick={(area) => this.clicked(area)}
            stayMultiHighlighted={true}
            width={this.state.imageWidth}
            imgWidth={this.state.imageWidth}
          />
        </div>

        <br></br>

        <div>--------------------</div>
        <br></br>

        <div className="radio-buttons-error-type">
          <input type="radio" name="clickType" value="" onClick={() => this.setState({ shapeToGenerate: Constants.ERROR_INDICATOR })} />
          Error indicator
          <br></br>
          <input type="radio" name="clickType" value="" onClick={() => this.setState({ shapeToGenerate: Constants.NO_ERROR })} />
          No error
          <br></br>
          <input type="radio" name="clickType" value="" onClick={() => this.setState({ shapeToGenerate: Constants.PITCH_ERROR })} />
          Pitch error
          <br></br>
          <input type="radio" name="clickType" value="" onClick={() => this.setState({ shapeToGenerate: Constants.INTONATION_ERROR })} />
          Intonation error
          <br></br>
          <input type="radio" name="clickType" value="" onClick={() => this.setState({ shapeToGenerate: Constants.RHYTHM_ERROR })} />
          Rhythm error
          <br></br>
          <input type="radio" name="clickType" value="" onClick={() => this.setState({ shapeToGenerate: Constants.NO_ERROR_RECT })} />
          No error rectangle (for rhythm errors)
        </div>

        <br></br>

        <div>Copy this JSON:</div>

        <div id="generated-json"
          style={{ marginRight: 20 + "px", marginLeft: 20 + "px" }}
        >
          ...
        </div>

        <br></br>
        <div>--------------------</div>

        <div id="shape-json"></div>

        <br></br>

        <div id="image-properties">...</div>

        <br></br>

        <div id="x-coordinate">X coordinate is unknown</div>

        <div id="y-coordinate">Y coordinate is unknown</div>

        <br></br>

        <div id="coordinate-json">Coordinate JSON is unknown</div>

        <br></br>

        <div id="shape-id">Shape info: unknown</div>

        <br></br>

        <div
          id="shapes-info"
          style={{
            marginTop: 30 + "px",
            marginRight: 20 + "px",
            marginLeft: 20 + "px",
          }}
        >
          Shapes Info
        </div>
      </div>
    );
  }
}

export default withRouter(Debug);

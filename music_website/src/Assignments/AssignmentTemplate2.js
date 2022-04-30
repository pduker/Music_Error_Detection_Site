import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/assignment.css";
import ImageMapper from "react-img-mapper";
import swal from "sweetalert";

var count;
var isPlaying = false;

let allCorrect = false;

const PITCH_ERROR = "pitchError";
const INTONATION_ERROR = "intonationError";
const RHYTHM_ERROR = "rhythmError";
const NO_ERROR = "noError";
const ERROR_SIGN = "errorSign"

const INITIAL_PREFILL_COLOR = "#ffffff00";
const INITIAL_FILL_COLOR = "#e3fc0080";
const INITIAL_STROKE_COLOR = "#ffffff00";

// The 80 at the end of a hex value means 50% transparency
const COLOR_NO_ERROR = "#e3fc0080";
const COLOR_PITCH_ERROR = "#9013fe80";
const COLOR_RHYTHM_ERROR = "#d0021b80";
const COLOR_INTONATION_ERROR = "#ffa50080";
const COLOR_ERROR_SIGN = "#0eebb980";
// The color used for transparency
const COLOR_TRANSPARENT = "#ffffff00";
// The color used for incorrect answers
const COLOR_INCORRECT = "#0eebb980";

const WINDOW_WIDTH_OFFSET = 90;

class AssignmentTemplate2 extends Component {
  constructor(props) {
    super(props);

    this.assignmentName = this.props.data.name;
    this.sound = this.props.data.sound;
    this.display = this.props.data.display;
    this.maxRecommendedPlays = this.props.data.maxRecommendedPlays;

    this.setInitialShapeColors(this.props.data.shapes);
    this.shapes = this.props.data.shapes;

    this.audio = new Audio(this.sound);
    this.IMAGE_MAP = {
      name: "map",
      areas: this.shapes,
    };

    this.state = {
      coordinates: [0, 0],
      selectedArea: { id: "0", isError: false, errorType: "noError" },
      imageWidth: 0,
      windowWidth: window.innerWidth,
      jsonGeneratorSelection: "noError",
      toggle: true,
      ALL_SHAPES: this.shapes,
      theMap: this.IMAGE_MAP,
      rhythmSide: "topLeft",
      audioButtonText: "Play Sound"
    };

    /*
        This watches for when the window is resized and updates the
        windowWidth so the mapper gets set to the width of the window
        */
    window.addEventListener("resize", () => {
      console.log(
        `window resize detected, updating windowWidth to ${window.innerWidth}`
      );
      this.setState({ windowWidth: window.innerWidth - WINDOW_WIDTH_OFFSET });
    });
  }

  /*
    This sets the initial color of each shape
    */
  setInitialShapeColors(someShapes) {
    for (let shape of someShapes) {
      shape["preFillColor"] = INITIAL_PREFILL_COLOR;
      shape["fillColor"] = INITIAL_FILL_COLOR;
      shape["strokeColor"] = INITIAL_STROKE_COLOR;
    }
  }

  /**
   * Updates the windowWidth state to the current window width
   */
  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth - WINDOW_WIDTH_OFFSET });
  };

  /**
   * Sets the initial state of the mapper and image width
   */
  async setInitialState() {
    console.log(`setInitialState running`);

    const imgData = await this.getImageWidthHeight();

    this.setState({
      imageWidth: imgData.width,
      theMap: this.IMAGE_MAP,
    });

    this.updateWindowWidth();
  }

  /**
   * Runs on component mount
   */
  async componentDidMount() {
    console.log(`componentDidMount running`);

    this.setInitialState()
      .then(this.getImageWidthHeight())
      .finally(() => {
        this.refreshMapper();
        this.refreshMapper();
      });
  }

  RenderButtonAndSound = () => {
    this.audio.onended = function () {
      isPlaying = false;
    };

    return (
      <Button
        onClick={() => {
          // Check if the audio is playing
          if (isPlaying) {
            swal("Wait for the audio to finish playing.");
            return;
          }

          // Play the audio
          if (!isPlaying) {
            this.audio.play();
            count++;
            isPlaying = true;
          }

          // Check maxRecommendedPlays
          const RECOMMENDED_PLAY_COUNT = this.maxRecommendedPlays;

          if (count === RECOMMENDED_PLAY_COUNT - 1) {
            const MESSAGE = `You have played the audio ${count} time(s). In class you will only be able to listen to the audio one more time.`;

            swal(MESSAGE);
          }
          else if (count === RECOMMENDED_PLAY_COUNT) {
            const MESSAGE = `You have played the audio the recommended maximum of ${count} time(s). In class you would not be able to listen to the audio again.`;

            this.setState({ audioButtonText: "Play Sound (extra)" });

            swal(MESSAGE);
          }
        }}
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--medium"
      >
        {this.state.audioButtonText}
      </Button>
    );
  };

  turnErrorSignON(errorSignID) {
    for (const sign of this.IMAGE_MAP.areas) {
      if (sign.id == errorSignID) {
        sign.fillColor = COLOR_ERROR_SIGN;
        sign.preFillColor = COLOR_ERROR_SIGN;
      }
    }
  }
  turnErrorSignOFF(errorSignID) {
    for (const sign of this.IMAGE_MAP.areas) {
      if (sign.shape == 'poly') {
        sign.fillColor = COLOR_TRANSPARENT;
        sign.preFillColor = COLOR_TRANSPARENT;
      }
    }
  }
  /**
   * Determines which error sign is associated with the given shape then
   * calls the turnErrorSignON function to turn the correct error sign red
   */
  whichErrorSign(shape) {
    let closest = 10000;
    let errorSignID;
    for (const sign of this.IMAGE_MAP.areas) {
      if (sign.errorType == ERROR_SIGN) {
        let diff = Math.abs(shape.coords[0] - sign.coords[0]);
        if (diff < closest) {
          closest = diff;
          errorSignID = sign.id;
        }
      }
    }
    this.turnErrorSignON(errorSignID);
  }

  /**
   * This is triggered when a shape is clicked
   */
  clicked(area) {
    for (const shape of this.IMAGE_MAP.areas) {
      if (shape.errorType == "errorSign") {
        //do nothing
      }
      else if (shape.errorType != "rhythmError") {
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
      } else {
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

    img.src = this.display;
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

    for (const shape of this.state.ALL_SHAPES) {
      // Check if the shape's fill color is correct
      if (shape.errorType === PITCH_ERROR) {
        if (shape.fillColor === COLOR_PITCH_ERROR) {
          pitchErrorsCorrect += 1;
        } else {
          pitchErrorsMissed += 1;
          this.whichErrorSign(shape);
        }
      } else if (shape.errorType === INTONATION_ERROR) {
        if (shape.fillColor === COLOR_INTONATION_ERROR) {
          intonationErrorsCorrect += 1;
        } else {
          intonationErrorsMissed += 1;
          this.whichErrorSign(shape);
        }
      } else if (shape.errorType === RHYTHM_ERROR) {
        if (shape.fillColor === COLOR_RHYTHM_ERROR) {
          rhythmErrorsCorrect += 1;
        } else {
          rhythmErrorsMissed += 1;
          this.whichErrorSign(shape);
        }
      } else if (shape.errorType === NO_ERROR) {
        if (shape.fillColor === COLOR_NO_ERROR) {
          noErrorsCorrect += 1;
          shape.preFillColor = COLOR_TRANSPARENT;
          shape.strokeColor = COLOR_TRANSPARENT;
        } else {
          noErrorsMissed += 1;
          this.whichErrorSign(shape);
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

      reportText += `There are ${pitchErrors + rhythmErrors + intonationErrors} errors in this exercise.\n`;
      reportText += `You found ${pitchErrorsCorrect + rhythmErrorsCorrect + intonationErrorsCorrect} error(s) and missed ${pitchErrorsMissed + rhythmErrorsMissed + intonationErrorsMissed} error(s).\n\n`;

      if (noErrorsMissed > 0) {
        reportText += `You incorrectly labeled ${noErrorsMissed} shape(s) as being errors when they were not errors.\n\n`;
      }

      if (totalMissed > 0) {
        allCorrect = false;
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
        allCorrect = true;
      }
    }

    return reportText;
  }

  render() {
    if (!count) {
      count = 0;
    }

    return (
      <div id="assignment-debug" className="assignment">
        <h2>{this.assignmentName}</h2>

        <div className="Instructions">
          <h2>
            This assignment is used to help students recognize pitch,
            intonation, and rhythm errors.
            <br></br>
            <br></br>
            Hovering over each note, you will notice a yellow circle appear. The
            circles are used to help recognize where pitch and intonation errors
            are located. When clicking the circle, you will be able to switch
            between purple, orange, and transparent. Each color is represented
            below:
            <br></br>
            1. Pitch errors - purple
            <br></br>
            2. Intonation errors - orange
            <br></br>
            3. No error - transparent
            <br></br>
            <br></br>
            Also, when hovering above some notes you will see a yellow rectangle
            appear. The rectangles are used to help recognize where rhythm
            errors are located. When clicking the rectangle, you will be able to
            switch between red and transparent. Each color is represented below:
            <br></br>
            1. Rhythm errors - red
            <br></br>
            2. No error - transparent
            <br></br>
            <br></br>
            You may click the “Play Sound” button to hear the music from the
            blank sheet below. Normally in class, you will only be able to play the music
            a maximum of {this.maxRecommendedPlays} times, so listen carefully. If you would like to start fresh
            before submitting, you can press the “Reset” button to clear the
            errors from the sheet music.
            <br></br>
            <br></br>
            Once you are satisfied with your work, you can press the “Submit”
            button. At the bottom of the screen you will see how many errors you
            identified correctly. Each error that is not identified correctly
            will return a light blue circle. Try to identify the correct error
            again.
          </h2>
        </div>

        {this.RenderButtonAndSound()}

        <br></br>
        <br></br>

        <div
          id="mapper-container"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ImageMapper
            src={this.display}
            map={this.state.theMap}
            onClick={(area) => this.clicked(area)}
            stayMultiHighlighted={true}
            width={this.state.imageWidth}
            imgWidth={this.state.imageWidth}
          />
        </div>

        <br></br>
        <br></br>

        <Button
          onClick={() => {
            history.push("/");
            history.go();
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

            swal(results);

            /*if (allCorrect === true) {
              swal(results);
            }*/
            this.refreshMapper();
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--medium"
        >
          Submit
        </Button>

        <br></br>
        <br></br>
      </div>
    );
  }
}

export default AssignmentTemplate2;

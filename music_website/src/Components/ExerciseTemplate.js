import React, { Component } from "react";
import { Button } from "./Button";
import history from "../Scripts/history";
import "./../Styles/exercise.css";
import ImageMapper from "react-img-mapper";
import swal from "sweetalert";

import * as Constants from "./Constants";

var count;
var isPlaying = false;


class ExerciseTemplate extends Component {
  constructor(props) {
    super(props);

    this.levelNumber = this.props.levelData.number;

    this.exerciseNumber = this.props.data.number;
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
      selectedArea: { id: "0", errorType: "noError" },
      imageWidth: 0,
      windowWidth: window.innerWidth,
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
      this.setState({ windowWidth: window.innerWidth - Constants.WINDOW_WIDTH_OFFSET });
    });
  }

  /*
  This sets the initial color of each shape
  */
  setInitialShapeColors(someShapes) {
    for (let shape of someShapes) {
      // If the shape indicates the general region where an error should be, then it should be invisible
      if (shape.errorType == Constants.ERROR_INDICATOR) {
        shape["preFillColor"] = Constants.COLOR_TRANSPARENT;
        shape["fillColor"] = Constants.COLOR_TRANSPARENT;
        shape["strokeColor"] = Constants.COLOR_TRANSPARENT;
      } else {
        shape["preFillColor"] = Constants.INITIAL_PREFILL_COLOR;
        shape["fillColor"] = Constants.INITIAL_FILL_COLOR;
        shape["strokeColor"] = Constants.INITIAL_STROKE_COLOR;
      }
    }
  }

  /**
   * Updates the windowWidth state to the current window width
   */
  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth - Constants.WINDOW_WIDTH_OFFSET });
  };

  /**
   * Sets the initial state of the mapper and image width
   */
  async setInitialState() {
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
    this.setInitialState()
      .then(this.getImageWidthHeight())
      .then(() => {
        this.refreshMapper();
        // Temporary fix for the occasional issue where the shapes won't appear
        // TODO improve this
        setTimeout(() => { this.refreshMapper(); }, 500);
        setTimeout(() => { this.refreshMapper(); }, 2000);
        setTimeout(() => { this.refreshMapper(); }, 5000);
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

  /**
   * This is triggered when a shape is clicked
   */
  clicked(area) {
    for (const shape of this.IMAGE_MAP.areas) {
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
        toggle: false
      });
    } else {
      this.setState({
        imageWidth: window.imageWidth - 1,
        toggle: true
      });
    }
  }

  /*
  This highlights any shapes inside an error indicator rectangle
  */
  highlightShapesInIndicators(someShape) {
    for (const shape of this.state.ALL_SHAPES) {
      if (shape.errorType === Constants.ERROR_INDICATOR) {
        const coords = shape.coords;
        const topLeftX = coords[0];
        const topLeftY = coords[1];
        const bottomRightX = coords[2];
        const bottomRightY = coords[3];

        const type = someShape.errorType;

        // Handle circle type errors
        if (type === Constants.PITCH_ERROR || type === Constants.INTONATION_ERROR || type === Constants.NO_ERROR) {
          const xCoord = someShape.coords[0];
          const yCoord = someShape.coords[1];

          // Check if the circle's coordinates are inside the rectangle
          if (xCoord > topLeftX && xCoord < bottomRightX && yCoord > topLeftY && yCoord < bottomRightY) {
            // Change the color of the error indicator to make it non transparent
            shape["preFillColor"] = Constants.COLOR_ERROR_INDICATOR;
            shape["fillColor"] = Constants.COLOR_ERROR_INDICATOR;
            shape["strokeColor"] = Constants.COLOR_ERROR_INDICATOR;
          }
        }
        // Handle rectangle type errors
        else if (type === Constants.RHYTHM_ERROR || type === Constants.NO_ERROR_RECT) {
          const otherCoords = someShape.coords;
          const otherTopLeftX = otherCoords[0];
          const otherTopLeftY = otherCoords[1];
          const otherBottomRightX = otherCoords[2];
          const otherBottomRightY = otherCoords[3];

          // Check if the rectangle's coordinates are inside the outside rectangle
          if (otherTopLeftX > topLeftX && otherTopLeftY > topLeftY && otherBottomRightX < bottomRightX && otherBottomRightY < bottomRightY) {
            // Change the color of the error indicator to make it non transparent
            shape["preFillColor"] = Constants.COLOR_ERROR_INDICATOR;
            shape["fillColor"] = Constants.COLOR_ERROR_INDICATOR;
            shape["strokeColor"] = Constants.COLOR_ERROR_INDICATOR;
          }
        }
      }
    }

    this.refreshMapper();
  }

  /*
  This is triggered when the submit button is clicked
  */
  handleSubmit() {
    // Reset all errorIndicator colors to default
    for (const shape of this.state.ALL_SHAPES) {
      if (shape.errorType === Constants.ERROR_INDICATOR) {
        shape["preFillColor"] = Constants.COLOR_TRANSPARENT;
        shape["fillColor"] = Constants.COLOR_TRANSPARENT;
        shape["strokeColor"] = Constants.COLOR_TRANSPARENT;
      }
    }

    let incorrectAnswers = 0;

    // Find incorrect answers
    for (const shape of this.state.ALL_SHAPES) {
      if (!this.isSelectionCorrect(shape)) {
        // If an answer is incorrect, check if it's inside a errorIndicator rectangle,
        // and if it is change the color of the rectangle

        this.highlightShapesInIndicators(shape);

        incorrectAnswers += 1;
      }

      /* if (shape.errorType === Constants.ERROR_INDICATOR) {
        shape["preFillColor"] = Constants.COLOR_TRANSPARENT;
        shape["fillColor"] = Constants.COLOR_TRANSPARENT;
        shape["strokeColor"] = Constants.COLOR_TRANSPARENT;
      } */
    }

    console.log(`incorrectAnswers = ${incorrectAnswers}`);

    // If all the answers are correct, show a popup
    if (incorrectAnswers === 0) {
      swal("Good job, you got everything correct!");
    }

    this.refreshMapper();
  }

  isSelectionCorrect(someShape) {
    // Check if the shape's fill color is correct
    if (someShape.errorType === Constants.PITCH_ERROR) {
      if (someShape.fillColor === Constants.COLOR_PITCH_ERROR) {
        return true;
      }
    } else if (someShape.errorType === Constants.INTONATION_ERROR) {
      if (someShape.fillColor === Constants.COLOR_INTONATION_ERROR) {
        return true;
      }
    } else if (someShape.errorType === Constants.RHYTHM_ERROR) {
      if (someShape.fillColor === Constants.COLOR_RHYTHM_ERROR) {
        return true;
      }
    } else if (someShape.errorType === Constants.NO_ERROR) {
      if (someShape.fillColor === Constants.COLOR_NO_ERROR) {
        return true;
      }
    } else if (someShape.errorType === Constants.ERROR_INDICATOR) {
      // ERROR_INDICATOR is not an error, so it's never incorrect
      return true;
    }

    return false;
  }

  render() {
    if (!count) {
      count = 0;
    }

    return (
      <div id="exercise-debug" className="exercise">
        <h2>Level {this.levelNumber} Exercise {this.exerciseNumber}</h2>

        <div className="Instructions">
          <h2>
            This exercise is used to help students recognize pitch,
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
            this.handleSubmit();
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--medium"
        >
          Submit
        </Button>

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
            responsive={true}
            parentWidth={this.state.windowWidth}
          />
        </div>

        <br></br>
        <br></br>

        <br></br>
        <br></br>
      </div>
    );
  }
}

export default ExerciseTemplate;

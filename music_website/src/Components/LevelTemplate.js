import React, { Component } from "react";
import { Button } from "./Button";
import history from "./../Scripts/history";
import "./../Styles/home.css";
import { withRouter } from "react-router-dom";
import headerImg from "./../Resources/Images/Header.png";

import { LEVEL_DATA } from "../Exercises/LevelData";

class LevelTemplate extends Component {
    constructor(props) {
        super(props);

        this.levelNumber = this.props.data.number;
        this.levelDescription = this.props.data.description;
        this.maxRecommendedPlays = this.props.data.maxRecommendedPlays;
        this.exercises = this.props.data.exercises;
    }

    render() {
        return (
            <div className="Level">
                <header>
                    <img id="img1" className="center-fit" src={headerImg} alt="Header" />
                </header>
                <h2 style={{ color: 'white' }}>Welcome to the Music Error Detection Practice Quiz!</h2>
                <h2 style={{ color: 'white' }}>Level {this.levelNumber}</h2>
                <h3 style={{ color: 'white' }}>Click on one of the exercises below to begin.</h3>

                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                    type="button"
                    buttonStyle="home-page-button"
                    buttonSize="btn--large"
                >
                    Back
                </Button>

                {
                    this.exercises.map((exerciseData) => (
                        <div>
                            <Button
                                onClick={() => {
                                    history.push(`/Level${this.levelNumber}Exercise${exerciseData.number}`);
                                    history.go();
                                }
                                }
                                type="button"
                                buttonStyle="home-page-button"
                                buttonSize="btn--large"
                            >Level {this.levelNumber} - Exercise {exerciseData.number}</Button>
                        </div>
                    ))
                }

                <footer>
                    <address>
                        Visit us at: <a href="https://www.udel.edu/apply/undergraduate-admissions/major-finder/music-education/">UD Music Education</a>
                        <div>
                            For questions please email: <a href="mailto:pduker@udel.edu">Professor Phil Duker</a>
                        </div>
                        <br></br>
                    </address>
                </footer>
            </div>
        );
    }
}

export default LevelTemplate;

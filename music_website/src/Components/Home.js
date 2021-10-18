import React, { Component } from "react";
import { Button } from "./Button";
import history from "./../Scripts/history";
import "./../Styles/home.css";
import { withRouter } from "react-router-dom";
import headerImg from "./../Resources/Images/Header.png";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <header>
        <img id="img1" className="center-fit" src={headerImg} alt="Header"/>
        </header>
        <h2 style={{ color: 'white' }}>Welcome to Music Error Detection Practice Quiz</h2>
        <h3 style={{ color: 'white' }}>Click on the Assignment to begin!</h3>
        <div>
          <Button
            onClick={() => {
              history.push('/Assignment1');
              history.go();
            }
            }
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--large"
          >Assignment 1</Button>
        </div>
        <div>
          <Button
            onClick={() => {
              history.push('/Assignment2');
              history.go();
            }
            }
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--large"
          >Assignment 2</Button>
        </div>
        <div>
          <Button
            onClick={() => {
              history.push('/Assignment3');
              history.go();
            }
            }
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--large"
          >Assignment 3</Button>
        </div>
        <div>
          <Button
            onClick={() => {
              history.push('/Assignment4');
              history.go();
            }
            }
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--large"
          >Assignment 4</Button>
        </div>
        <div>
          <Button
            onClick={() => {
              history.push('/Assignment5');
              history.go();
            }
            }
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--large"
          >Assignment 5</Button>
        </div>
        <div>
          <Button
            onClick={() => {
              history.push('/AssignmentTemplate');
              history.go();
            }
            }
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--large"
          >New Assignment Template</Button>
        </div>


        <footer>
          <address>
            Visit us at: <a href="https://www.udel.edu/apply/undergraduate-admissions/major-finder/music-education/">UD Music Education</a>
            <div>
              For Questions Email: <a href="pduker@udel.edu">Professor Phil Duker</a>
            </div>
          </address>
        </footer>

      </div>
    );
  }
}

export default withRouter(Home);
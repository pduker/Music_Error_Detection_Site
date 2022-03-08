import React, { Component } from "react";
import { Button } from "./Button";
import history from "./../Scripts/history";
import "./../Styles/home.css";
import { withRouter } from "react-router-dom";
import headerImg from "./../Resources/Images/Header.png";

class Level1 extends Component {
  render() {
    return (
      <div className="Level1">
        <header>
          <img id="img1" className="center-fit" src={headerImg} alt="Header" />
        </header>
        <h2 style={{ color: 'white' }}>Welcome to the Music Error Detection Practice Quiz!</h2>
        <h3 style={{ color: 'white' }}>Click on one of the assignments below to begin.</h3>
        <div>
          <Button
            onClick={() => {
              history.push('/');
              history.go();
            }
            }
            type="button"
            buttonStyle="home-page-button"
            buttonSize="btn--large"
          >Home </Button>
        </div>

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

export default withRouter(Level1);
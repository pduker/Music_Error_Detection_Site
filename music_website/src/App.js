import React from 'react';
import './App.css';
import Routes from './Routes';
import useMousePosition from './MousePosition';
// import { Button } from './Components/Button';

function App() {
  const mouseStuff = useMousePosition();
  // const { x, y } = mouseStuff[0];
  const placeX = mouseStuff[1];
  const placeY = mouseStuff[2];

  const divStyleP = {
    display: 'none',
    position: 'absolute',
    top: placeY-13,
    left: placeX-13,
    background: 'Pink',
    opacity: '.5',
    border: '2px solid Red',
    width: '25px',
    height: '25px'};
  const divStyleR = {
    display: 'none',
    position: 'absolute',
    top: placeY-13,
    left: placeX-13,
    background: 'AquaMarine',
    opacity: '.5',
    border: '2px solid Green',
    width: '25px',
    height: '25px'};
  const divStyleI = {
    display: 'none',
    position: 'absolute',
    top: placeY-13,
    left: placeX-13,
    background: 'Orchid',
    opacity: '.5',
    border: '2px solid BlueViolet',
    width: '25px',
    height: '25px'};
    // var hotspotCount = 1;
  return (
    <div className="App">
      <Routes />
      <div id="shapeP" style={divStyleP}> </div>
      <div id="shapeR" style={divStyleR}> </div>
      <div id="shapeI" style={divStyleI}> </div>
      {/* <Button className="hotspot"
        onClick={() => {
          hotspotCount++;
          document.getElementById('shape').style.display = "block";
          let clone = document.querySelector('#shape').cloneNode(true);
          clone.setAttribute('id', 'shape'+hotspotCount.toString());
          document.querySelector('div').appendChild( clone );
        }
        }
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--large"
      >Add Shape</Button> */}
    </div>
    
  );
}

export default App;
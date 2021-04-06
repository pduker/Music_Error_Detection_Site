import React from 'react';
import './App.css';
import Routes from './Routes';
import useMousePosition from './MousePosition';

function App() {
  const mouseStuff = useMousePosition();
  const placeX = mouseStuff[1];
  const placeY = mouseStuff[2];
  const divStyleP = {
    display: 'none',
    position: 'absolute',
    top: placeY-window.innerHeight*0.025,
    left: placeX-window.innerWidth*0.015,
    background: 'Pink',
    opacity: '.5',
    border: '2px solid Red',
    width: '38px',
    height: '38px'};
  const divStyleR = {
    display: 'none',
    position: 'absolute',
    top: placeY-window.innerHeight*0.025,
    left: placeX-window.innerWidth*0.015,
    background: 'AquaMarine',
    opacity: '.5',
    border: '2px solid Green',
    width: '38px',
    height: '38px'};
  const divStyleI = {
    display: 'none',
    position: 'absolute',
    top: placeY-window.innerHeight*0.025,
    left: placeX-window.innerWidth*0.015,
    background: 'Orchid',
    opacity: '.5',
    border: '2px solid BlueViolet',
    width: '38px',
    height: '38px'};
  return (
    <div className="App">
      <Routes />
      <div id="shapeP" style={divStyleP}> </div>
      <div id="shapeR" style={divStyleR}> </div>
      <div id="shapeI" style={divStyleI}> </div>
    </div>
    
  );
}

export default App;
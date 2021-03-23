import { useState, useEffect } from "react";
var placeX = 0;
var placeY = 0;
// const divStyle = {
//     display: 'block',
//     position: 'absolute',
//     top: 50,
//     left: 24,
//     background: 'blue',
//   // border-radius: '50%',
//     width: '100px',
//     height: '100px'};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  const handleClick = ev => {
    placeX = ev.clientX;
    placeY = ev.clientY;
    // console.log("clicked");
    // console.log(document.getElementById("shape"));
    // // document.getElementById("tmp").style.display = "block";
    // // // document.getElementById("shape").style.background = 'blue';
    // // document.getElementById("tmp").style.top = placeY.toString()+'px';
    // // document.getElementById("tmp").style.left = placeX.toString()+'px';
    // // <div id="tmp" style={divStyle}>hey</div>
    // console.log(document.getElementById("tmp"));
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("mouseup", handleClick);

    return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("mousedown", handleClick);
        window.removeEventListener("mouseup", handleClick);
    }
  }, []);

  return [mousePosition,placeX,placeY];
};

export default useMousePosition;
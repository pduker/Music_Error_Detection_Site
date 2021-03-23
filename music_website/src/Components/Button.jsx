import React from "react";
import "./button.css";


const STYLES = [
    "btn--primary--solid",
    "btn--pitch--solid",
    "btn--rhythm--solid",
    "btn--intonation--solid"
]

const SIZES = [
    "btn--medium", "btn--large"
]

export const Button = ({
    children, type, onClick, buttonStyle, buttonSize
}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle 
    : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) 
    ? buttonSize 
    : SIZES[0];

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};
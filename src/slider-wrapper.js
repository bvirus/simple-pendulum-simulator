import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Slider } from './slider';

export function SliderWrapper(props) {
    return (
        <div className="slider-container">
            <label htmlFor="slider" style={{flex: 1}}>{props.label}</label>
            <Slider {...props} id="slider"  />
        </div>
    );
}
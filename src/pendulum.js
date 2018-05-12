
import React, { Component } from 'react';

export function Pendulum(props) {
    let w = props.width;
    let h = props.height;
    let m = Math.min(w, h)/2;
    let c = (2*Math.PI)/(props.maxTime);
    let pos = (props.amplitude) * Math.sin(c * props.time);
    let centerX = w*0.5;
    let centerY = h*0.1;

    let x = (centerX + ((props.length * m) * Math.cos(pos - (Math.PI/2))))
    let y = (centerY - ((props.length * m) * Math.sin(pos - (Math.PI/2))));

    return (<svg id="screen" width={props.width} height={props.height}>
        <line x1={centerX} y1={centerY} x2={x} y2={y} style={{stroke:"black", strokeWidth:2}} />
        <circle cx={x} cy={y} r="5%" fill="black" />
    </svg>);
}
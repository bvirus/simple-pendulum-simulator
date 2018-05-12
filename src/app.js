import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SliderWrapper } from './slider-wrapper';
import { Pendulum } from './pendulum';

let lrange = { min: 0.10, max: 0.75 }
let arange = { min: Math.PI/20, max: Math.PI/3 }

let listener;

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            length: 0.4, 
            amplitude: Math.PI/5, 
            time: 0,
            startTime: 0,
            penWidth: 0,
            penHeight: 0,
            container: {}
        };
    }

    getDimensions = (container) => {
        this.setState({ container });
        listener = window.addEventListener('resize', () => {
            this.setState({ 
                penWidth: container.clientWidth, 
                penHeight: container.clientHeight })
        })
        this.setState({ penWidth: container.clientWidth, penHeight: container.clientHeight })
    }
    componentDidMount() {
        this.setState({ 
            startTime: Date.now()
        }, () => {
            requestAnimationFrame(this.tick);
        });
    }

    componentWillUnmount() {
        window.removeEventListener(listener);
    }


    maxTime = 5 * 1000;

    tick = () => {
        if (this.state.time > this.maxTime) {
            this.setState({ time: 0, startTime: Date.now() }, () => {
                requestAnimationFrame(this.tick);
            })
        } else { 
            this.setState({ time: Date.now() - this.state.startTime }, () => {
                requestAnimationFrame(this.tick);
            });
        }
    }
    setAmplitude = (amplitude) => this.setState({ amplitude })
    setLength = (length) => {
        this.setState({ length })
    }
    render() {
        return (
        <div className="pass-through">
            <div className="outer-container">
                <div className="inner-container">
                    <SliderWrapper
                        label="Length of string"
                        range={lrange}
                        start={this.state.length} 
                        onChange={this.setLength} />
                    <SliderWrapper
                        label="Amplitude"
                        range={arange}
                        start={this.state.amplitude} 
                        onChange={this.setAmplitude} />
                </div>
                <div style={{flexGrow: 2}}></div>
            </div>
            <div id="container" ref={this.getDimensions}>
                <Pendulum 
                    length={this.state.length} 
                    amplitude={this.state.amplitude} 
                    time={this.state.time} 
                    maxTime={this.maxTime} 
                    width={this.state.penWidth }
                    height={this.state.penHeight} />
            </div>
        </div>);
    }
}


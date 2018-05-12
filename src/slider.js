import { create } from 'nouislider';
import '../node_modules/nouislider/distribute/nouislider.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react';

export class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            element: null
        }
    }
    createSlider = (element) => {
        create(element, {...this.props});
        element.noUiSlider.on('slide', this.props.onChange);
        this.setState({element});
    }
    componentWillUnmount() {
        this.state.element.noUiSlider.destroy();
    }
    render() {
        return (<div className="my-slider" ref={this.createSlider}></div>);
    }
}
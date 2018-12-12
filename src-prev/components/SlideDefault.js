import React, { Component } from 'react';
import SlideText from "./SlideText";

class SlideDefault extends Component {

    slide = this.props.slide;
    index = this.props.index;

    render() {
        return (
            <div key={this.slide.id} className={`slide slide-default slide-${this.index} ${(this.index === 0) ? 'active' : ''}`} data-index={this.index}>
                <SlideText slide={this.slide} />
            </div>
        );
    }
}

export default SlideDefault;

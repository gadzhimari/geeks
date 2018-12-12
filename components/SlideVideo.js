import React, { Component } from 'react';
import SlideText from "./SlideText";
import Config from '../config';

class SlideVideo extends Component {

    slide = this.props.slide;
    index = this.props.index;

    render() {
        return (
            <div key={this.slide.id} className={`slide slide-video slide-${this.index} ${(this.index === 0) ? 'active' : ''}`} data-index={this.index}>
                <SlideText slide={this.slide} />
                <video id="hero-video" playsInline autoPlay muted loop poster={`${Config.host + this.slide.video_image.url}`}>
                    <source src={`${Config.host + this.slide.video.url}`} type="video/mp4" />
                </video>
            </div>
        );
    }
}

export default SlideVideo;

import React, { Component } from 'react';
import { handleControl, changeVideoDimension } from '../scripts/slider';
import Config from '../config';

class SlideVideo extends Component {
    componentDidMount() {
        this.setState({
            slides: this.props.slides
        });

        changeVideoDimension();
        window.addEventListener("mousewheel", this.scrollSwitcher);
    }

    componentWillUnmount() {
        window.removeEventListener("mousewheel", this.scrollSwitcher);
    }

    executed = false;
    scrollSwitcher(event) {
        if (!this.executed) {
            this.executed = true;

            if (event.deltaY > 0) {
                document.querySelector('.control-next').click();
            } else {
                document.querySelector('.control-prev').click();
            }

            setTimeout(() => {
                this.executed = false;
            }, 1500);
        }
    }

    slide = this.props.slides[1];

    render() {
        return (
            <div className="slider--controls">
                <button className="control-item control-prev hidden" onClick={handleControl.bind(this)} data-control="prev">
                    <div className="control-image"></div>
                </button>

                <button className="control-item control-next" onClick={handleControl.bind(this)} data-control="next">
                    <div className="control-image" style={{ backgroundImage: `url(${Config.host + this.slide.image_thumbnail.url})` }}></div>
                </button>

                <div className="image-prev shadow-image"></div>

                <div className="image-next shadow-image" style={{ backgroundImage: `url(${Config.host + this.slide.image_thumbnail.url})` }}></div>
            </div>
        );
    }
}

export default SlideVideo;

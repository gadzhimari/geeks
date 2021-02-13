import React, { Component } from 'react';
import { sliderSwitch } from '../scripts/slider';

class SlideDots extends Component {
  componentDidMount() {
    this.setState({
      slides: this.props.slides,
    });
  }

  slide = this.props.slides[1];

  render() {
    return (
      <div className="slider--dots">
        <div className="container">
          <div className="dots--wrap">
            {this.props.slides.map((slide, index) => {
              return (
                <button
                  className={`slider-switch ${
                    index === 0 ? 'active hover' : ''
                  }`}
                  onClick={sliderSwitch.bind(this)}
                  key={index}
                  data-index={index}
                  data-title={slide.title}
                >
                  <span>{slide.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SlideDots;

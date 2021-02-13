import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';
import { DOMAIN_URL } from '../config';
import { Slides } from '../api';

class SlideList extends Component {
  state = {
    loading: true,
    products: [],
  };

  async componentDidMount() {
    const { data: slides } = await Slides.getSlides();

    this.setState({ loading: false, slides: slides });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="SlideList">
          {/* <h2 className="SlideList-title">Available slides ({this.state.slides.length})</h2> */}
          <div className="SlideList-container">
            {this.state.slides.map((slide, index) => {
              return (
                <div className="SlideList-slide" key={slide.id}>
                  <Link to={`/slides/${slide.id}`}>
                    <h3>{slide.title}</h3>
                    <img
                      src={`${DOMAIN_URL + slide.image_main.url}`}
                      alt={slide.title}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return <h2 className="SlideList-title">Waiting for API...</h2>;
  }
}

export default SlideList;

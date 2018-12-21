import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {
  setDotNavigation,
  changeHeaderColor,
  goToFirstSlide,
} from '../scripts/slider';
import SlideImage from '../components/SlideImage';
import SlideVideo from '../components/SlideVideo';
import SlideDefault from '../components/SlideDefault';
import SlideControls from '../components/SlideControls';
import SlideDots from '../components/SlideDots';
import { Slides } from '../api';

class Home extends Component {
  state = {
    loading: true,
    slides: [],
  };

  sortByOrder(a, b) {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  }

  async componentDidMount() {
    const { data: slides } = await Slides.getSlides();

    this.setState({
      loading: false,
      slides: slides.sort(this.sortByOrder),
    });

    setDotNavigation();

    document
      .querySelector('.link-home')
      .addEventListener('click', this.firstSlideHandle.bind(this));
  }

  firstSlideHandle() {
    console.log('click');

    let currentPage = document.querySelector('#page').className;
    if (currentPage === 'home') {
      goToFirstSlide(this.state.slides);
    }
  }

  componentWillUnmount() {
    document.querySelector('.highlight').remove();
    // document.querySelector('.link-home').removeEventListener('click', this.firstSlideHandle);
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="slider">
          <Helmet>
            <title>Geeks</title>
            <meta name="description" content="We make games" />
          </Helmet>

          <div className="slider--wrap">
            {this.state.slides.map((slide, index) => {
              if (index === 0 && slide.black_text_color) {
                changeHeaderColor('black');
              }

              if (slide.video !== null) {
                return (
                  <SlideVideo slide={slide} index={index} key={slide.id} />
                );
              } else if (slide.image_main !== null) {
                return (
                  <SlideImage slide={slide} index={index} key={slide.id} />
                );
              } else {
                return (
                  <SlideDefault slide={slide} index={index} key={slide.id} />
                );
              }
            })}
          </div>
          <SlideControls slides={this.state.slides} />
          <SlideDots slides={this.state.slides} />
        </div>
      );
    }
    return false;
  }
}

export default Home;

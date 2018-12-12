import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {
    setDotNavigation,
    changeHeaderColor
} from '../scripts/slider';
import SlideImage from "../components/SlideImage";
import SlideVideo from "../components/SlideVideo";
import SlideDefault from "../components/SlideDefault";
import SlideControls from "../components/SlideControls";
import SlideDots from "../components/SlideDots";
import Config from '../config';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    sortByOrder(a, b) {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }

    async componentDidMount() {
        let response = await fetch(`${Config.host}/slides`);
        if (!response.ok) {
            return
        }

        let slides = await response.json();
        this.setState({
            loading: false,
            slides: slides.sort(this.sortByOrder)
        });

        setDotNavigation();
    }

    componentWillUnmount() {
        document.querySelector('.highlight').remove();
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

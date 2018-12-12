import React, { Component } from 'react';
import ParallaxMousemove from 'react-parallax-mousemove';
import SlideText from "./SlideText";
import Config from '../config';

const style = {
    outter: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    bgLayerStyle: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    }
};

class SlideImage extends Component {

    slide = this.props.slide;
    index = this.props.index;

    render() {
        return (
            <div key={this.slide.id} className={`slide slide-image slide-${this.index} ${(this.index === 0) ? 'active' : ''}`} data-index={this.index} >
                <SlideText slide={this.slide} />
                <div className="slide--images">
                    <div
                        className="slide-image-1"
                        style={{ backgroundImage: `url(${Config.host + this.slide.image_main.url})` }}
                        key={this.slide.image_main.id}>
                    </div>
                    {this.slide.image_layer_1 !== null &&
                        <ParallaxMousemove containerStyle={style.outter} >

                            {this.slide.image_layer_1 !== null &&
                                <ParallaxMousemove.Layer layerStyle={style.bgLayerStyle} config={{
                                    xFactor: 0.01,
                                    yFactor: 0,
                                    springSettings: {
                                        stiffness: 50,
                                        damping: 30
                                    }
                                }}>
                                    <div
                                        className="slide-image-2"
                                        style={{ backgroundImage: `url(${Config.host + this.slide.image_layer_1.url})` }}
                                        key={this.slide.image_layer_1.id}>
                                    </div>
                                </ParallaxMousemove.Layer>
                            }
                            {this.slide.image_layer_2 !== null &&
                                <ParallaxMousemove.Layer layerStyle={style.bgLayerStyle} config={{
                                    xFactor: 0.06,
                                    yFactor: 0,
                                    springSettings: {
                                        stiffness: 80,
                                        damping: 50
                                    }
                                }}>
                                    <div
                                        className="slide-image-3"
                                        style={{ backgroundImage: `url(${Config.host + this.slide.image_layer_2.url})` }}
                                        key={this.slide.image_layer_2.id}>
                                    </div>
                                </ParallaxMousemove.Layer>
                            }
                            {this.slide.image_layer_3 !== null &&
                                <ParallaxMousemove.Layer layerStyle={style.bgLayerStyle} config={{
                                    xFactor: -0.07,
                                    yFactor: 0,
                                    springSettings: {
                                        stiffness: 100,
                                        damping: 80
                                    }
                                }}>
                                    <div
                                        className="slide-image-4"
                                        style={{ backgroundImage: `url(${Config.host + this.slide.image_layer_3.url})` }}
                                        key={this.slide.image_layer_3.id}>
                                    </div>
                                </ParallaxMousemove.Layer>
                            }
                            {this.slide.image_layer_4 !== null &&
                                <ParallaxMousemove.Layer layerStyle={style.bgLayerStyle} config={{
                                    xFactor: -0.04,
                                    yFactor: 0,
                                    springSettings: {
                                        stiffness: 50,
                                        damping: 30
                                    }
                                }}>
                                    <div
                                        className="slide-image-5"
                                        style={{ backgroundImage: `url(${Config.host + this.slide.image_layer_4.url})` }}
                                        key={this.slide.image_layer_4.id}>
                                    </div>
                                </ParallaxMousemove.Layer>
                            }

                        </ParallaxMousemove>
                    }
                    {this.slide.image_layer_5 !== null &&
                        <div
                            className="slide-image-6"
                            style={{ backgroundImage: `url(${Config.host + this.slide.image_layer_5.url})` }}
                            key={this.slide.image_layer_5.id}>
                            <SlideText slide={this.slide} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SlideImage;

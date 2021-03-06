import React, { Component } from 'react';
import showdown from 'showdown';

const converter = new showdown.Converter();

const createElementFromHTML = (htmlString) => {
    return converter.makeHtml(htmlString.trim());
}


class SlideText extends Component {

    componentDidMount() {

        let isHasTitle = document.querySelector('.slide--desc a').title;

        if (!isHasTitle) {
            document.querySelectorAll('.slide--desc a').forEach((element) => {
                let linkText = element.innerHTML;
                element.title = linkText;
                element.classList.add('link-shadow', 'link-bg');
                element.target = "_blank";

                element.innerHTML = '';

                if (linkText) {
                    let wrapper = '';

                    wrapper = document.createElement('span');

                    wrapper.innerHTML = linkText;
                    let newText = wrapper;
                    element.appendChild(newText);

                }
            });
        }
    }

    render() {
        return (
            <div className="slide--text">
                <div className="slide--title">
                    <h1>{this.props.slide.title}</h1>
                </div>
                <div className="slide--bottom">
                    <div className="slide-info--wrap">
                        <div className="slide--btn">
                            {this.props.slide.button_steam !== "" &&
                                <a href={this.props.slide.button_steam} className="steam">
                                    <span>Download</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="23.274 22.154 55.114 25.231"><path fill="#333" d="M74.941 29.612a4.014 4.014 0 0 1-4.012 4.013c-2.216 0-3.988-1.797-3.988-4.013a4.012 4.012 0 0 1 8.026 0h-.026zm-4.037-7.458a7.442 7.442 0 0 0-7.458 7.409l-4.652 6.671c-.196-.025-.394-.025-.566-.025a5.646 5.646 0 0 0-2.855.788l-21.07-8.468a5.57 5.57 0 0 0-5.44-4.382 5.599 5.599 0 0 0-5.587 5.588 5.6 5.6 0 0 0 5.587 5.588 5.646 5.646 0 0 0 2.855-.788l21.07 8.468a5.57 5.57 0 0 0 5.44 4.382c2.88 0 5.269-2.215 5.538-5.021l7.164-5.243a7.453 7.453 0 0 0 7.458-7.458 7.453 7.453 0 0 0-7.458-7.458l-.026-.051zm0 2.461a5 5 0 0 1 4.997 4.997 5 5 0 0 1-4.997 4.997 5 5 0 0 1-4.996-4.997 5 5 0 0 1 4.996-4.997zm-42.067.985c1.575 0 2.929.886 3.619 2.166l-2.043-.812c-1.649-.591-3.471.221-4.11 1.846-.666 1.625.097 3.471 1.697 4.184l1.723.689a3.616 3.616 0 0 1-.886.099 4.103 4.103 0 0 1-4.111-4.111 4.103 4.103 0 0 1 4.111-4.111v.05zm29.366 12.062a4.101 4.101 0 0 1 4.111 4.11 4.102 4.102 0 0 1-4.111 4.11 4.055 4.055 0 0 1-3.619-2.19c.665.271 1.354.542 2.02.812a3.302 3.302 0 0 0 4.258-1.798 3.256 3.256 0 0 0-1.821-4.233l-1.698-.688c.295-.074.59-.1.886-.1l-.026-.023z" /></svg>
                                </a>
                            }

                            {this.props.slide.button_android !== "" &&
                                <a href={this.props.slide.button_android} className="google">
                                    <span>Download</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210">
                                        <path d="M190.32,90.03L36.784,2.266C34.137,0.754,31.19,0,28.243,0c-0.06,0-0.119,0.008-0.178,0.008  c-0.396,0.004-0.791,0.024-1.185,0.055c-0.178,0.014-0.355,0.033-0.533,0.053c-0.308,0.034-0.615,0.077-0.921,0.128  c-0.111,0.019-0.223,0.025-0.334,0.046l0.006,0.008c-1.913,0.353-3.78,1.027-5.515,2.034c-5.314,3.083-8.585,8.762-8.585,14.905  v175.527c0,6.143,3.271,11.822,8.585,14.905c1.734,1.007,3.601,1.682,5.514,2.035l-0.005,0.007c0.1,0.019,0.201,0.025,0.3,0.041  c0.329,0.056,0.659,0.102,0.99,0.137c0.166,0.018,0.331,0.036,0.497,0.049c0.389,0.031,0.777,0.049,1.167,0.054  c0.066,0.001,0.131,0.009,0.197,0.009c2.947,0,5.894-0.754,8.541-2.266L190.32,119.97c5.368-3.069,8.681-8.777,8.681-14.962  c0,0,0-0.003,0-0.004c0,0,0-0.003,0-0.004c0,0,0-0.003,0-0.004c0,0,0-0.003,0-0.004C199.001,98.808,195.688,93.1,190.32,90.03z   M129.602,72.601l-15.266,20.027L75.496,41.672L129.602,72.601z M182.876,106.947l-107.38,61.381l67.234-88.206l40.145,22.947  c0.695,0.397,1.127,1.141,1.127,1.938C184.001,105.807,183.569,106.551,182.876,106.947z"></path>
                                    </svg>
                                </a>
                            }

                            {this.props.slide.button_ios !== "" &&
                                <a href={this.props.slide.button_ios} className="ios">
                                    <span>Download</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" >
                                        <g><path d="M767.5,530.7C766.2,406.5,868.7,347,873.3,344.1c-57.5-84.3-147.2-95.8-179.3-97.2c-76.4-7.7-148.9,44.9-187.6,44.9c-38.6,0-98.4-43.8-161.7-42.7c-83.2,1.3-159.9,48.4-202.7,122.9c-86.4,150-22.2,372.2,62.1,493.8c41.2,59.5,90.3,126.4,154.7,124.1c62.1-2.5,85.5-40.2,160.5-40.2c75,0,96.1,40.2,161.8,38.9c66.8-1.3,109.1-60.7,150-120.4c47.3-69.1,66.7-136,67.9-139.3C897.6,728.3,768.8,679,767.5,530.7L767.5,530.7z M644.1,166.5c34.2-41.5,57.3-99,51-156.5c-49.3,2-109,32.8-144.4,74.2c-31.7,36.8-59.5,95.4-52,151.7C553.6,240.1,609.8,207.9,644.1,166.5L644.1,166.5z" /></g>
                                    </svg>
                                </a>
                            }
                        </div>
                        <div className="slide--desc" dangerouslySetInnerHTML={{ __html: createElementFromHTML(this.props.slide.description) }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SlideText;

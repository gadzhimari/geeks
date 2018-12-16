import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import showdown from 'showdown';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Config from '../config';

const settings = {
  className: 'article--slider',
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const dateformat = require('dateformat');
const converter = new showdown.Converter();

const createElementFromHTML = (htmlString) => {
  return converter.makeHtml(htmlString.trim());
};

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      article: {},
      nexPost: null,
    };
  }

  async componentDidMount() {
    let response = await fetch(
      `${Config.host}/articles/${this.props.match.params.id}`,
    );
    let data = await response.json();

    this.setState({
      article: data,
      loading: false,
    });

    this.getNextPostLink();
  }

  async getNextPostLink() {
    let response = await fetch(`${Config.host}/articles/`);
    let posts = await response.json();

    posts.forEach((post, index) => {
      if (post.id === this.state.article.id) {
        const currentPostIndex = index;

        if (posts[currentPostIndex + 1]) {
          this.setState({
            nextPost: posts[currentPostIndex + 1],
          });
        }
      }
    });

    return false;
  }

  render() {
    if (!this.state.loading) {
      var ms = Date.parse(this.state.article.createdAt);
      var formatedDate = dateformat(ms, 'dd.mm.yyyy');
      const listBeforeSlider = this.state.article.list_before_slider.split('#');
      const listAfterSlider = this.state.article.list_after_slider.split('#');
      listBeforeSlider.shift();
      listAfterSlider.shift();

      return (
        <div className="article">
          <div className="article--wrap">
            <div className="article__information">
              <h1 className="article-title">{this.state.article.title}</h1>
              <span className="article-created">{formatedDate}</span>
            </div>
            <div className="article-container">
              <div className="article--sidebar">
                <div className="block-subtitle">
                  {this.state.article.excerpt}
                </div>
              </div>
              <div className="article--content">
                <div
                  className="article--description"
                  dangerouslySetInnerHTML={{
                    __html: createElementFromHTML(this.state.article.text),
                  }}
                />
                <div className="article--list">
                  {listBeforeSlider.map((listItem, index) => {
                    return (
                      <div key={index}>
                        <span>0{index + 1}</span>
                        {listItem}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {this.state.article.slider.length > 0 && (
            <Slider {...settings}>
              {this.state.article.slider.map((slide, index) => {
                return (
                  <div key={index} className="article--slide">
                    <img src={Config.host + slide.url} alt={slide.name} />
                  </div>
                );
              })}
            </Slider>
          )}

          <div className="">
            <div className="article-container">
              <div className="article--sidebar bottom">
                <div className="block-subtitle">Share</div>
                <div className="block--social">
                  <a href="#" target="_blank" title="Facebook">
                    Facebook
                  </a>
                  <a href="#" target="_blank" title="Vkontakte">
                    Vkontakte
                  </a>
                  <a href="#" target="_blank" title="Twitter">
                    Twitter
                  </a>
                </div>
              </div>
              <div className="article--content">
                <div className="article--description">
                  <h3>{this.state.article.title_before_list}</h3>
                </div>
                <div className="article--list small">
                  {listAfterSlider.map((listItem, index) => {
                    return (
                      <div key={index}>
                        <span>0{index + 1}</span>
                        {listItem}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="article--footer">
            <div className="container--entry">
              <div className="">
                <div className="footer--wrap">
                  <div className="article--sidebar">
                    <div className="block-subtitle black">
                      <h1>Write Us</h1>
                    </div>
                  </div>
                  <div className="article--content">
                    {this.state.nextPost && (
                      <div className="article--next">
                        <span>Next article</span>
                        <Link to={`/blog/${this.state.nextPost.id}`}>
                          <span>{this.state.nextPost.title}</span>
                          <svg
                            width="128px"
                            height="111px"
                            viewBox="0 0 128 111"
                            version="1.1"
                          >
                            <g
                              id="1—Main"
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                              opacity="0.104007"
                            >
                              <g
                                id="geeks-0"
                                transform="translate(-656.000000, -349.000000)"
                                stroke="#000000"
                              >
                                <g
                                  id="Loader"
                                  transform="translate(656.000000, 349.000000)"
                                >
                                  <path
                                    d="M44.9166403,55.5369301 L44.8369987,55.5369301 L63.9524064,22.4286464 L83.0157557,55.4465401 L83.0312588,55.4465401 L105.420741,94.2884328 L60.6847967,94.2630776 L60.6846529,94.26279 L60.4569769,94.2629277 L60.3663543,94.2628816 L22.5792027,94.2885298 L44.9166403,55.5369301 Z M124.387365,105.270834 L125.257201,105.270834 L124.825141,104.519191 L124.387365,105.270834 Z M121.341493,110.500465 L121.039208,111.019476 L121.275252,111.313622 L121.665216,111.000688 L121.66556,110.500688 L121.341493,110.500465 Z M7.19906326,110.500093 L6.33411522,110.500688 L6.33445935,111.000688 L6.72207684,111.316524 L6.74351765,111.290211 L7.19906326,110.500093 Z M38.8584991,55.4465401 L37.9924622,55.4465401 L37.9924622,55.9465401 L38.425472,56.1965451 L38.8584991,55.4465401 Z M35.2763762,50.2882595 L35.4205181,50.5380322 L35.8535792,50.2881159 L35.4203938,50.0384152 L35.2763762,50.2882595 Z M3.59617042,105.247645 L3.16367266,105.99795 L4.02969954,105.997354 L3.59617042,105.247645 Z M0.577348483,100.027144 L0.432841547,99.7772459 L0.433186124,100.277241 L0.577348483,100.027144 Z M26.1876207,55.4371191 L25.3215944,55.4371191 L25.3215944,55.9371191 L25.7546068,56.1871195 L26.1876207,55.4371191 Z M57.6170973,0.99978472 L58.0499864,0.2500004 L57.616974,0 L57.1524094,0.184877731 L57.165079,0.216714082 L57.6170973,0.99978472 Z M89.1114668,55.5369301 L89.4003731,55.5369301 L89.4003731,55.0369301 L88.9671872,55.2866298 L89.1114668,55.5369301 Z M95.6866267,55.4465401 L95.3979519,55.4465401 L95.3979519,55.9465401 L95.8309643,55.6965397 L95.6866267,55.4465401 Z M63.9685986,0.509420961 L63.5355847,-0.240579438 L63.1025722,0.509420961 L63.9685986,0.509420961 Z M69.9991644,0.509420961 L70.2878418,0.509420961 L69.8548274,0.259417931 L69.9991644,0.509420961 Z M95.7375866,45.0593247 L96.1735672,44.322668 L95.7432788,44.0680076 L95.3100944,44.3177099 L95.7375866,45.0593247 Z M127.126697,99.5132482 L127.508666,100.175888 L127.584214,100.290956 L128,100.013248 L128,99.5132482 L127.126697,99.5132482 Z M105.055126,99.5132482 L104.555126,99.5132482 L104.555126,100.013248 L105.055126,100.013248 L105.055126,99.5132482 Z"
                                    id="Fill-6"
                                  />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <h2>Waiting for API...</h2>;
  }
}

export default Article;

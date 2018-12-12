import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import showdown from 'showdown';
import $ from "jquery";
import slick from 'slick-carousel';
import Config from '../config';

const dateformat = require('dateformat');
const converter = new showdown.Converter();

const createElementFromHTML = (htmlString) => {
    return converter.makeHtml(htmlString.trim());
}

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            article: {},
            nexPost: null
        }
    }

    async componentDidMount() {
        let response = await fetch(`${Config.host}/articles/${this.props.match.params.id}`);
        let data = await response.json();

        this.setState({
            article: data,
            loading: false
        });

        this.getNextPostLink();

        if (this.state.article.slider.length > 0) {
            setTimeout(() => {
                $(".article--slider").slick({
                    arrows: false,
                    dots: true,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                });
            }, 300);
        }
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
            var formatedDate = dateformat(ms, "dd.mm.yyyy");
            const listBeforeSlider = this.state.article.list_before_slider.split('#');
            const listAfterSlider = this.state.article.list_after_slider.split('#');
            listBeforeSlider.shift();
            listAfterSlider.shift();

            return (
                <div className="article">
                    <div className="container">
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
                                <div className="article--description" dangerouslySetInnerHTML={{ __html: createElementFromHTML(this.state.article.text) }}>
                                </div>
                                <div className="article--list">
                                    {listBeforeSlider.map((listItem, index) => {
                                        return (
                                            <div key={index}><span>0{index + 1}</span>{listItem}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.article.slider.length > 0 &&
                        <div className="article--slider">
                            {this.state.article.slider.map((slide, index) => {
                                return (
                                    <div key={index} className="article--slide">
                                        <img src={Config.host + slide.url} alt={slide.name} />
                                    </div>
                                )
                            })}
                        </div>
                    }

                    <div className="container">
                        <div className="article-container">
                            <div className="article--sidebar bottom">
                                <div className="block-subtitle">
                                    Share
                                </div>
                                <div className="block--social">
                                    <a href="#" target="_blank" title="Facebook">Facebook</a>
                                    <a href="#" target="_blank" title="Vkontakte">Vkontakte</a>
                                    <a href="#" target="_blank" title="Twitter">Twitter</a>
                                </div>
                            </div>
                            <div className="article--content">
                                <div className="article--description">
                                    <h3>{this.state.article.title_before_list}</h3>
                                </div>
                                <div className="article--list small">
                                    {listAfterSlider.map((listItem, index) => {
                                        return (
                                            <div key={index}><span>0{index + 1}</span>{listItem}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="article--footer">
                        <div className="container--entry">
                            <div className="container">
                                <div className="footer--wrap">
                                    <div className="block-subtitle black">
                                        <h1>Write Us</h1>
                                    </div>
                                    {this.state.nextPost &&
                                        <div className="article--next">
                                            <span>Next article</span>
                                            <Link to={`/blog/${this.state.nextPost.id}`}>
                                                <span>{this.state.nextPost.title}</span>
                                                <svg viewBox="0 0 12 21" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="8—Article">
                                                        <g id="g—article—1" transform="translate(-1284.000000, -2500.000000)">
                                                            <g id="Content" transform="translate(0.000000, 215.000000)">
                                                                <g id="Futor" transform="translate(71.000000, 2176.000000)">
                                                                    <polygon id="arrow" points="1221.02418 119.142136 1213.00336 111.12132 1213 109.710471 1213.708 109.002469 1215.12468 109 1224.56408 118.439391 1224.55971 119.849242 1215.12468 129.284271 1213.71384 129.287636 1213.00583 128.579634 1213.00336 127.162951"></polygon>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (<h2>Waiting for API...</h2>);
    }
}

export default Article;

import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Header extends Component {
    componentDidMount() {
        let link = window.location.pathname.split('/');
        link.shift();

        let linkClass = link[0];

        if (!linkClass) {
            linkClass = 'home';
        }

        if (linkClass === 'games' && link[1]) {
            linkClass = 'game';
        }

        document.body.classList.remove('show-menu');

        setTimeout(() => {
            document.body.classList.remove('overlay');
        }, 500);

        setTimeout(() => {
            document.querySelector('#page').className = '';
            document.querySelector('#page').classList.add(linkClass);

            document.querySelectorAll('.menu-top a').forEach(element => {
                element.classList.remove('active');

                if (linkClass === element.dataset.target) {
                    element.classList.add('active');
                }
            });
        }, 500);
    }

    handleClick(e) {
        let linkClass = e.currentTarget.dataset.class;

        setTimeout(() => {
            document.querySelector('#page').className = '';
            document.querySelector('#page').classList.add(linkClass);
        }, 500);
    }

    closeMenu() {
        document.body.classList.remove('show-menu');

        setTimeout(() => {
            document.body.classList.remove('overlay');
        }, 500);
    }

    render() {
        return (
            <header>
                <div className="container">
                    <nav className="menu-top">
                        <button id="close-menu" onClick={this.closeMenu}>
                            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="10—Menu">
                                    <g id="g—menu—t" transform="translate(-76.000000, -38.000000)">
                                        <g id="Head" transform="translate(76.000000, 38.000000)">
                                            <polygon id="Combined-Shape" points="7.78253695 5.66021866 13.4393912 0.00336440785 14.8502404 0 15.5582424 0.708002022 15.5607115 2.12468475 9.9038573 7.781539 15.5607115 13.4383933 15.5571174 14.8562009 14.8492424 15.564076 13.4393912 15.5597136 7.78253695 9.90285934 2.1256827 15.5597136 0.707875009 15.5561195 0 14.8482445 0.00436236047 13.4383933 5.66121661 7.781539 0.00436236047 2.12468475 0.000997952619 0.713835597 0.708999974 0.00583357537 2.1256827 0.00336440785"></polygon>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <div className="nav--left">
                            <Link to="/about" data-target="about" title="About Us" className="link-shadow">
                                <span onClick={this.handleClick.bind(this)} data-class="about">About Us</span>
                            </Link>
                            <Link to="/games" data-target="games" title="Games" className="link-shadow">
                                <span onClick={this.handleClick.bind(this)} data-class="games">Games</span>
                            </Link>
                        </div>
                        <div className="nav--center">
                            <Link to="/" className="link-home">
                                <span onClick={this.handleClick.bind(this)} data-class="home" className="logo"></span>
                            </Link>
                        </div>
                        <div className="nav--right">
                            <Link to="/outsource" data-target="outsource" title="Outsource" className="link-shadow">
                                <span onClick={this.handleClick.bind(this)} data-class="outsource">Outsource</span>
                            </Link>
                            <Link to="/contact" data-target="contact" title="Contact" className="link-shadow">
                                <span onClick={this.handleClick.bind(this)} data-class="contact">Contact</span>
                            </Link>
                            <Link to="/blog" data-target="blog" title="Blog" className="link-shadow">
                                <span onClick={this.handleClick.bind(this)} data-class="blog">Blog</span>
                            </Link>
                        </div>

                        <div className="block-subtitle black"><h1>Write Us</h1></div>
                    </nav>
                </div>
            </header>
        );
    }

}

export default Header;

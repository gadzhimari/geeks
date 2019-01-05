import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconClose } from './close.svg';

import { Logo } from '../../components';

import './Header.scss';

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

      document.querySelectorAll('.menu-top a').forEach((element) => {
        element.classList.remove('active');

        if (linkClass === element.dataset.target) {
          element.classList.add('active');
        }
      });
    }, 500);
  }

  handleClick = (e) => {
    let linkClass = e.currentTarget.dataset.class;

    setTimeout(() => {
      document.querySelector('#page').className = '';
      document.querySelector('#page').classList.add(linkClass);
    }, 500);
  };

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
              <IconClose />
            </button>
            <div className="nav--left">
              <Link
                to="/about"
                data-target="about"
                title="About Us"
                className="link-shadow"
              >
                <span onClick={this.handleClick} data-class="about">
                  About Us
                </span>
              </Link>
              <Link
                to="/games"
                data-target="games"
                title="Games"
                className="link-shadow"
              >
                <span onClick={this.handleClick} data-class="games">
                  Games
                </span>
              </Link>
            </div>
            <div className="nav--center">
              <Link to="/" className="link-home">
                <Logo onClick={this.handleClick} data-class="home" />
              </Link>
            </div>
            <div className="nav--right">
              <Link
                to="/outsource"
                data-target="outsource"
                title="Outsource"
                className="link-shadow"
              >
                <span onClick={this.handleClick} data-class="outsource">
                  Outsource
                </span>
              </Link>
              <Link
                to="/contact"
                data-target="contact"
                title="Contact"
                className="link-shadow"
              >
                <span onClick={this.handleClick} data-class="contact">
                  Contact
                </span>
              </Link>
              <Link
                to="/blog"
                data-target="blog"
                title="Blog"
                className="link-shadow"
              >
                <span onClick={this.handleClick} data-class="blog">
                  Blog
                </span>
              </Link>
            </div>

            <div className="block-subtitle black">
              <h1>Write Us</h1>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;

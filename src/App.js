import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import Home from './pages/Home';
import Games from './pages/Games';
import Game from './pages/Game';
import { Blog } from './pages';
import Article from './pages/Article';
import Contact from './pages/Contact';
import Outsource from './pages/Outsource';
import About from './pages/About';
import Member from './pages/Member';
import { Logo, Header } from '../src/components';

import './styles/index.scss';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 500, beforeChildren: true },
  exit: { opacity: 0 },
});

function openMenu() {
  document.body.classList.add('show-menu', 'overlay');
}

let procent = 0;
function timeout_trigger() {
  document.querySelector('.timer span').innerText = procent;

  if (procent !== 100) {
    setTimeout(timeout_trigger, 30);
  }
  procent++;
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.preloader').classList.add('active');
  timeout_trigger();

  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hide');
  }, 5000);

  setTimeout(() => {
    document.querySelector('.preloader').classList.remove('active');
  }, 5500);
});

class App extends Component {
  handleClick = (e) => {
    let linkClass = e.currentTarget.dataset.class;

    if (document.querySelector('#page').classList.contains(linkClass)) {
      e.preventDefault();
    }

    setTimeout(() => {
      document.querySelector('#page').className = '';
      document.querySelector('#page').classList.add(linkClass);
    }, 500);
  };

  render() {
    return (
      <Route
        render={({ location }) => (
          <div id="page">
            <PoseGroup>
              <RouteContainer key={location.pathname}>
                <div className="app">
                  <div className="preloader">
                    <div className="preloader--wrap">
                      <div className="timer">
                        <span>0</span>
                      </div>
                      <svg
                        width="128px"
                        height="111px"
                        viewBox="0 0 128 111"
                        version="1.1"
                      >
                        <defs>
                          <linearGradient id="left-to-right">
                            <stop offset="0" stopColor="black">
                              <animate
                                begin="2s"
                                dur="1s"
                                attributeName="offset"
                                fill="freeze"
                                from="0"
                                to="1"
                              />
                            </stop>
                            <stop offset="0" stopColor="transparent">
                              <animate
                                begin="2s"
                                dur="1s"
                                attributeName="offset"
                                fill="freeze"
                                from="0"
                                to="1"
                              />
                            </stop>
                          </linearGradient>
                          <linearGradient id="top-to-bottom">
                            <stop offset="0" stopColor="black">
                              <animate
                                begin="0s"
                                dur="1s"
                                attributeName="offset"
                                fill="freeze"
                                from="0"
                                to="1"
                              />
                            </stop>
                            <stop offset="0" stopColor="transparent">
                              <animate
                                begin="0s"
                                dur="1s"
                                attributeName="offset"
                                fill="freeze"
                                from="0"
                                to="1"
                              />
                            </stop>
                          </linearGradient>
                          <linearGradient id="right-to-left">
                            <stop offset="1" stopColor="transparent">
                              <animate
                                begin="1s"
                                dur="1s"
                                attributeName="offset"
                                fill="freeze"
                                from="1"
                                to="0"
                              />
                            </stop>
                            <stop offset="0" stopColor="black">
                              <animate
                                begin="1s"
                                dur="1s"
                                attributeName="offset"
                                fill="freeze"
                                from="1"
                                to="0"
                              />
                            </stop>
                          </linearGradient>
                        </defs>

                        <g id="1—Main" stroke="none" strokeWidth="1">
                          <g
                            id="geeks-0-t"
                            transform="translate(-85.000000, -506.000000)"
                          >
                            <g
                              id="Logo-3pieces"
                              transform="translate(85.000000, 506.000000)"
                            >
                              <path
                                fill="url(#left-to-right)"
                                d="M13.5420705,111.000688 L6.33445935,111.000688 L6.35590016,110.974374 L60.3495618,17.2239787 L63.9413168,23.4478409 L13.5420705,111.000688 Z M57.6045438,12.4673587 L3.59685799,106.24765 L-2.84217094e-14,100.027542 L54.0167234,6.25031461 L57.6045438,12.4673587 Z"
                                id="Shape"
                              />
                              <path
                                fill="url(#right-to-left)"
                                d="M13.4875762,111.000688 L23.4437924,93.7885431 L124.403902,93.7885431 L127.94185,99.9261856 L128,100.013248 L104.555126,100.013248 L104.555126,100.010649 L102.040054,100.009025 L63.9998376,99.9830362 L25.9596208,100.009025 L19.8564623,100.013248 L17.113988,104.770834 L125.257201,104.770834 L121.6441,110.974374 L121.665216,111.000688 L13.4875762,111.000688 Z"
                                id="Combined-Shape"
                              />
                              <path
                                fill="url(#top-to-bottom)"
                                d="M63.9448536,23.4417151 L60.3524703,17.2189285 L60.3597731,17.2062485 L57.6143751,12.4502874 L57.6069755,12.4631362 L54.0185322,6.24717444 L57.616974,-2.55795385e-13 L57.6296435,0.0318363514 L89.3867289,55.0369301 L89.4003731,55.0369301 L111.737472,93.7879421 L117.221121,93.7879421 L95.4080225,55.9465401 L95.3979519,55.9465401 L63.1025722,0.00942096113 L70.2878418,0.00942096113 L95.7338578,44.0839257 L95.7432788,44.0680076 L124.404198,93.7890569 L104.556018,93.7890569 L104.390099,93.5016484 L82.7423524,55.9465401 L82.727084,55.9465401 L63.9524079,23.4286309 L63.9448536,23.4417151 Z"
                                id="Combined-Shape"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <Header />

                  <main className="app-content">
                    <div className="mobile-menu">
                      <button id="open-menu" onClick={openMenu}>
                        <svg
                          width="21px"
                          height="14px"
                          viewBox="0 0 21 14"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="1—Main">
                            <g
                              id="geeks-1-t"
                              transform="translate(-76.000000, -40.000000)"
                            >
                              <path
                                d="M77,40 L96,40 L97,41.0050829 L97,42.0061693 L96,43 L77,43 L76,42.004758 L76,41.0034919 L77,40 Z M77,51 L96,51 L97,52.0050829 L97,53.0061693 L96,54 L77,54 L76,53.004758 L76,52.0034919 L77,51 Z"
                                id="menu—icon"
                              />
                            </g>
                          </g>
                        </svg>
                      </button>
                      <div className="logo-mobile">
                        <Link to="/" className="link-home">
                          <Logo
                            color="#fff"
                            data-class="home"
                            onClick={this.handleClick}
                          />
                        </Link>
                      </div>
                    </div>

                    <Switch location={location}>
                      <Route path="/" exact component={Home} key="home" />
                      <Route
                        path="/about"
                        exact
                        component={About}
                        key="about"
                      />
                      <Route path="/blog" exact component={Blog} key="blog" />
                      <Route
                        path="/outsource"
                        exact
                        component={Outsource}
                        key="outsource"
                      />
                      <Route
                        path="/contact"
                        exact
                        component={Contact}
                        key="contact"
                      />
                      <Route
                        path="/games"
                        exact
                        component={Games}
                        key="games"
                      />
                      <Route path="/games/:id" component={Game} key="game" />
                      <Route path="/team/:id" component={Member} key="team" />
                      <Route
                        path="/blog/:id"
                        component={Article}
                        key="article"
                      />
                    </Switch>
                  </main>
                </div>
              </RouteContainer>
            </PoseGroup>
          </div>
        )}
      />
    );
  }
}

export default App;

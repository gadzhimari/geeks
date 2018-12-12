import React, { Component } from 'react';
import { Route, Switch } from "react-router";
import posed, { PoseGroup } from 'react-pose';
import Home from './pages/Home';
import Games from './pages/Games';
import Game from './pages/Game';
import Blog from './pages/Blog';
import Article from './pages/Article';
import Contact from './pages/Contact';
import Outsource from './pages/Outsource';
import About from './pages/About';
import Member from './pages/Member';
import Header from './components/Header';
import './styles/index.scss';
import { Link } from 'react-router-dom';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 500, beforeChildren: true },
  exit: { opacity: 0 }
});

function openMenu() {
  document.body.classList.add('show-menu', 'overlay');
}

function handleClick(e) {
  let linkClass = e.currentTarget.dataset.class;

  if (document.querySelector('#page').classList.contains(linkClass)) {
    e.preventDefault();
  }

  setTimeout(() => {
    document.querySelector('#page').className = '';
    document.querySelector('#page').classList.add(linkClass);
  }, 500);
}

const App = (props) => (
  <Route
    render={({ location }) => (
      <div id="page">
        <PoseGroup>
          <RouteContainer key={location.pathname}>
            <div className="app">
              <Header />
              <main className="app-content">
                <div className="mobile-menu">
                  <button id="open-menu" onClick={openMenu}>
                    <svg width="21px" height="14px" viewBox="0 0 21 14" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                      <g id="1—Main">
                        <g id="geeks-1-t" transform="translate(-76.000000, -40.000000)">
                          <path d="M77,40 L96,40 L97,41.0050829 L97,42.0061693 L96,43 L77,43 L76,42.004758 L76,41.0034919 L77,40 Z M77,51 L96,51 L97,52.0050829 L97,53.0061693 L96,54 L77,54 L76,53.004758 L76,52.0034919 L77,51 Z" id="menu—icon"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <div className="logo-mobile">
                    <Link to="/" className="link-home">
                      <span onClick={handleClick.bind(this)} data-class="home" className="logo"></span>
                    </Link>
                  </div>
                </div>
                <Switch location={location}>
                  <Route path="/" exact component={Home} key="home" />
                  <Route path="/about" exact component={About} key="about" />
                  <Route path="/blog" exact component={Blog} key="blog" />
                  <Route path="/outsource" exact component={Outsource} key="outsource" />
                  <Route path="/contact" exact component={Contact} key="contact" />
                  <Route path="/games" exact component={Games} key="games" />
                  <Route path="/games/:id" component={Game} key="game" />
                  <Route path="/team/:id" component={Member} key="team" />
                  <Route path="/blog/:id" component={Article} key="article" />
                </Switch>
              </main>
            </div >
          </RouteContainer>
        </PoseGroup>
      </div >
    )}
  />
);

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="left">
        Made by <a href="https://snipcart.com/blog" target="_blank" rel="noopener noreferrer">Snipcart</a> and ⚡ by <a href="https://strapi.io/">Strapi</a>
      </div>
      <div className="right">
        <a href="https://github.com/snipcart/snipcart-strapi-react" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub</a>
        <a href="https://twitter.com/snipcart" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a>
      </div>
    </footer>
  );
}

export default App;

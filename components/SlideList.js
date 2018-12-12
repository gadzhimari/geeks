import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import posed from 'react-pose';
import Config from '../config';

class SlideList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: []
    }
  }

  async componentDidMount() {
    let response = await fetch(`${Config.host}/slides`);
    if (!response.ok) {
      return
    }

    let slides = await response.json()
    this.setState({ loading: false, slides: slides })
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="SlideList">
          {/* <h2 className="SlideList-title">Available slides ({this.state.slides.length})</h2> */}
          <div className="SlideList-container">
            {this.state.slides.map((slide, index) => {
              return (
                <div className="SlideList-slide" key={slide.id}>
                  <Link to={`/slides/${slide.id}`}>
                    <h3>{slide.title}</h3>
                    <img src={`${Config.host + slide.image_main.url}`} alt={slide.title} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (<h2 className="SlideList-title">Waiting for API...</h2>);
  }
}

export default SlideList;

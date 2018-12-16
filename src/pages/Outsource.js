import React, { Component } from 'react';
import Config from '../config';

class Outsources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      outsources: []
    }
  }

  async componentDidMount() {
    let response = await fetch(`${Config.host}/outsources`);
    if (!response.ok) {
      return
    }

    let outsources = await response.json();
    this.setState({ loading: false, outsources: outsources });
  }

  openGallery(e) {
    const index = e.currentTarget.dataset.index;

    document.querySelectorAll('.oursource--control .item').forEach(element => {
      element.classList.remove('active')
    });

    document.querySelector('#currentImage').src = Config.host + this.state.outsources[index].image.url;
    document.querySelector('.app').classList.add('active', 'show');
    document.querySelector(`.oursource--control .item[data-index="${index}"]`).classList.add('active');
  }

  openImage(e) {
    const index = e.currentTarget.dataset.index;

    document.querySelector('#currentImage').src = Config.host + this.state.outsources[index].image.url;

    document.querySelectorAll('.oursource--control .item').forEach(element => {
      element.classList.remove('active')
    });

    document.querySelector(`.oursource--control .item[data-index="${index}"]`).classList.add('active');
  }

  closeGallery() {
    document.querySelector('.app').classList.remove('active');

    setTimeout(() => {
      document.querySelector('.app').classList.remove('show');
    }, 500);
  }

  categorySwitcher(element) {
    const category = element.target.dataset.category;

    document.querySelectorAll('.category-switch').forEach(switcher => {
      switcher.classList.remove('active');
    });
    element.target.classList.add('active');

    document.querySelectorAll('.item').forEach(item => {
      if (item.dataset.category === category) {
        item.classList.add('hide');

        setTimeout(() => {
          item.classList.add('showed');
        }, 300);
      } else {
        item.classList.remove('hide');

        setTimeout(() => {
          item.classList.remove('showed');
        }, 400);

      }
    });
    console.log(element.target.dataset.category);
  }

  render() {

    const outsources = this.state.outsources;

    console.log(outsources);

    let categories = ['All'];
    outsources.forEach(item => {
      if (item.tag && (categories.includes(item.tag) === false)) {
        categories.push(item.tag);
      }
    });

    if (!this.state.loading) {
      return (
        <div className="oursource">
          <div className="container">
            <div className="slider-games--header">
              <div className="block-title">
              </div>
              <div className="slider-games--filter">
                {
                  categories.map((category, index) => (
                    <button className={`category-switch link-shadow ${(index === 0) ? 'active' : ''}`} data-category={category} onClick={this.categorySwitcher.bind(this)} key={index} title={category}><span>{category}</span></button>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="oursource-container">
            {this.state.outsources.map((outsource, index) => {
              return (
                <button className="item" key={outsource.id} data-category={outsource.tag} style={{ backgroundImage: `url(${Config.host + outsource.image.url})` }} data-index={index} onClick={this.openGallery.bind(this)}>
                </button>
              );
            })}
          </div>

          <div className="oursource-modal">
            <div className="modal--wrap">
              <button className="oursource--close" onClick={this.closeGallery}>
                <svg viewBox="0 0 16 16" version="1.1"><g id="2—Member"><g id="g—member-1" transform="translate(-72.000000, -37.000000)" fill="#ffffff"><g id="Head" transform="translate(65.000000, 30.000000)"><g id="Close" transform="translate(14.849242, 14.849242) rotate(-45.000000) translate(-14.849242, -14.849242) translate(4.349242, 4.349242)"><polygon id="Rectangle-2" points="1 9 20 9 21 10.0050829 21 11.0061693 20 12 1 12 0 11.004758 0 10.0034919"></polygon><polygon id="Rectangle-2-Copy" transform="translate(10.500000, 10.500000) rotate(-270.000000) translate(-10.500000, -10.500000) " points="1 9 20 9 21 10.0050829 21 11.0061693 20 12 1 12 0 11.004758 0 10.0034919"></polygon></g></g></g></g></svg>
              </button>
              <div className="oursource--image">
                <img id="currentImage" src="" alt="" />
              </div>
              <div className="oursource--control">
                {this.state.outsources.map((outsource, index) => {
                  return (
                    <button className="item" key={outsource.id} data-category={outsource.tag} style={{ backgroundImage: `url(${Config.host + outsource.image.url})` }} data-index={index} onClick={this.openImage.bind(this)}>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (<h2 className="oursource-title">Waiting for API...</h2>);
  }
}

export default Outsources;

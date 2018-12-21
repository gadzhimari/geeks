import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import dragscroll from 'dragscroll';
import Carousel from '../components/Carousel';
import { DOMAIN_URL } from '../config';
import { Games as GamesApi } from '../api';

class Games extends Component {
  state = {
    loading: true,
    games: [],
    transLeftOffset: 0,
  };

  sortByOrder(a, b) {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  }

  gameCategory(element) {
    const category = element.target.dataset.category;

    document.querySelectorAll('.category-switch').forEach((switcher) => {
      switcher.classList.remove('active');
    });
    element.target.classList.add('active');

    document.querySelectorAll('.item').forEach((item) => {
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
  }

  async componentDidMount() {
    const { data: games } = await GamesApi.getGames();

    this.setState({ loading: false, games });

    function giveMeIntValOf(el) {
      return parseInt(el.replace('translateX(', '').replace('px)', ''), 10);
    }

    function updateCarouselCoord(that) {
      let carousel = document.querySelector('.cWrapper');
      let transLeftOffset = giveMeIntValOf(carousel.style.transform);

      that.setState({ transLeftOffset: transLeftOffset });
    }

    let carousel = document.querySelector('.cWrapper');
    updateCarouselCoord(this);

    document.querySelectorAll('.item a').forEach((element) => {
      let checkSliderCoord = (event) => {
        let newTransLeftOffset = giveMeIntValOf(carousel.style.transform);

        if (this.state.transLeftOffset !== newTransLeftOffset) {
          event.preventDefault();
        }

        updateCarouselCoord(this);
      };

      element.addEventListener('click', checkSliderCoord);
    });

    document.querySelector('.cWrapper').addEventListener('mouseup', () => {
      updateCarouselCoord(this);
    });
  }

  render() {
    const games = this.state.games;

    let categories = ['All'];
    games.forEach((game) => {
      if (game.tag && categories.includes(game.tag) === false) {
        categories.push(game.tag);
      }
    });

    const setting = {
      dragSpeed: 1.25,
      itemWidth: 288,
      itemHeight: 162,
      itemSideOffsets: 0,
    };

    const itemStyle = {
      width: `${setting.itemWidth}px`,
      height: `${setting.itemHeight}px`,
      margin: `0px ${setting.itemSideOffsets}px`,
    };

    if (!this.state.loading) {
      return (
        <div className="GameList">
          <div className="container">
            <section className="slider-games">
              <div className="slider-games--header">
                <div className="block-title">
                  <h1>Games</h1>
                </div>
                <div className="slider-games--filter">
                  {categories.map((category, index) => (
                    <button
                      className={`category-switch link-shadow
                      ${index === 0 ? 'active' : ''}`}
                      data-category={category}
                      onClick={this.gameCategory.bind(this)}
                      key={index}
                      title={category}
                    >
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Carousel _data={games} {...setting}>
                {games.map((game, index) => (
                  <div
                    key={index}
                    className="item"
                    data-category={game.tag}
                    style={{ ...itemStyle }}
                  >
                    <Link
                      to={`/games/${game.id}`}
                      // onClick={this.handleLink.bind(this)}
                    >
                      <div
                        className="item--image"
                        style={{
                          backgroundImage: `url(${DOMAIN_URL +
                            game.image.url})`,
                        }}
                      />
                    </Link>
                    <div className="item--info">
                      <div className="item--name">{game.name}</div>
                      <div className="item--category">{game.tag}</div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </section>
          </div>

          {/* <div className="container">
            <div className="GameList-container">
              {this.state.games.map((game, index) => {
                return (
                  <div className="GameList-game" key={game.id}>
                    <Link to={`/games/${game.id}`}>
                      <h3>{game.name}</h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      );
    }

    return <h2 className="GameList-title">Waiting for API...</h2>;
  }
}

export default Games;

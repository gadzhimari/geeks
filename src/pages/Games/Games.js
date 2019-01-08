import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cn from 'cn-decorator';

import { Carousel } from '../../components';
import { DOMAIN_URL } from '../../config';
import { Games as GamesApi } from '../../api';
import './Games.scss';

const settings = {
  dragSpeed: 1.25,
  itemWidth: 288,
  itemHeight: 162,
  itemSideOffsets: 0,
};

@cn('Games')
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

  handleClick = (e) => {
    const { category } = e.target.dataset;

    document.querySelectorAll('.Games__filterCategory').forEach((switcher) => {
      switcher.classList.remove('active');
    });
    e.target.classList.add('active');

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
  };

  async componentDidMount() {
    const { data: games } = await GamesApi.getGames();

    this.setState({ loading: false, games });

    function giveMeIntValOf(el) {
      return parseInt(el.replace('translateX(', '').replace('px)', ''), 10);
    }

    function updateCarouselCoord(that) {
      let carousel = document.querySelector('.Carousel__wrapper');
      let transLeftOffset = giveMeIntValOf(carousel.style.transform);

      that.setState({ transLeftOffset: transLeftOffset });
    }

    let carousel = document.querySelector('.Carousel__wrapper');
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

    document
      .querySelector('.Carousel__wrapper')
      .addEventListener('mouseup', () => {
        updateCarouselCoord(this);
      });
  }

  renderHeader(cn) {
    const { games } = this.state;
    let categories = ['All'];
    games.forEach((game) => {
      if (game.tag && categories.includes(game.tag) === false) {
        categories.push(game.tag);
      }
    });

    return (
      <div className={cn('header')}>
        <div className="container">
          <div className="row">
            <div className="col-16 offset-2 col-l-12 offset-l-4">
              <div className={cn('headerWrapper')}>
                <h1 className={cn('title')}>Games</h1>
                <div className={cn('filter')}>
                  {categories.map((category, index) => (
                    <button
                      className={`Games__filterCategory link-shadow
                          ${index === 0 ? 'active' : ''}`}
                      data-category={category}
                      onClick={this.handleClick}
                      key={index}
                      title={category}
                    >
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render(cn) {
    const { games } = this.state;

    const itemStyle = {
      width: `${settings.itemWidth}px`,
      height: `${settings.itemHeight}px`,
      margin: `0px ${settings.itemSideOffsets}px`,
    };

    if (!this.state.loading) {
      return (
        <div className={cn()}>
          {this.renderHeader(cn)}

          <div className={cn('carousel')}>
            <Carousel _data={games} {...settings}>
              {games.map((game, index) => (
                <div
                  key={index}
                  className="item"
                  data-category={game.tag}
                  style={{ ...itemStyle }}
                >
                  <Link to={`/games/${game.id}`}>
                    <div
                      className="item--image"
                      style={{
                        backgroundImage: `url(${DOMAIN_URL + game.image.url})`,
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
          </div>
        </div>
      );
    }

    return <h2 className="GameList-title">Waiting for API...</h2>;
  }
}

export default Games;

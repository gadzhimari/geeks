import React, { Component } from 'react';
import cn from 'cn-decorator';

import { Gallery } from '../../components';
import { Outsources as OutsourcesApi } from '../../api';
import { getImageUrl } from '../../utils';

import { ReactComponent as LeftArrowIcon } from '../../images/arrow-l.svg';
import { ReactComponent as RightArrowIcon } from '../../images/arrow-r.svg';

import './Outsource.scss';

@cn('Outsource')
class Outsources extends Component {
  state = {
    loading: true,
    outsources: [],
    showGallery: false,
    currentCategory: 'All',
  };

  async componentDidMount() {
    const { data: outsources } = await OutsourcesApi.getOutsources();

    this.setState({ loading: false, outsources });
  }

  handleClick = (e) => {};

  handleOpenGallery = (currentImage) => () => {
    this.setState({ showGallery: true, currentImage });
  };

  handleCloseGallery = () => {
    this.setState({ showGallery: false });
  };

  handleSwitchCategory = (e) => {
    const { category } = e.target.dataset;

    this.setState({ currentCategory: category });

    document.querySelectorAll('.Outsource__carouselItem').forEach((item) => {
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

  renderHeader(cn) {
    const { outsources, currentCategory } = this.state;

    const categories = outsources.reduce(
      (categories, item) => {
        if (item.tag && categories.includes(item.tag) === false) {
          return [...categories, item.tag];
        }
        return categories;
      },
      ['All'],
    );

    return (
      <div className={cn('header')}>
        <div className="container">
          <div className="row">
            <div className="col-16 offset-2 col-l-6 offset-l-10">
              <div className={cn('filter')}>
                {categories.map((category, index) => (
                  <button
                    className={`link-shadow
                      ${cn('filterCategory', {
                        active: category === currentCategory,
                      })}`}
                    data-category={category}
                    onClick={this.handleSwitchCategory}
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
    );
  }

  render(cn) {
    const { outsources, showGallery, currentImage } = this.state;

    if (!this.state.loading) {
      return (
        <div className={cn()}>
          {this.renderHeader(cn)}

          <div className={cn('carousel')}>
            {outsources.map((outsource, index) => {
              return (
                <div
                  className={cn('carouselItem')}
                  key={outsource.id}
                  data-category={outsource.tag}
                  style={{
                    backgroundImage: `url(${getImageUrl(outsource.image.url)})`,
                  }}
                  data-index={index}
                  onClick={this.handleOpenGallery(outsource.image)}
                />
              );
            })}
            <div className={cn('carouselNav')}>
              <span className={cn('carouselPrev')} onClick={this.handleClick}>
                <LeftArrowIcon />
              </span>
              <span className={cn('carouselNext')} onClick={this.handleClick}>
                <RightArrowIcon />
              </span>
            </div>
          </div>

          <Gallery
            data={outsources}
            onClose={this.handleCloseGallery}
            isOpen={showGallery}
            startSlide={currentImage}
          />
        </div>
      );
    }

    return <h2 className="oursource-title">Waiting for API...</h2>;
  }
}

export default Outsources;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'cn-decorator';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as IconClose } from './close.svg';
import { getImageUrl } from '../../utils';

import './Gallery.scss';

@cn('Gallery')
class Gallery extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    startSlide: PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
    }),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        tag: PropTypes.string,
        image: PropTypes.object,
      }),
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { data } = this.props;

    if (data && data.length > 0) {
      this.state = {
        currentImage: data[0].image,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startSlide !== undefined) {
      this.setState({ startSlide: nextProps.startSlide });
    }
  }

  handleOpenImage = (e) => {
    const { data, onChange } = this.props;
    const { index } = e.currentTarget.dataset;

    this.setState({ currentImage: data[index].image });

    if (onChange) {
      onChange();
    }
  };

  render(cn) {
    const { data, isOpen, onClose } = this.props;
    const { currentImage } = this.state;

    return (
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="gallery"
        unmountOnExit
      >
        <div className={cn()}>
          <div className={cn('wrapper')}>
            <button className={cn('close')} onClick={onClose}>
              <IconClose />
            </button>

            <div className={cn('item')}>
              <img
                className={cn('image')}
                src={getImageUrl(currentImage.url)}
                alt=""
              />
            </div>
            <div className={cn('thumbs')}>
              {data.map((item, index) => {
                return (
                  <div
                    className={cn('thumb', {
                      active: currentImage.id === item.image.id,
                    })}
                    key={item.id}
                    data-category={item.tag}
                    style={{
                      backgroundImage: `url(${getImageUrl(item.image.url)})`,
                    }}
                    data-index={index}
                    onClick={this.handleOpenImage}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default Gallery;

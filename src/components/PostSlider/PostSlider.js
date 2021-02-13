import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'cn-decorator';

import { ReactComponent as LeftArrowIcon } from './arrow-left.svg';
import { ReactComponent as RightArrowIcon } from './arrow-right.svg';
import './PostSlider.scss';

@cn('PostSlider')
class PostSlider extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  render(cn) {
    const { post, baseUrl, onPrev, onNext } = this.props;

    return (
      <div className={cn()}>
        <div className={cn('content')}>
          <span className={cn('subtitle')}>Next article</span>
          <Link to={`${baseUrl}${post.id}`} className={cn('title')}>
            {post.title}
          </Link>
        </div>
        <span className={cn('prev')} onClick={onPrev}>
          <LeftArrowIcon />
        </span>
        <span className={cn('next')} onClick={onNext}>
          <RightArrowIcon />
        </span>
      </div>
    );
  }
}

export default PostSlider;

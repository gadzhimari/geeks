import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import cn from 'cn-decorator';

import { DOMAIN_URL } from '../../config';

import './PostItem.scss';

@cn('PostItem')
class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  render(cn) {
    const { post } = this.props;
    const postDate = format(post.createdAt, 'DD.M.YYYY');

    return (
      <div className={cn()}>
        <Link to={`/blog/${post.id}`} className={cn('link')}>
          {post.article_featured_image !== null && (
            <div className={cn('header')}>
              <img
                src={DOMAIN_URL + post.article_featured_image.url}
                className={cn('image')}
              />
            </div>
          )}
          <div className={cn('body')}>
            <div className={cn('meta')}>
              <time className={cn('date')} dateTime={post.createdAt}>
                {postDate}
              </time>
            </div>
            <div className={cn('content')}>
              <h2 className={cn('title')}>{post.title}</h2>
              <p className={cn('text')}>{post.excerpt}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default PostItem;

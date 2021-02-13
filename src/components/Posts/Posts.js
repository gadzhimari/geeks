import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'cn-decorator';

import { PostItem } from '../../components';

import './Posts.scss';

@cn('Posts')
class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        createdAt: PropTypes.string,
        excerpt: PropTypes.string,
        article_featured_image: PropTypes.object,
      }),
    ).isRequired,
  };

  render(cn) {
    const { posts } = this.props;

    return (
      <div className={cn()}>
        <div className={cn('list')}>
          {posts.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;

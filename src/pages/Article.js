import React, { Component } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Posts } from '../api';
import { Post } from '../components';

class Article extends Component {
  state = {
    loading: true,
    currentPost: {},
    nextPost: null,
    total: 0,
    current: 1,
  };

  handleNextClick = () => {
    const { total, current, posts } = this.state;
    const next = (current + 1) % total;

    this.setState({
      current: next,
      nextPost: posts[next],
    });
  };

  handlePrevClick = () => {
    const { current, total, posts } = this.state;
    const prev = (current + (total - 1)) % total;

    this.setState({
      current: prev,
      nextPost: posts[prev],
    });
  };

  async componentDidMount() {
    const { data: posts } = await Posts.getPosts();
    const { data: currentPost } = await Posts.getPost(
      this.props.match.params.id,
    );

    const filteredPosts = posts.filter((post) => post.id !== currentPost.id);

    this.setState({
      currentPost,
      posts: filteredPosts,
      nextPost: filteredPosts[0],
      total: filteredPosts.length,
      loading: false,
    });
  }

  render() {
    const { currentPost, nextPost, loading } = this.state;

    if (!loading) {
      return (
        <Post
          post={currentPost}
          nextPost={nextPost}
          onPrev={this.handlePrevClick}
          onNext={this.handleNextClick}
        />
      );
    }

    return <h2>Waiting for API...</h2>;
  }
}

export default Article;

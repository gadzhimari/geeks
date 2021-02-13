import React, { Component } from 'react';
import cn from 'cn-decorator';

import { Subscribe, Posts as PostList, PostPagination } from '../../components';
import { Posts } from '../../api';

import './Blog.scss';

@cn('Blog')
class Blog extends Component {
  state = {
    loading: true,
    articles: [],
    offset: 0,
    postsPerPage: 6,
  };

  async loadPosts() {
    const { postsPerPage, offset } = this.state;

    const options = {
      _limit: postsPerPage,
      _start: postsPerPage * offset,
    };

    const { data: articles } = await Posts.getPosts(options);

    this.setState({
      loading: false,
      articles: articles,
    });
  }

  async componentDidMount() {
    const { data: posts } = await Posts.getPosts();
    const { postsPerPage } = this.state;

    this.setState({
      pageCount: Math.ceil(posts.length / postsPerPage),
    });

    this.loadPosts();
  }

  handlePageClick = (data) => {
    let offset = data.selected;

    this.setState({ offset: offset }, () => {
      this.loadPosts();
    });
  };

  render(cn) {
    const { articles, loading, pageCount } = this.state;

    if (!loading) {
      return (
        <div className={cn()}>
          <div className="container">
            <div className={cn('header')}>
              <div className="row">
                <div className="col-16 offset-2 col-l-12 offset-l-4">
                  <div className={cn('headerWrapper')}>
                    <h1 className={cn('title')}>Blog</h1>
                    <Subscribe
                      className={cn('subscribe', { position: 'top' })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={cn('content')}>
              <div className="row">
                <div className="col-16 offset-2 col-l-8 offset-l-8">
                  <PostList posts={articles} />
                </div>
              </div>
            </div>

            <div className={cn('footer')}>
              <div className="row">
                <div className="col-16 offset-2 col-l-4 offset-l-2">
                  <Subscribe
                    className={cn('subscribe', { position: 'bottom' })}
                  />
                </div>
                <div className="col-16 offset-2 col-l-10 offset-2">
                  <PostPagination
                    className={cn('pagination')}
                    pageCount={pageCount}
                    onPageChange={this.handlePageClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <h2 className="GameList-title">Waiting for API...</h2>;
  }
}

export default Blog;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import format from 'date-fns/format';

import { Posts } from '../api';
import { DOMAIN_URL } from '../config';

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

  render() {
    const { articles, loading, pageCount } = this.state;

    if (!loading) {
      return (
        <div className="blog">
          <div className="container">
            <div className="blog-container">
              <div className="blog--sidebar">
                <div className="block-title">
                  <h1>Blog</h1>
                </div>
              </div>
              <div className="blog--list">
                {articles.map((article, index) => {
                  const articleDate = format(article.createdAt, 'DD.M.YYYY');

                  return (
                    <div className="article" key={article.id}>
                      <Link to={`/blog/${article.id}`}>
                        {article.article_featured_image !== null && (
                          <div
                            className="article--image"
                            style={{
                              backgroundImage: `url(${DOMAIN_URL +
                                article.article_featured_image.url})`,
                            }}
                          />
                        )}
                        <div className="article--header">
                          <h2>{article.title}</h2>
                          <time dateTime={article.createdAt}>
                            {articleDate}
                          </time>
                        </div>
                        <p>{article.excerpt}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="container--entry">
            <div className="blog--footer">
              <div className="subscribe">
                <div className="block-title">Подписаться</div>
                <div className="block-subtitle">
                  Ежемесячная подборка крутых
                  <br />
                  новостей из игровой индустрии
                </div>
                <form action="" className="subscribe-form">
                  <input
                    type="text"
                    placeholder="Email"
                    name="subscribe-email"
                    required
                  />
                  <button type="submit" className="svg-arrow" />
                </form>
              </div>
              <div className="pagination">
                <ReactPaginate
                  nextLabel={''}
                  previousLabel={''}
                  previousLinkClassName={'prev'}
                  nextLinkClassName={'next'}
                  breakLabel={<span>..</span>}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination-wrap'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                />
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

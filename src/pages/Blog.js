import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import format from 'date-fns/format';

import Config from '../config';

class Blog extends Component {
  state = {
    loading: true,
    articles: [],
    offset: 0,
    postsPerPage: 6,
  };

  async loadCommentsFromServer() {
    const { postsPerPage, offset } = this.state;

    const response = await fetch(
      `${Config.host}/articles?_limit=${postsPerPage}&_start=${postsPerPage *
        offset}`,
    );

    if (!response.ok) {
      return;
    }

    let articles = await response.json();

    this.setState({
      loading: false,
      articles: articles,
    });
  }

  async componentDidMount() {
    const all = await fetch(`${Config.host}/articles`);
    const allArticles = await all.json();
    const { postsPerPage } = this.state;

    this.setState({
      pageCount: Math.ceil(allArticles.length / postsPerPage),
    });

    this.loadCommentsFromServer();
  }

  handlePageClick = (data) => {
    let offset = data.selected;

    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
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
                              backgroundImage: `url(${Config.host +
                                article.article_featured_image.url})`,
                            }}
                          />
                        )}
                        <div className="article--header">
                          <h2>{article.title}</h2>
                          <time datetime={article.createdAt}>
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

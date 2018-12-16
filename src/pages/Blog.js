import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Config from '../config';

const dateformat = require('dateformat');

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      articles: [],
      offset: 0,
      postsPerPage: 6,
    };
  }

  async loadCommentsFromServer() {
    let response = await fetch(
      `${Config.host}/articles?_limit=${this.state.postsPerPage}&_start=${this
        .state.postsPerPage * this.state.offset}`,
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

    this.setState({
      pageCount: Math.ceil(allArticles.length / this.state.postsPerPage),
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
    if (!this.state.loading) {
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
                {this.state.articles.map((article, index) => {
                  var ms = Date.parse(article.createdAt);
                  var formatedDate = dateformat(ms, 'dd.mm.yyyy');
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
                          <span>{formatedDate}</span>
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
                  pageCount={this.state.pageCount}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import cn from 'cn-decorator';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Social, PostSlider } from '../../components';
import { DOMAIN_URL } from '../../config';
import createElementFromHTML from '../../utils/markdown';

import './Post.scss';

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

@cn('Post')
class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    nextPost: PropTypes.object.isRequired,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
  };

  renderSlider(cn) {
    const { post } = this.props;

    return (
      <Slider {...settings} className={cn('slider')}>
        {post.slider.map((slide, index) => {
          return (
            <div key={index} className={cn('slide')}>
              <img src={`${DOMAIN_URL}${slide.url}`} alt={slide.name} />
            </div>
          );
        })}
      </Slider>
    );
  }

  renderHeader(cn) {
    const { post } = this.props;
    const postDate = format(post.createdAt, 'DD.M.YYYY');

    return (
      <div className={cn('header')}>
        <div className="container">
          <div className="row">
            <div className="col-16 col-l-12 offset-2 offset-l-4">
              <div className={cn('meta')}>
                <h1 className={cn('title')}>{post.title}</h1>
                <time dateTime={post.createdAt} className={cn('time')}>
                  {postDate}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFooter(cn) {
    const { nextPost, onNext, onPrev } = this.props;

    return (
      <div className={cn('footer')}>
        <div className="container">
          <div className="row">
            <div className="col-16 col-l-18 offset-2 offset-l-1">
              <div className={cn('footerDivider')} />
            </div>
          </div>

          <div className="row">
            <div className="col-16 col-m-4 col-l-2 offset-2 offset-l-4">
              <span className={cn('footerFeedback')}>Write Us</span>
            </div>
            <div className="col-16 col-m-8 col-l-10 offset-2 offset-m-4 offset-l-2">
              <PostSlider
                post={nextPost}
                onNext={onNext}
                onPrev={onPrev}
                baseUrl="/blog/"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render(cn) {
    const { post } = this.props;
    const listBeforeSlider = post.list_before_slider.split('#').slice(1);
    const listAfterSlider = post.list_after_slider.split('#').slice(1);

    return (
      <article className={cn()}>
        {this.renderHeader(cn)}

        <div className={cn('main')}>
          <div className="container">
            <div className="row">
              <div className="col-16 col-m-6 col-l-4 offset-2 offset-l-4">
                <div className={cn('sidebar', { position: 'top' })}>
                  <blockquote className={cn('blockquote')}>
                    {post.excerpt}
                  </blockquote>
                </div>
              </div>
              <div className="col-16 col-m-14 col-l-8 offset-2 offset-m-4 offset-l-2">
                <div className={cn('content')}>
                  <div
                    className={cn('text')}
                    dangerouslySetInnerHTML={{
                      __html: createElementFromHTML(post.text),
                    }}
                  />

                  {listBeforeSlider.length > 0 && (
                    <div className={cn('list', { size: 'l' })}>
                      {listBeforeSlider.map((item, index) => {
                        return (
                          <div key={index} className={cn('listItem')}>
                            <span className={cn('listItemCount')}>
                              0{index + 1}
                            </span>
                            <span className={cn('listItemTitle')}>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {post.slider.length > 0 && this.renderSlider(cn)}

        <div className="container">
          <div className="row">
            <div className="col-16 col-m-14 col-l-4 offset-2 offset-m-4 offset-l-4 order-12 order-l-1">
              <div className={cn('sidebar', { position: 'bottom' })}>
                <Social />
              </div>
            </div>

            <div className="col-16 col-m-14 col-l-8 offset-2 offset-m-4 offset-l-2 order-1 order-l-12">
              <div className={cn('content')}>
                <h2 className={cn('subtitle')}>{post.title_before_list}</h2>

                <div className={cn('list', { size: 's' })}>
                  {listAfterSlider.map((item, index) => {
                    return (
                      <div key={index} className={cn('listItem')}>
                        <span className={cn('listItemCount')}>
                          0{index + 1}
                        </span>
                        <span className={cn('listItemTitle')}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.renderFooter(cn)}
      </article>
    );
  }
}

export default Post;

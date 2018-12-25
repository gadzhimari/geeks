import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        <div className={cn('container')}>
          <div className={cn('meta')}>
            <h1 className={cn('title')}>{post.title}</h1>
            <time dateTime={post.createdAt} className={cn('time')}>
              {postDate}
            </time>
          </div>
        </div>
      </div>
    );
  }

  renderFooter(cn) {
    const { nextPost, post, onNext, onPrev } = this.props;

    return (
      <div className={cn('footer')}>
        <div className={cn('footerRow')}>
          <div className={cn('footerCol')}>
            <span className={cn('footerFeedback')}>Write Us</span>
          </div>
          <div className={cn('footerCol')}>
            <PostSlider
              post={nextPost}
              onNext={onNext}
              onPrev={onPrev}
              baseUrl="/blog/"
            />
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

        <div className={cn('container')}>
          <div className={cn('row')}>
            <div className={cn('sidebar')}>
              <blockquote className={cn('blockquote')}>
                {post.excerpt}
              </blockquote>
            </div>

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

        {post.slider.length > 0 && this.renderSlider(cn)}

        <div className={cn('container')}>
          <div className={cn('row')}>
            <div className={cn('sidebar', { position: 'bottom' })}>
              <Social />
            </div>

            <div className={cn('content')}>
              <h2 className={cn('subtitle')}>{post.title_before_list}</h2>

              <div className={cn('list', { size: 's' })}>
                {listAfterSlider.map((item, index) => {
                  return (
                    <div key={index} className={cn('listItem')}>
                      <span className={cn('listItemCount')}>0{index + 1}</span>
                      <span className={cn('listItemTitle')}>{item}</span>
                    </div>
                  );
                })}
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

import { request } from './request';

export default {
  getPosts(params) {
    return request({
      url: '/articles',
      params,
    });
  },
  getPost(slug) {
    return request({
      url: `/articles/${slug}`,
    });
  },
};

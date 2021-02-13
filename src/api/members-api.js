import { request } from './request';

export default {
  getMembers() {
    return request({
      url: '/members/',
    });
  },
  getMember(slug) {
    return request({
      url: `/members/${slug}`,
    });
  },
};

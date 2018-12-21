import { request } from './request';

export default {
  getSlides() {
    return request({
      url: '/slides/',
    });
  },
};

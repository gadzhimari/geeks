import { request } from './request';

export default {
  getOutsources() {
    return request({
      url: '/outsources/',
    });
  },
};

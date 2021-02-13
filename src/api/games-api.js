import { request } from './request';

export default {
  getGames() {
    return request({
      url: '/games/',
    });
  },
  getGame(slug) {
    return request({
      url: `/games/${slug}`,
    });
  },
};

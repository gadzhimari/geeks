import { DOMAIN_URL } from '../config';

const getImageUrl = (path) => {
  return `${DOMAIN_URL}${path}`;
};

export default getImageUrl;

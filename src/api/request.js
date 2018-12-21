import axios from 'axios';

import { DOMAIN_URL } from '../config';

const API = axios.create({ baseURL: DOMAIN_URL });

const getRequestHandler = (instance) => (options) => {
  const { url, method = 'GET', params = {}, data = {}, baseURL } = options;

  const config = { url, method, params, data };

  if (baseURL) {
    config.baseURL = baseURL;
  }

  return instance.request(config);
};

export const request = getRequestHandler(API);

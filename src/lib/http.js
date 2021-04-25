import axios from 'axios';

const { CancelToken } = axios;
const GITHUB_HOST = 'https://api.github.com';

export default class Http {
  constructor(host = GITHUB_HOST, ...config) {
    this.httpInstance = axios.create({
      baseURL: host,
      config,
    });
  }

  callApi({ url, method, data = {}, params = {} }) {
    const source = CancelToken.source();

    const request = this.httpInstance.request({
      url,
      method,
      data,
      params,
      cancelToken: source.token
    });

    request.cancel = () => {
      source.cancel('Operation canceled by the user.');
    }

    return request;
  }

  get({ url, params = {} }) {
    return this.callApi({ url, method: 'GET', params });
  }

  post({ url, data, params = {} }) {
    return this.callApi({ url, method: 'POST', data, params });
  }

  put({ url, data, params = {} }) {
    return this.callApi({ url, method: 'PUT', data, params });
  }

  delete({ url }) {
    return this.callApi({ url, method: 'DELETE' });
  }

  setRequestInterceptor(callBack) {
    this.httpInstance.interceptors.request.use(callBack, (error) => Promise.reject(error))
  }

  setResponseInterceptor(callBack) {
    this.httpInstance.interceptors.response.use(callBack, (error) => Promise.reject(error))
  }
}

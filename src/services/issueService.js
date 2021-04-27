import parseLinkHeader from 'parse-link-header';
import Http from '../lib/http';

const ISSUE_URL = '/search/issues';
class IssueService {
  pagination = {
    first: {
      page: 1,
    },
    last: undefined,
    next: undefined,
    prev: undefined,
  };
  q;

  constructor() {
    this.httpInstance = new Http();
    this.httpInstance.setResponseInterceptor(this.setPagination.bind(this));
  }

  setPagination(response) {
    this.pagination = parseLinkHeader(response.headers.link);

    return response;
  }

  get(params) {
    return this.httpInstance.get({ url: ISSUE_URL, params: { ...params, access_token: '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' } });
  }

  search(query) {
    this.q = query;

    return this.get({ q: `${this.q} repo:facebook/react` });
  }

  nextPage() {
    if (this.pagination.next) {
      const page = this.pagination.next.page;

      return this.get({ q: this.q, page });
    }

    return Promise.resolve([]);
  }
}

export default new IssueService();

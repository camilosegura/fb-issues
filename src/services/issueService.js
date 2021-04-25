import parseLinkHeader from 'parse-link-header';
import Http from '../lib/http';

const ISSUE_URL = '/repos/facebook/react/issues';
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
    return this.httpInstance.get({ url: ISSUE_URL, params });
  }

  search(query) {
    this.q = encodeURIComponent(query);

    return this.get({ q: this.q });
  }

  nextPage() {
    const page = this.pagination.next.page;

    return this.get({ q: this.q, page });
  }
}

export default new IssueService();

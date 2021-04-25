import Http from '../lib/http';

class IssueService {
  nextPage;
  prevPage;
  lastPage;
  fisrtPage;

  constructor() {
    this.httpInstance = new Http();
    this.httpInstance.setResponseInterceptor(this.setPagination.bind(this));
  }

  setPagination(response) {
    console.log('response', response);
    console.log('nextPage', this.nextPage);
    return response;
  }

  search(query) {
    const q = encodeURIComponent(query);
    this.nextPage = '/repos/facebook/react/issues';

    return this.httpInstance.get({ url: this.nextPage, params: { q }});
  }
}

export default new IssueService();

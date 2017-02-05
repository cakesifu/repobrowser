import EventEmitter from 'events';


export default class Store extends EventEmitter {
  reposLoadStart(user) {
    this.user = user;
    this.page = 1;
    this.noMoreRecords = false;
    this.loading = true;
    this.error = null;
    this.repos = null;
    this.emit('change');
  }

  reposLoadSuccess(repos) {
    this.repos = repos;
    this.loading = false;
    this.emit('change');
  }

  reposLoadError(error) {
    this.error = error;
    this.loading = false;
    this.repos = null;
    this.emit('change');
  }

  reposLoadMoreStart() {
    this.page = (this.page || 1) + 1;
    this.moreLoading = true;
    this.moreError = null;
    this.emit('change');
  }

  reposLoadMoreSuccess(repos) {
    if (repos.length) {
      this.repos = this.repos.concat(repos);
    } else {
      this.noMoreRecords = true;
    }
    this.moreLoading = false;
    this.emit('change');
  }

  reposLoadMoreError(error) {
    this.moreError = error;
    this.moreLoading = false;
    this.emit('change');
  }
}

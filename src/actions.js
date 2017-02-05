export default class Actions {
  constructor(api, store) {
    this.api = api;
    this.store = store;
  }

  async loadRepos(user) {
    let repos = null;
    this.store.reposLoadStart(user);

    try {
      repos = await this.api.getRepos(user);
      this.store.reposLoadSuccess(repos);
    } catch (error) {
      this.store.reposLoadError(error);
    }
  }

  async loadMoreRepos() {
    let repos = null;
    this.store.reposLoadMoreStart();
    const {user, page} = this.store;

    try {
      repos = await this.api.getRepos(user, page);
      this.store.reposLoadMoreSuccess(repos);
    } catch (error) {
      this.store.reposLoadMoreError(error);
    }
  }
}

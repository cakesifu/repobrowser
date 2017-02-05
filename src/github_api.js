import {API_NOT_FOUND} from './errors';


const API = 'https://api.github.com';


export default class GithubApi {
  get handler() {
    return (res) => {
      if (res.ok) {
        return res.json();
      }

      if (res.status === 404) {
        return Promise.reject(API_NOT_FOUND);
      }

      return Promise.reject(res);
    };
  }

  get options() {
    return {
      headers: {
        accept: 'application/json'
      }
    }
  }

  getRepos(user, page) {
    const url = `${API}/users/${user}/repos?page=${page || 1}`;
    return fetch(url, this.options).then(this.handler);
  }
}


import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import Store from './store';
import GithubApi from './github_api';
import Actions from './actions';


function init(rootElement) {
  const store = new Store();
  const api = new GithubApi();
  const actions = new Actions(api, store);

  ReactDOM.render(
    <App store={store} actions={actions} />,
    rootElement
  );
}

const rootElement = document.getElementById('root');
init(rootElement);


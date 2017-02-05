import test from 'ava';
import sinon from 'sinon';

import Actions from '../src/actions';
import Store from '../src/store';
import GithubApi from '../src/github_api';


test('loadRepos with success api call', async t => {
  const store = sinon.createStubInstance(Store);
  const api = sinon.createStubInstance(GithubApi);
  const actions = new Actions(api, store);
  const repos = [];

  api.getRepos.returns(Promise.resolve(repos));

  await actions.loadRepos('foo');

  t.true(api.getRepos.calledWith('foo'));
  t.true(store.reposLoadStart.calledWith('foo'));
  t.true(store.reposLoadSuccess.calledWith(repos));
  t.false(store.reposLoadError.called);
});


test('loadRepos with api call errors', async t => {
  const store = sinon.createStubInstance(Store);
  const api = sinon.createStubInstance(GithubApi);
  const actions = new Actions(api, store);
  const error = GithubApi.ERR_NOT_FOUND;

  api.getRepos.returns(Promise.reject(error));

  await actions.loadRepos('foo');

  t.true(api.getRepos.calledWith('foo'));
  t.true(store.reposLoadStart.calledWith('foo'));
  t.true(store.reposLoadError.calledWith(error));
  t.false(store.reposLoadSuccess.called);
});

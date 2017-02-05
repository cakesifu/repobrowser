import test from 'ava';
import fetchMock from 'fetch-mock';

import GithubApi from '../src/github_api';
import {API_NOT_FOUND} from '../src/errors';

const api = new GithubApi();

test("returns the users repos", async t => {
  fetchMock.get('begin:https://api.github.com/users/foo/repos', {foo: 'bar'});
  const out = await api.getRepos('foo');
  t.deepEqual(out, {foo: 'bar'});
  fetchMock.reset();
});


test("error: unknown user", async t => {
  fetchMock.get('begin:https://api.github.com/users/bar/repos', 404);
  try {
    await api.getRepos('bar');
  } catch (e) {
    t.deepEqual(e, API_NOT_FOUND);
  }
  fetchMock.reset();
});


test("supports pages", async t => {
  fetchMock.get('https://api.github.com/users/baz/repos?page=2', {foo: 'bar'});
  const out = await api.getRepos('baz', 2);
  t.deepEqual(out, {foo: 'bar'});
  fetchMock.reset();
});

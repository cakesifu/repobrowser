import test from 'ava';

import Store from '../src/store';


test('reposLoadStat sets proper fields', t => {
  const store = new Store();

  store.on('change', () => {
    t.is(store.user, 'foo');
    t.is(store.loading, true);
    t.is(store.error, null);
  });

  store.reposLoadStart('foo');
});


test('reposLoadSuccess sets proper fields', t => {
  const store = new Store();
  const repos = [];
  store.reposLoadStart('foo');

  store.on('change', () => {
    t.is(store.repos, repos);
    t.is(store.loading, false);
  });

  store.reposLoadSuccess(repos);
});


test('reposLoadError sets proper fields', t => {
  const store = new Store();
  const error = Symbol('error');
  store.reposLoadStart('foo');

  store.on('change', () => {
    t.is(store.error, error);
    t.is(store.loading, false);
  });

  store.reposLoadError(error);
});


test('reposLoadMoreSuccess appends records', t => {
  const store = new Store();
  store.reposLoadSuccess(['foo', 'bar']);

  store.on('change', () => {
    t.deepEqual(store.repos, ['foo', 'bar', 'baz']);
  });
  store.reposLoadMoreSuccess(['baz']);
});


test('reposLoadMoreSuccess sets noMoreRecords if no results', t => {
  const store = new Store();
  store.reposLoadSuccess(['foo', 'bar']);

  store.on('change', () => {
    t.deepEqual(store.repos, ['foo', 'bar']);
    t.true(store.noMoreRecords);
  });
  store.reposLoadMoreSuccess([]);
});


test('reposLoadMoreStart increases page number', t => {
  const store = new Store();
  store.reposLoadStart();
  store.reposLoadSuccess(['foo', 'bar']);

  store.on('change', () => {
    t.deepEqual(store.page, 2);
  });
  store.reposLoadMoreStart();

});

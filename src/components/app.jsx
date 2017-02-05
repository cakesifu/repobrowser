import React from 'react';

import styles from './app.css';
import Form from './form';
import Pagination from './pagination';
import RepoList from './repo_list';
import ErrorDisplay from './error_display';
import connect from '../connect';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {noMoreRecords, error, repos, loading, user} = this.props;
    const noResults = repos && !repos.length;
    const pagination = !(noResults || loading || noMoreRecords || error || !user);

    return (
      <div className={styles.layout}>
        <Form onSubmit={this.props.onSubmit} />
        {user && <RepoList repos={repos} loading={loading} />}
        {error && <ErrorDisplay error={error} />}
        {pagination && <Pagination onClick={this.props.onLoadMore} />}
      </div>
    );
  }
}

App.propTypes = {
  loading: React.PropTypes.bool,
  user: React.PropTypes.string,
  repos: React.PropTypes.array,
  error: React.PropTypes.any,
  moreError: React.PropTypes.any,

  onSubmit: React.PropTypes.func,
  onLoadMore: React.PropTypes.func

};

export default connect((store) => {
  return {
      loading: store.loading || store.moreLoading,
      user: store.user,
      repos: store.repos,
      error: store.error,
      moreError: store.moreError,
      noMoreRecords: store.noMoreRecords
    };
}, (actions) => {
  return {
    onSubmit: v => actions.loadRepos(v),
    onLoadMore: () => actions.loadMoreRepos()
  };
})(App);

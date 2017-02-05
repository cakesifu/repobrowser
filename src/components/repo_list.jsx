import React from 'react';
import styles from './repo_list.css';

const Repo = (props) => {
  return (
    <div className={styles.repo}>
      <a className={styles.repoLink} href={props.repo.html_url}>{props.repo.name}</a>
    </div>
  );
};


export default class RepoList extends React.Component {
  render() {
    const {repos, loading} = this.props;
    let content = null;

    if (loading) {
      content = <div className={styles.loading}>... loading ...</div>;
    } else if (repos && !repos.length) {
      content = <div className={styles.noResults}>No repos found.</div>;
    }

    return (
      <div className={styles.layout}>
        {repos && repos.map(this.renderItem, this)}
        {content}
      </div>
    );
  }

  renderItem(item) {
    return (
      <Repo key={item.id} repo={item} />
    );
  }
}

RepoList.propTypes = {
  repos: React.PropTypes.array,
  loading: React.PropTypes.bool
};

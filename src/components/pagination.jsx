import React from 'react';
import styles from './pagination.css';


export default function Pagination(props) {
  return (
    <div className={styles.layout}>
      <a className={styles.link} onClick={props.onClick}>Load more</a>
    </div>
  );
}

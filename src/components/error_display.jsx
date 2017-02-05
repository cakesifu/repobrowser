import React from 'react';
import styles from './error_display.css';
import {API_NOT_FOUND} from '../errors';


export default function ErrorDisplay(props) {
  let text = null;

  switch (props.error) {
    case API_NOT_FOUND:
      text = "Uknown user";
      break
    default:
      text = "Unknown error";
  }

  return (
    <div className={styles.error}>
      {text}
    </div>
  );
}

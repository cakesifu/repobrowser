import React from 'react';
import styles from './form.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
  }

  render() {
    return (
      <div className={styles.layout}>
        <p>The user:</p>
        <input className={styles.input}
               type="text"
               value={this.state.value}
               onKeyPress={this.onKeyPress.bind(this)}
               onChange={this.onInputChange.bind(this)} />
         <button disabled={!this.state.value}
                onClick={this.onSubmit.bind(this)}>Go</button>
      </div>
    );
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  onInputChange(event) {
    const value = event.target.value;

    this.setState({value});
  }

  onSubmit() {
    if (this.state.value) {
      this.props.onSubmit(this.state.value);
    }
  }
}

Form.propTypes = {
  onSubmit: React.PropTypes.func
};

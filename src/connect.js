import React from 'react';


export default function connect(storeToProps, actionsToProps) {
  return function(Component) {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
        this.onStoreChange = this.onStoreChange.bind(this);
      }

      componentDidMount() {
        this.props.store.on('change', this.onStoreChange);
        this.onStoreChange();
      }

      componentWillUnmount() {
        this.props.store.removeListener('change', this.onStoreChange);
      }

      render() {
        const {mappedProps, mappedActions} = this.state;
        const props = Object.assign({}, this.props);
        delete props.store;
        delete props.actions;

        return <Component {...props} {...mappedProps} {...mappedActions} />;
      }

      onStoreChange() {
        const {store, actions} = this.props;

        const mappedProps = storeToProps(store);
        const mappedActions = actionsToProps(actions);

        this.setState({mappedProps, mappedActions});
      }
    }

    return Wrapper;
  }
}

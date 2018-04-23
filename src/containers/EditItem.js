import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditItemForm from '../components/EditItemForm';
import * as actions from '../actions/actions';

class EditItem extends React.Component {
  componentWillMount() {
    this.props.actions.uploadedItem(this.props.items.editItem.img);
  }
  submit(values, items) {
    console.log('This is values', values);

    const newValues = Object.assign({}, values, {
      img:
        values.img === this.props.items.uploadItem
          ? values.img
          : this.props.items.uploadItem,
      rating: values.price / values.times,
      times: parseInt(values.times),
      price: parseInt(values.price)
    });

    this.props.actions.rewriteItem(newValues, items.editItem.id);
  }
  render() {
    const { items, initialValues } = this.props;
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="text-center date">
          <h1> Edit Item</h1>
          <EditItemForm
            initialValues={initialValues}
            img={items.editItem.img}
            onSubmit={values => this.submit(values, items)}
          />
        </div>
      </div>
    );
  }
}

EditItem.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { items } = state;
  return {
    items,
    initialValues: items.editItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);

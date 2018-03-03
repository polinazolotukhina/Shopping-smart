import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import EditItemForm from '../components/EditItemForm';
import * as actions from '../actions/actions';

class EditItem extends React.Component {
    constructor(props){
     super(props);
    }
    submit(values, items) {
      this.props.actions.rewriteItem(values, items.editItem.id);
      browserHistory.push('/');

    }
    render() {
        const { items, initialValues } = this.props;
        return (
            <div className="col-md-4 col-md-offset-4">
                <RaisedButton
                    label="List"
                    onClick={() => { browserHistory.push('/'); }}
                />
                <div className="text-center"><h1> Edit Item</h1>
                    <EditItemForm
                        initialValues={initialValues}
                        onSubmit={(values) => this.submit(values, items)}
                    />
                </div>
            </div>
        );
    }
}

EditItem.propTypes = {
    actions: PropTypes.object.isRequired,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditItem);

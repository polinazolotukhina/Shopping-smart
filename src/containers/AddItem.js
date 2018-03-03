import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import AddForm from '../components/AddForm';
import * as actions from '../actions/actions';

class AddItem extends React.Component {
    submit(values) {
      this.props.actions.saveItem(values);
      browserHistory.push('/');
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <RaisedButton
                    label="List"
                    onClick={() => { browserHistory.push('/'); }}
                />
                <div className="text-center"><h1> Add New Item</h1>
                    <AddForm
                        onSubmit={(values)=>this.submit(values)}
                    />
                </div>
            </div>
        );
    }
}

AddItem.propTypes = {
    actions: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const { items } = state;
    return {
        items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddItem);

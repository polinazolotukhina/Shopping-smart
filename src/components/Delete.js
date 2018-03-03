import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import * as actions from '../actions/actions';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
 class Delete extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
}
  handleOpen() {
    this.setState({ open: true });
  }

  handleCloseDelete() {
    this.props.actions.deleteItem(this.props.id);
    this.setState({ open: false });
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const { id, item, brand } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,

      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onClick={() => { this.handleCloseDelete(this.props.id); }}
      />,
    ];

    return (
      <div className="btn-right">
        <IconButton
              tooltip="delete"
              onClick={this.handleOpen}
          >
          <i className="material-icons">delete</i>


        <Dialog
          title=" "
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => { this.handleCloseDelete(this.props.id); }}
        >
          Are you sure you want to delete {this.props.item} by {this.props.brand}?
        </Dialog>
        </IconButton>
      </div>
    );
  }
}

Delete.propTypes = {
    actions: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
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
)(Delete);

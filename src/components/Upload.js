import React from 'react';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';


class Upload extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
    this.props.actions.uploadedItem(files[0].preview);
  }

  render() {
    const { img } = this.props;
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <div>
            {
                (this.state.files.length > 0) ?
              (this.state.files.map(f =>
                  <div key={f.name}>
                        <p>{f.name}</p>
                        <p> {f.size} bytes </p>
                        <img style={{width:'100%'}} src={f.preview} />
                  </div>)) : (<img style={{ width: '100%' }}src={img} />)
            }

          </div>
        </aside>
      </section>
    );
  }
}

Upload.propTypes = {
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
)(Upload);

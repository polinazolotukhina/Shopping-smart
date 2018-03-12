import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { Tooltip, OverlayTrigger,  Button } from 'react-bootstrap';
import * as actions from '../actions/actions';
import ItemsList from './../components/ItemsList';


const tooltip = (text) => (
  <Tooltip id="tooltip">
     {text}
  </Tooltip>
);


class Home extends React.Component {
    componentWillMount() {
       this.props.actions.itemsFetch();
    }
    render() {
        const { items } = this.props;
        return (
            <div>
            <OverlayTrigger
                  placement="bottom"
                  overlay={tooltip('This is the smallest price per single use')}
                  onClick={() => { this.props.actions.sortData('rating', false); }}
              >
                  <Button bsStyle="default">The Best Purchase</Button>
            </OverlayTrigger>

            <OverlayTrigger
                  placement="bottom"
                  overlay={tooltip('The highest price per single use')}
                  onClick={() => { this.props.actions.sortData('rating', true); }}
              >
                  <Button bsStyle="default">The Worst Purchase</Button>
            </OverlayTrigger>


            <OverlayTrigger
                  placement="bottom"
                  overlay={tooltip('You used it the most friquently')}
                  onClick={() => { this.props.actions.sortData('times', true); }}
              >
                  <Button bsStyle="default">Used The Most</Button>
            </OverlayTrigger>


            <OverlayTrigger
                  placement="bottom"
                  overlay={tooltip('You barely used it')}
                  onClick={() => { this.props.actions.sortData('times', false); }}
              >
                  <Button bsStyle="default">Used The Least</Button>
            </OverlayTrigger>

            <OverlayTrigger
                  placement="bottom"
                  overlay={tooltip('It was pricy!')}
                   onClick={() => { this.props.actions.sortData('price', true); }}
              >
                  <Button bsStyle="default">Most Expansive</Button>
            </OverlayTrigger>

            <OverlayTrigger
                  placement="bottom"
                  overlay={tooltip('The cheapest on the list')}
                  onClick={() => { this.props.actions.sortData('price', false); }}
              >
                  <Button bsStyle="default">Least Expansive</Button>
            </OverlayTrigger>
                    { items &&
                        <div className="text-center">
                            <ItemsList  />
                        </div>
                    }

            </div>
        );
    }
}

Home.propTypes = {
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
)(Home);

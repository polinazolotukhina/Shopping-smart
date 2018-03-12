import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { browserHistory } from 'react-router';
import { Tooltip, OverlayTrigger,  Button, ListGroup, ListGroupItem  } from 'react-bootstrap';
import * as actions from '../actions/actions';


const tooltip = (text) => (
  <Tooltip id="tooltip">
     {text}
  </Tooltip>
);

class RateList extends React.Component {
    updateItem(item) {
        this.props.actions.editItem(item);
        browserHistory.push('/editItem');
    }
    deleteItem(id) {
        this.props.actions.deleteItem(id);
    }
    plus(item) {
        this.props.actions.plusTimes(item.id, item.times);
    }
    minus(item) {
        this.props.actions.minusTimes(item.id, item.times);
    }
    render() {
        const { items } = this.props.items;
        const data = Object
            .keys(items)
            .reduce((newObj, key) => Object.assign(
                newObj,
                {[key]: Object.assign({id: key}, items[key])}
            ), {})

            const mydata = Object.values(data);

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

                      <Button className="btn-row">
                        <div className="row bold marginRow">
                            <div className="col-md-2">photo</div>
                            <div className="col-md-2">item</div>
                            <div className="col-md-2">brand</div>
                            <div className="col-md-2">price</div>
                            <div className="col-md-2">times it was out</div>
                            <div className="col-md-2"> price per wear</div>
                        </div>
                    </Button>

                      {
                            mydata && mydata.map((item, index) =>
                            <Button
                                className="btn-row"
                                onClick={() => { this.updateItem(item); }}
                             >
                                <div className="row marginRow" key={index}>
                                    <div className="col-md-2">
                                        <img className='avatar' src={item.img} />
                                    </div>
                                    <div className="col-md-2">{item.item}</div>
                                    <div className="col-md-2">{item.brand}</div>
                                    <div className="col-md-2">{item.price}</div>
                                    <div className="col-md-2">{item.times}</div>
                                    <div className="col-md-2">{(
                                                                    (
                                                                        ((item.price / item.times)^0) === (item.price / item.times))
                                                                    ?
                                                                        (item.price / item.times)
                                                                    :   (item.price / item.times).toFixed(1)
                                                                )}
                                    </div>
                                </div>
                                </Button>
                            )
                        }

                </div>

            );
        }}

        RateList.propTypes = {
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
        )(RateList);

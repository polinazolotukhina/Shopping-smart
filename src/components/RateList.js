import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import * as actions from '../actions/actions';
import Delete from './Delete';



const style = {
  margin: 12
};
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
                    <List>
                      <Subheader>Recent chats</Subheader>
                      <RaisedButton
                          label="The Best Purchase"
                          style={style}
                          onClick={() => { this.props.actions.sortData('rating', false); }}
                      />
                      <RaisedButton
                          label="The Worst Purchase"
                          style={style}
                          onClick={() => { this.props.actions.sortData('rating', true); }}
                      />
                      <RaisedButton
                          label="Used The Most"
                          style={style}
                          onClick={() => { this.props.actions.sortData('times', true); }}
                      />
                      <RaisedButton
                          label="Used The Least"
                          style={style}
                          onClick={() => { this.props.actions.sortData('times', false); }}
                      />
                      <RaisedButton
                          label="Most Expansive"
                          style={style}
                          onClick={() => { this.props.actions.sortData('price', true); }}
                      />
                      <RaisedButton
                          label="Least Expansive"
                          style={style}
                          onClick={() => { this.props.actions.sortData('price', false); }}
                      />
                      {
                            mydata && mydata.map((item, index) =>
                                <div className="row" key={index}>
                                    <div className="col-md-2">item: {item.item}</div>
                                     <div className="col-md-2">brand: {item.brand}</div>
                                     <div className="col-md-2">price: {item.price}</div>
                                     <div className="col-md-2">times it was out: {item.times}</div>
                                    <div className="col-md-2"> price per wear:{item.price / item.times}</div>
                                     <div className="col-md-2">
                                        <img style={{ width: '100px' }} src={item.img} />
                                    </div>
                                </div>
                            )
                        }

                    </List>
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

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
class ItemsList extends React.Component {
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
            const mydata = Object.values(data)
        return (
                <div>
                    <List>
                      <Subheader>Recent chats</Subheader>
                      {
                            mydata &&mydata.map((item, index) =>
                                <div key={index}>
                                    <ListItem
                                      primaryText= {`${item.item}, ${item.brand}`}
                                      secondaryText={`wear: ${item.times} times`}
                                      secondaryTextLines={2}
                                      leftAvatar={<Avatar src={item.img} />}
                                      rightIconButton={
                                          <div>
                                                <div className='btn-left'>
                                                    <RaisedButton
                                                        onClick={() => { this.minus(item);}}
                                                        label="-"
                                                        style={style}
                                                    />
                                                    <RaisedButton
                                                      onClick={() => { this.plus(item); }}
                                                      label="+"
                                                      style={style}
                                                    />
                                                </div>
                                                <div className='btn-right'>
                                                    <div className='btn-right'>
                                                      <IconButton
                                                            tooltip="update"
                                                            onClick={() => { this.updateItem(item); }}
                                                        >
                                                        <i className="material-icons">mode_edit</i>
                                                       </IconButton>
                                                       </div>
                                                        <Delete id={item.id} item={item.item} brand={item.brand} />
                                              </div>

                                          </div>
                                      }
                                      onClick={() => { this.updateItem(item); }}
                                    />
                                </div>
                            )
                        }

                    </List>
                </div>

            );
        }}

        ItemsList.propTypes = {
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
        )(ItemsList);

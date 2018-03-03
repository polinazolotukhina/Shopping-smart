import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import * as actions from '../actions/actions';
import ItemsList from './../components/ItemsList';
// import ChartData from './../components/ChartData';


class Home extends React.Component {
    componentWillMount() {
       this.props.actions.itemsFetch();
    }
    render() {
        const { items } = this.props;
        return (
            <div>
                    <RaisedButton
                        label="Add Item"
                        onClick={() => { browserHistory.push('/addItem'); }}
                    />
                    { items &&
                        <div className="text-center">
                            <ItemsList items={items.items} />
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

    // <ChartData items={Object.values(mydata)} />

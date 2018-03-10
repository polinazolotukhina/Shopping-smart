import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import RateList from './../components/RateList';
// import ChartData from './../components/ChartData';


class Rating extends React.Component {
    componentWillMount() {
       this.props.actions.itemsFetch();
    }
    render() {
        const { items } = this.props;
        return (
            <div>
            I AM RATING!:)

                    { items &&
                        <div className="text-center">
                            <RateList items={items.items} />
                        </div>
                    }

            </div>
        );
    }
}

Rating.propTypes = {
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
)(Rating);

    // <ChartData items={Object.values(mydata)} />

import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';


class ChartData extends Component {
  render() {
      const { items } = this.props.items;
      const data = Object
          .keys(items)
          .reduce((newObj, key) => Object.assign(
              newObj,
              { [key]: Object.assign({ id: key }, items[key]) }
          ), {})
          const mydata = Object.values(data);

          function count(info) {
              console.log('info', info)
              const res = {};
              for (let i = 0; i < info.length; i++) {
                   res[info[i].day.slice(0, 7)] = 1 + (res[info[i].day.slice(0, 7)] || 0);
                }
                console.log('res', Object.keys(res))
                return res;
            }
            const dates = Object.keys(count(mydata))


            const date_sort_asc = function (date1, date2) {
                  if (date1 > date2) return 1;
                  if (date1 < date2) return -1;
                  return 0;
            };

     return <ReactHighcharts config={{
         chart: {
                    polar: true
                  },
                  title: {
                    text: `Perchases per month`
                  },
       xAxis: {
         categories: dates.sort(date_sort_asc)
       },
       yAxis:{
           title: {
             text: `Perchases`
           },
       },
       series: [
     {
                        name: 'Month',
                        color: 'red',
                        data: Object.values(count(mydata))
                      },]
       }} ref="chart"></ReactHighcharts>;
  }
}
ChartData.propTypes = {
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
)(ChartData);

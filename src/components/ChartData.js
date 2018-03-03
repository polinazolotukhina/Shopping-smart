import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';


export default class ChartData extends Component {
  render() {
    const { items } = this.props;
    console.log('dfsdf', items)
    return(
         <ReactHighcharts config={
        {
           chart: {
             polar: true
           },
           xAxis: {
             categories: items && items.map( a => {return a.day})
           },

           series: [
              {
               data: items && items.map( a => {return a.day})
             },
             items && items.map ( a => { return {
               name: a.item,
               color: 'red',
               data:  a.day
             } }),


             ]



         }
        }>
            rtr
        </ReactHighcharts>
    )
  }
}

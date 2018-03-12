import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './containers/Home';
import AddItem from './containers/AddItem';
import EditItem from './containers/EditItem';
import Rating from './containers/Rating';
import ChartPage from './containers/ChartPage';
import NotFoundPage from './components/NotFoundPage';


export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="addItem" component={AddItem} />
            <Route path="editItem" component={EditItem} />
            <Route path="rating" component={Rating} />
            <Route path="chart" component={ChartPage} />
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>

);

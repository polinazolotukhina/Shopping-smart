import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import itemsReducer from './itemsReducer';


const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    items: itemsReducer
});

export default rootReducer;

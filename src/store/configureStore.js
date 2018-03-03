import {createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from '../reducers';


const config = {
    apiKey: "AIzaSyCFTGT-41tuggR3IHy13TjiKXUkf74N9UY",
    authDomain: "my-mobile-app-aadf7.firebaseapp.com",
    databaseURL: "https://my-mobile-app-aadf7.firebaseio.com",
    projectId: "my-mobile-app-aadf7",
    storageBucket: "my-mobile-app-aadf7.appspot.com",
    messagingSenderId: "590959121447"
}
firebase.initializeApp(config);

function configureStoreProd(initialState) {
    const middlewares = [
        // Add other middleware on this line...

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk
    ];

    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
    )
    );
}

function configureStoreDev(initialState) {
    const middlewares = [
        // Add other middleware on this line...
        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        apiMiddleware,
        thunk,
        logger,
        loadingBarMiddleware({
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
        })
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
    )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;

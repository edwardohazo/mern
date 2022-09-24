import { Legacy_createStore as createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

const reducer = combineReducers({
    
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);




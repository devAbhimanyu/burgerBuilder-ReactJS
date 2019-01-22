import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter}  from 'react-router-dom';
import {createStore,compose, applyMiddleware, combineReducers} from 'redux';
import {Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burgerReducer from './store/reducers/burgerBuiler.reducer';
import orderReducer from './store/reducers/order.reducer';
import authReducer from './store/reducers/authentication.reducer';



const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const rootCombinedReducer=combineReducers({
    burgerReducer: burgerReducer,
    orderReducer:orderReducer,
    authenticationReducer:authReducer
})

const store = createStore(rootCombinedReducer,composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store = {store}>
        <BrowserRouter basename='udemyBurgerBuilder'>
            <App />
        </BrowserRouter>
    </Provider>

)

ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

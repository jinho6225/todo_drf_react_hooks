import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { 
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
} from './action'
import thunk from 'redux-thunk';


const initialState = {
    isPending: false,
    todos: [],
    error: '',
    // isAddTodoPending: false,
    // error2: '',
    // isRMVTodoPending: false,
    // error3: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_SUCCESS:
            return {
                ...state, todos: action.payload, isPending: false
            }     
        case REQUEST_FAILED:
            return Object.assign({}, state, {
                error: action.payload,
                isPending: false,
            });
        default:
            return state
    }
}

// const rootReducer = combineReducers(reducer)
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));


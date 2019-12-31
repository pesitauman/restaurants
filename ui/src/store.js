import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { visibilityFilter, restaurants, current } from './reducers'

const reducer = combineReducers({ visibilityFilter, restaurants, current })
const store = createStore(reducer, applyMiddleware(thunk))

export default store
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import msgReducer from './chatReducer'
import socketReducer from '../asyncActions'

const rootReducer = combineReducers({
    chatData: msgReducer,
    socket: socketReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './reducers'

import Chat from './components/Chat'

ReactDOM.render(
    <Provider store={store}>
        <Chat />
    </Provider>,
    document.getElementById('root')
)

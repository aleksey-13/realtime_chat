import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setUsername,
    setMessage,
    setConnected
} from '../../reducers/chatReducer'

import './style.scss'

const InputMessage = () => {
    const dispatch = useDispatch()
    const msg = useSelector((state) => state.chatData.message)
    const username = useSelector((state) => state.chatData.username)
    const socket = useSelector((state) => state.socket.socket)
    const connected = useSelector((state) => state.chatData.connected)

    const sendMessage = () => {
        if (!msg.trim() || !username.trim()) {
            return false
        }

        if (!connected) {
            dispatch(setConnected(true))
        }

        const message = {
            id: Date.now(),
            username,
            value: msg,
            event: 'message'
        }

        socket.send(JSON.stringify(message))
        dispatch(setMessage(''))
    }

    return (
        <div className="chat__input-container">
            {!connected ? (
                <input
                    value={username}
                    type="text"
                    placeholder="Nickname"
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                />
            ) : (
                ''
            )}
            <input
                style={{ width: connected ? '100%' : '50%' }}
                value={msg}
                type="text"
                placeholder="Message"
                onChange={(e) => dispatch(setMessage(e.target.value))}
                onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default InputMessage

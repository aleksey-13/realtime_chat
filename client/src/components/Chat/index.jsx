import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSocket } from '../../asyncActions'

import InputMessage from '../InputMessage'
import MessagesList from '../MessagesList'

import './style.scss'

const Chat = () => {
    const dispatch = useDispatch()
    const socket = useSelector((state) => state.chatData.socket)

    useEffect(() => {
        dispatch(fetchSocket())
    }, [])

    //
    useEffect(() => {
        if (socket !== null) {
            socket.onclose = () => {
                setTimeout(() => {
                    dispatch(fetchSocket())
                    console.log('Try reconnect')
                }, 1000)
                console.log('Socket closed')
            }
        }
    }, [socket])
    //

    return (
        <section className="chat">
            <MessagesList />
            <InputMessage />
        </section>
    )
}

export default Chat

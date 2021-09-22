import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const MessagesList = () => {
    const messages = useSelector((state) => state.chatData.messagesData)

    const messagesRef = useRef(null)

    useEffect(() => {
        messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    if (!messages.length) {
        return <h1 className="chat__no-messages">No messages</h1>
    }

    return (
        <>
            <ul className="chat__content">
                {messages.map((message, idx) => (
                    <li
                        className="chat__content-message-wrapper"
                        key={message.id}
                    >
                        <p className="chat__content-message-nickname">
                            {message.username}
                        </p>
                        <p className="chat__content-message-text">
                            {message.value}
                        </p>
                    </li>
                ))}
                <span ref={messagesRef}></span>
            </ul>
        </>
    )
}

export default MessagesList

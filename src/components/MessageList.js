import React from 'react'
import useSWR from 'swr'

import style from './MessageList.styl'


const formatTime = t => `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`

const Message = ({message}) => {
  const time = new Date(message['ts'] * 1000)
  const username = message['user_profile']['display_name'].length < 1 ? message['user_profile']['real_name'] : message['user_profile']['display_name']

  return (
    <div>
      <div className={style.message}>
        <div className={style.time}>{formatTime(time)}</div>
        <div className={style.time}>{formatTime(time)}</div>
        <div className={style.body}>
          <span className={style.name}>{username}</span>
          <span className={style.text}>{message['text']}</span>
        </div>
      </div>
    </div>
  )
}

const MessageList = ({channel}) => {
  const { error, data: messages } = useSWR(`/api/messages/?channel=${channel}&latest=${null}`)

  if (error) {
    return (
      <div>error..</div>
    )
  }

  if (!messages) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={style.messages}>
      {messages.items.map(message => <Message key={message.id} message={message} />)}
    </div>
  )
}

export default MessageList

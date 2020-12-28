import React from 'react'
import useSWR from 'swr'

import SlackStore from 'stores/SlackStore'
import style from './ChannelList.styl'


const ChannelList = () => {
  const { error, data: channels } = useSWR('/api/channels')

  const changeChannel = channel => {
    SlackStore.update(s => {
      s.channel = channel
    })
  }

  if (error) {
    return (
      <div>error..</div>
    )
  }

  if (!channels) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={style.channels}>
      {channels.items.map(channel => (
        <div className={style.channel} onClick={() => changeChannel(channel.name)}>
          # {channel['name']}
        </div>
      ))}
    </div>
  )
}

export default ChannelList

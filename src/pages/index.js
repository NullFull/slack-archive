import React from 'react'
import { signIn, useSession } from 'next-auth/client'

import ChannelList from 'components/ChannelList'
import MessageList from 'components/MessageList'
import SlackStore from 'stores/SlackStore'

import style from './index.styl'


const Index = () => {
  const [ session, loading ] = useSession()
  const { channel } = SlackStore.useState(s => s)

  return (
    <div className={style.app}>
      {session ?
        <>
          <ChannelList />
          <MessageList channel={channel} />
        </> :
        <div>
          <button onClick={signIn}>Sign in</button>
        </div>
      }
    </div>
  )
}

export default Index

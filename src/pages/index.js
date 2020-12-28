import React from 'react'
import { useSession, getSession } from 'next-auth/client'

import ChannelList from 'components/ChannelList'
import MessageList from 'components/MessageList'
import SlackStore from 'stores/SlackStore'

import style from './index.styl'


const Index = () => {
  const [ session ] = useSession()
  const { channel } = SlackStore.useState(s => s)

  if (!session) {
    return null
  }

  return (
    <div className={style.app}>
      <ChannelList />
      <MessageList channel={channel} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const { res } = context

  if (!session) {
    res.writeHeader(307, {
      Location: '/api/auth/signin'
    })
    res.end()
  }

  return {
    props: { session }
  }
}

export default Index

const fetch = require('isomorphic-unfetch')
const querystring = require('querystring')
const { MongoClient } = require('mongodb')


const CACHED_USER_PROFILE = {}


const getUserProfile = async userId => {
  if (!CACHED_USER_PROFILE[userId]) {
    const endpoint = 'https://slack.com/api/users.profile.get'
    const qs = querystring.encode({
      token: process.env.SLACK_TOKEN,
      user: userId
    })

    const response = await fetch(endpoint + '?' + qs)
    const data = await response.json()

    CACHED_USER_PROFILE[userId] = data.profile
  }

  return CACHED_USER_PROFILE[userId]
}


const importMessages = async messages => {
  const client = new MongoClient(process.env.MONGO_DB_URL)
  await client.connect()

  const db = client.db('slack-archive')
  const collection = db.collection('messages')

  await Promise.all(messages.map(async message => {
    const date = new Date(message.ts * 1000)
    const channel = message.channel.name
    const profile = await getUserProfile(message.user)

    const exist = await collection.findOne({
      channel,
      date,
      ts: message.ts,
      user: message.user
    })

    if (exist) {
      return
    }

    return collection.insertOne({
      ...message,
      date,
      channel,
      ts: message.ts,
      user_profile: profile
    })
  }))
}


const main = async () => {
  console.info('start')

  let page = 1

  while (true) {
    const endpoint = 'https://slack.com/api/search.messages'
    const qs = querystring.encode({
      token: process.env.SLACK_TOKEN,
      query: 'on:yesterday',
      sort: 'timestamp',
      count: 100,
      page
    })

    const response = await fetch(endpoint + '?' + qs)
    const { messages } = await response.json()

    await importMessages(messages.matches)

    if (messages.paging.pages <= page) {
      break
    } else {
      page += 1
    }
  }

  console.info('done')
}

main().then(r => {
  process.exit(0)
})

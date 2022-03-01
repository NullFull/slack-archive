import { MongoClient } from 'mongodb'
import { getSession } from 'next-auth/client'
import * as api from 'utils/api'


export default async (req, res) => {
  const session = await getSession({req})
  if (!session) {
    return api.reject(res)
  }

  const { query: { channel, latest } } = req

  const client = new MongoClient(process.env.MONGO_DB_URL)
  await client.connect()

  const db = client.db('slack-archive')
  const messages = await db.collection('messages').find({
    channel
  }).sort({ts: -1}).limit(10000).toArray()

  api.response(res, {
    items: messages
  })
}

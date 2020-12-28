import { MongoClient } from 'mongodb'
import * as api from 'utils/api'


export default async (req, res) => {
  const client = new MongoClient(process.env.MONGO_DB_URL)
  await client.connect()

  const db = client.db('slack-archive')
  const channels = await db.collection('channels').find().toArray()

  api.response(res, {
    items: channels.map(({id, name, is_archived}) => ({id, name, is_archived}))
  })
}

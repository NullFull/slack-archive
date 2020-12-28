import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
  providers: [
    Providers.Slack({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET
    }),
  ]
}

export default (req, res) => NextAuth(req, res, options)

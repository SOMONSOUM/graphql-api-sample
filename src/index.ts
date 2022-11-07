import * as dotenv from 'dotenv'
import createApolloServer from './graphql/CreateApolloServer'
dotenv.config()

const server = createApolloServer()

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})

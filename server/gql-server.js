const { ApolloServer } = require('apollo-server')
require('dotenv').config()

//types (query / mutation/ subscription ) 
const typeDefs = `
  type Query {
      totalPosts: Int!
  }
`

//resolvers
const resolvers = {
    Query: {
        totalPosts: () => 47
    }
}

//graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

apolloServer.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))
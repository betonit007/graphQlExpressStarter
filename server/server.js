const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const http = require('http')
const path = require('path')
const { makeExecutableSchema } = require("graphql-tools")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")
const { loadFilesSync } = require("@graphql-tools/load-files")
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
console.log(process.env.MONGO_URI)
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log(`Connect to Mongo Atlas`)
    } catch (error) {
        console.log(error)
    }
}

//connect to Mongo Db
db()

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs'))) // will automatically merges any additional typeDefs
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')))

//graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

// applyMiddleware method connects ApolloServer to a specific HTTP framework like express.
apolloServer.applyMiddleware({ app })

// server - combines express server and apolloServer into one.
const httpserver = http.createServer(app)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
    console.log(`graphql listening on port ${process.env.PORT}${apolloServer.graphqlPath}`)
}
)

 
// // usage
// const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));
// const resolvers = mergeResolvers(
//   loadFilesSync(path.join(__dirname, "./resolvers"))
// );
const { gql } = require('apollo-server-express')

const totalPosts = () => 47

module.exports = {
    Query: {
        totalPosts,
    }
}
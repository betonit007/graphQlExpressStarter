const { gql } = require('apollo-server-express')

const me = () => "Hello JERKSTER!"

module.exports = {
    Query: {
        //me: () => 'Hello JERSTER' //alternative way
        me,
    }
}
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import db from './db.js'

const resolvers = {
    Query: {
        games() {
            return db.games
        },

        reviews() {
            return db.reviews
        },

        authors() {
            return db.authors
        },

        review(_, args) {
            return db.reviews.find((review) => args.id === review.id)
        },

        game(_, args) {
            return db.games.find(game => args.id === game.id)
        },

        author(_, args) {
            return db.authors.find(author => args.id === author.id)
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.author_id === parent.id)
        }
    }
}

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers 
})

const { url } = await startStandaloneServer(server, {
    listen: { port : 4000 }
})

console.log("Server ready at port ", 4000)
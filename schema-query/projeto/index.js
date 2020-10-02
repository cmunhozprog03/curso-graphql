const { ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int!
        salario: Float!
        vip: Boolean
    }

    # pontos de eentrada se dua API!
    type Query {
        ola: String!
        horaAtual : Date!
        usuarioLogado: Usuario
        
    }

`
const resolvers = {
    Query: {
        ola() {
            return 'Bom dia '
        },
        horaAtual(){
            return new Date
        },

        usuarioLogado(){
            return {
                id: 1,
                nome: 'Christovam',
                idade: 52,
                vip: false,
                email: 'cm@cm.com',
                salario: 9879.99
            }
        }
        
        
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
    
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
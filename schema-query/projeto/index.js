const { ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    # pontos de eentrada se dua API!
    type Query {
        ola: String
        horaAtual : String
        
        
        
    }

`
const resolvers = {
    Query: {
        ola() {
            return 'Bom dia '
        },
        horaAtual(){
            
            return `${new Date}`
            
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
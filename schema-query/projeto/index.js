const { ApolloServer, gql} = require('apollo-server')

const perfis = [
    {id: 1, nome: 'comum'},
    {id: 2, nome: 'administrador'}
]

const usuarios = [{
    id: 1,
    nome: 'joãp silva',
    email: 'jsilva@gmail.com',
    idade:29
},
{
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    idade:31
},{
    id: 3,
    nome: 'Christovam Munhoz',
    email: 'cm@cm.com',
    idade: 52
}]

const typeDefs = gql`
    scalar Date

    type Produto{
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }
    
    type Perfil{
        id: Int
        nome: String
    }

    type Usuario {
        id: Int
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
        produtoEmDestaque : Produto
        numeroMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario 
        perfis: [Perfil]
        perfil(id: Int): Perfil
        
    }

`
const resolvers = {
    Produto:{
        precoComDesconto(produto){
            if(produto.desconto){
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
                
            }
        }
    },
    Usuario: {
        salario(usuario){
            return usuario.salario_real
            
        }
    },
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
                salario_real: 9879.99
            }
        },
        produtoEmDestaque(){
            return {
                nome: 'Notebook Gamer',
                preco: 4899.99,
                desconto: 0.5
            }
        },
         numeroMegaSena(){
             return [4, 13, 15, 25, 50, 55]
         },
         usuarios(){
             return usuarios
         },
         usuario(_,{ id }){
             const selecionados = usuarios
             .filter(u => u.id === id)
             return selecionados ? selecionados[0] : null
            },
        perfis(){
            return perfis
        },
        perfil(_,{ id }){
            const selecionados = perfis
            .filter(p => p.id === id)
            return selecionados ? selecionados[0] : null
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
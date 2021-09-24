const Atendimento = require('../models/atendimentos_models')

module.exports =  app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    }) //criação para a primeira rota (post,get,put desses tipos e na model ele faz a execução da função)
    //função para pegar todos os objetos e listar

    app.get('/atendimentos/:id', (req, res) => { //o : é o parametro e o id é o nome do parametro
        console.log(req.params) //ele vai passar para gente o parametro e o valor que colocamos na URL.
        const id = parseInt(req.params.id)

        Atendimento.buscarPorId(id,res)
    }) //função para buscar cliente, por ID

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    }) //função para inserção de um novo cliente no banco de dados

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Atendimento.deleta(id, res)
    }) //função para deletar 
}
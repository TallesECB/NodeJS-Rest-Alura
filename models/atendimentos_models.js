const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento { //class com as funções do nosso CRUD (cadastra, edita, delete, lista e busca)
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS') //formatando os campos de data
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') //formatando os campos de data

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao) //comparando se a data do agendamento é maior ou igual a data atual
        const clienteEhValido = atendimento.cliente.length >= 5 //verificando se a quantidade de letras do nome do cliente é maior ou igual a cinco

        const validacoes = [ //validação que será apresentada caso conste algum erro
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            }, 
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    

        const erros = validacoes.filter(campo => !campo.valido) //estou verificando quais são os erros
        console.log(erros) //valida o array, se tem um false, no caso se o campo.valido for = a false, ele aumenta o comprimento pelo filter, algo que dá pra visulizar pelo console.log de debug
        const existemErros = erros.length //estou verificando se tem erros, se tem tem algo no comprimento do array
        console.log(existemErros)

        if(existemErros) {
            res.status(400).json(erros) //vai mostrar certinho os erros
        } else { //caso não tenha erro, irá executar a junção dos dados na variavel atendimentodatado e inserção ao MySQL.
            const atendimentoDatado = {...atendimento, dataCriacao, data} //estou passando a entrada de dados para a variavel atendimentoDatado, com a datacriacao e a data formatadas

            const sql = 'INSERT INTO Atendimentos SET ?' //campo para inserção do SQL
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => { //query de acesso
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscarPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}` 

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0] 
            //para devolver apenas um objeto, ao inves de todos os objetos filtrando e mostrando apenas o com ID = 1, valor que eu estou passando na minha URL no PostMan

            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento //exportando a função de atendimento
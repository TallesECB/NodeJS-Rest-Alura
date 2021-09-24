const mysql = require('mysql')

const conexao = mysql.createConnection({ //criando a conexão
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})

module.exports = conexao
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express() //pegou o App

    app.use(bodyParser.urlencoded({extended: true})) //usado para ler os dados do post
    app.use(bodyParser.json()) //usado para ler os dados do post

    consign()
        .include('controllers')
        .into(app)

    return app
}
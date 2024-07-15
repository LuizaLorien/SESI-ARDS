import "dotenv/config"
import express, {application, response} from "express";
import {v4 as uuidv4 } from "uuid"
import fs from 'node:fs'


const PORT = process.env.PORT
const app = express()

app

app.get('/usuarios', (req, res)=>{
    fs.readFile(__dirname + "/" + "usuarios.json", 'utf8', (err,data)=>{
        if(err){
            res.status(500).json({message: 'Erro no Banco de Dados'})
            return console.log(err)
        }

        const usuarios = data
        res.status(200).json({message: 'usuarios'})
    })
})

app.post('/usuarios', (req, res)=>{
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if(err){
            res.status(500).json({message: 'Erro ao cadastrar o usuario'})
            return console.error(err)
        }

        let jsonData = []

        try {
            jsonData = JSON.parse(data)
        } catch (error) {
            console.error("Erro ao analisar JSON:", error)
        }

        
    const {nome, email, senha, cpf } = req.body
    const id = uuidv4()
    
    if(!nome){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!email){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!senha){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!cpf){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    };

})

})
app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})


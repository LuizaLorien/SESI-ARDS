import "dotenv/config"
import express, {application, response} from "express";
import {v4 as uuidv4 } from "uuid"

const PORT = process.env.PORT
const app = express()


app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})
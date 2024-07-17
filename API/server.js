import "dotenv/config"
import { createServer } from "http";
import { URLSearchParams } from "url";
import {v4 as uuidv4 } from "uuid"
import writeData from "./writeData.js";
import readData from "./readData.js";
const PORT = process.env.PORT


const server = createServer((req, res)=>{
  const {method, url} = req

  const writeResponse = (status, resEnd = "", message = "Task finalizada com sucesso") =>{
    res.writeHead(status, {"Content-Type": "application/json"})
    res.end(JSON.stringify(resEnd))
    return console.log(message + '/n')
  }


if(method === 'GET' && url === '/user'){

  readData((err, data)=>{
    if(err){
      return writeResponse(500, {mensagem: "Erro ao ler os dados."})
    }
    writeResponse(200, data)
  })
}else if(method === "POST" && url === '/user'){
  let body = ''

  req.on('data', (chunk) => {body += chunk})
  req.on('end', ()=>{
        const newUser = JSON.parse(body)
    
        readData((err, data) =>{
            if(err){
                return writeResponse(500, {mensagem: "Erro ao ler os Dados."})
            }

            newUser.id = uuidv4()
            data.push(newUser)

            writeData(data, (err)=>{
              if(err){
                return writeResponse(500, {mensagem: "Erro ao cadastrar os dados."})
              }

              writeResponse(201, newUser)
            })
        })
    })
  }else if(method === "PUT" && url.startsWith('/users/')){

    const id = url.split[2]

    let body = ''

    req.on('data', (chunk) => {body += chunk})
    req.on('end', ()=>{
      const updateUsers = JSON.parse(body)

      if(!body){
        return writeResponse(400, {mensagem: "O corpo de solicitação está vazio."})
      }

      readData((err, data)=>{
        if(err){
          writeResponse(500, {mensagem: "Erro ao ler os dados."})
        }

        const index = data.findIndex(user => user.id === id)

        if(index === -1){
          return writeResponse(404, {mensagem: "Usuário não encontrado."})
        }

        data[index] = {...updateUsers, id:id}

        writeData(data, (err)=>{
          if(err){
            return writeResponse(500, {mensagem: "Erro ao ler os dados."})
          }

          writeResponse(201, data[index])
        })
      })
    })
  }else if(method === "DELETE" && url.startsWith('/users/')){
    const id = url.split[2]

    readData((err,data) =>{
      if(err){
        return writeResponse(500, {mensagem: "Erro ao ler os dados"})
      }

      const index = data.findIndex(data => data.id === id)

      if(index === -1){
        return writeResponse(404, {mensagem: "Usuário não encontrado"})
      }

      data.splice(index,1)

      writeData(data, (err)=>{
        if(err){
          return writeResponse(500, {mensagem: "Erro ao ler os dados."})
        }

        writeResponse(201, {mensagem: `Usuário com o ID: ${id} apagada com sucesso.`})
      })
    })
  }else if(method === "GET" && url.startsWith('/users/')){
    const id = url.split('/')[2];
    

    readData((err, data) => {
      if (err) {
        return writeResponse(500, { 
          mensagem: "Erro ao ler os dados. Por favor, tente novamente." });
      }

      const usersData = data.filter(data => {
        recipe.id((data) => data.includes(id))
      })

      console.log(usersData)
      res.end()
    })
  }

})



  
   




server.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})


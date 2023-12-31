const express = require('express')
const app = express()

app.get('/', function(req,res){
    res.send('server iniciated')
})


app.listen(3001, () =>{
    console.log("server iniciado en el puerto 3001")
})
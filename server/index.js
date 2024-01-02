const express = require('express');
const server = express();
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./creds.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

server.use(express.json());
server.use(cors());

server.get('/', function(req, res) {
  res.send('Servidor iniciado');
});

server.post('/create', async (req, res) => {
    const name = req.body.name;
    const data = req.body.data;
    const createdAt = new Date(); 

    try {
      const newDocRef = await db.collection('Gente').doc().set({
        name: name,
        data: data,
        createdAt: createdAt 

      })
  
      res.status(200).send('Nuevo documento creado con éxito. ID: ' + newDocRef.id);
    } catch (error) {
      console.error('Error al crear nuevo documento:', error);
      res.status(500).send('Error al crear nuevo documento');
    }
  });

  server.get("/getPosts", async (req, res) =>{
    
    try{
        const postDates = []
        const postsRef = db.collection("Gente").orderBy('createdAt', 'desc')
        const posts = await postsRef.get()
        
        posts.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            postDates.push(doc.data())
        })
        res.send(postDates)
    }catch (error){
        console.error("no se puedo recibir los datos")
        res.status(500).send("no se puedo recibir los datos")
    }
  })


server.listen(3001, () => {
  console.log('Servidor iniciado en el puerto 3001');
});

module.exports = { db };

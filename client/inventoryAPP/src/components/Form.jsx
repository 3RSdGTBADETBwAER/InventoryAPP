import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MyComponent = () => {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [post, setPost] = useState([])

  useEffect(() =>{
    const getPost = axios.get('http://localhost:3001/getPosts')
      .then(response => {
        setPost(response.data)
        console.log(post)
      })
      .catch(error =>{
        console.error("no se puedo obtener la data", error)
      })
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/create', {
        name: name,
        data: data
      });

      console.log(response.data); // Muestra la respuesta del servidor en la consola
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }

    const getPost = axios.get('http://localhost:3001/getPosts')
      .then(response => {
        setPost(response.data)
        console.log(post)
      })
      .catch(error =>{
        console.error("no se puedo obtener la data", error)
      })
  };

  return (
    <div>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Texto"
        />
        <button type="submit">Enviar</button>
      </form>
      <div>
        <h1> Respeustas</h1>
        <div>
            {
              post.map((post, index) =>(
                <div key={index}>{post.name}: {post.data}</div>
              ))         
            }
        </div>
      </div>
    </div>
  );
};

export default MyComponent;

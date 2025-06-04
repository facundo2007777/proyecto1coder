import express from 'express'
import ProductManager from '../manager/product.js'

const app = express.Router()
const productManager = new ProductManager('./src/json/productos.json')

app.get('/api/products', (req, res)=>{

});

//Debe traer solo el producto con el id proporcionado.
app.get('/api/products/:pid', (req, res)=>{

});

//Debe agregar un nuevo producto
app.post('/api/products', (req, res)=>{

});

//Debe actualizar un producto
app.put('/api/products/:pid', (req, res)=>{

});

//Debe eliminar el producto con el pid indicado
app.delete('/api/products/:pid', (req, res)=>{

});

export default app
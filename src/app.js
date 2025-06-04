import express from 'express'
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'

const app = express()
app.use(express.json())

app.use('/productos', productsRouter)
app.use('/carritos', cartsRouter)

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080')
})
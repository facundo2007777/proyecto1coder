import express from 'express'
import ProductManager from '../manager/product.js'

const router = express.Router()
const productManager = new ProductManager('./src/json/productos.json')

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.json({ status: 'success', products })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})
router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid
        const product = await productManager.getProductById(productId)
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' })
        }
        res.json({ status: 'success', product })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduct = req.body
        const product = await productManager.addProduct(newProduct)
        res.status(201).json({ status: 'success', product })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid
        const updatedProduct = req.body
        const product = await productManager.updateProduct(productId, updatedProduct)
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' })
        }
        res.json({ status: 'success', product })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})
router.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid
        const result = await productManager.deleteProduct(productId)
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' })
        }
        res.json({ status: 'success', result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})

export default router
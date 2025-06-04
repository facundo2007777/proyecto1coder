import express from 'express'
import CartManager from '../manager/cartManager.js'

const router = express.Router()
const cartManager = new CartManager('./src/json/carrito.json')

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.addCart()
        res.status(201).json({ status: 'success', cart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartManager.getCartById(cartId)
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' })
        }
        res.json({ status: 'success', cart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
})

router.post('/:cid/productos/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const result = await cartManager.addProductToCart(cartId, productId)
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' })
        }
        res.json({ status: 'success', result })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
})

router.delete('/:cid/productos/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const result = await cartManager.removeProductFromCart(cartId, productId)
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' })
        }
        res.json({ status: 'success', result })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const result = await cartManager.deleteCart(cartId)
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' })
        }
        res.json({ status: 'success', result })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
})

export default router
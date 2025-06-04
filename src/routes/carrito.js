import express from 'express'
import CartManager from '../manager/cartManager.js'

const app = express.Router()
const cartManager = new CartManager('./src/json/carrito.json')



app.post("/api/carts", async(_req, res)=> {
  try {
    const carts = await cartManager.addCart();
    res.status(201).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
})

app.post("/api/carts/:cid/product/:pid", async(req, res)=> {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;

    const carts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/carts/:cid", async(req, res)=> {
  try {
    const cid = req.params.cid;

    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
})


export default app
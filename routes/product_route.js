const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller");

router.get("/", async (req, res) => {
  try {
    const product = await productController.getProduct();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, type, price, idUpload } = req.body;
  try {
    const newProduct = await productController.addProduct(name, type, price, idUpload);
    res.json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  const {  id, name, type, price, idUpload } = req.body;
  try {
    const updateProduct = await productController.updateProduct(
      id,
      name,
      type,
      price,
      idUpload
    );
    res.json({ message: "Product updated successfully", updateProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await productController.deleteProduct(id)
    if(!deleteProduct){
        res.status(404).json({ message: 'Product not found or already deleted'})
    } else {
        res.json({ message: 'success Deleted Product'})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
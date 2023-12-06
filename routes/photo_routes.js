const express = require("express");
const router = express.Router();
const photoController = require("../controller/photo_controller");

router.get("/", async (req, res) => {
  try {
    const photo = await photoController.getPhotos();
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { namaFile, data } = req.body;
  try {
    const newPhoto = await photoController.addPhoto(namaFile, data);
    res.json({ message: "Photo added successfully", newPhoto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  const { id, namaFile, data } = req.body;
  try {
    const updatePhoto = await photoController.updatePhoto(id, namaFile, data);
    res.json({ message: "Photo update successfully", updatePhoto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletePhoto = await photoController.deletePhoto(id);
    res.json({ message: "Photo update successfully", updatePhoto });
    if(!deletePhoto){
        res.status(404).json({ message: 'Product not found or already deleted'})
    } else {
        res.json({ message: 'success Deleted Product'})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router
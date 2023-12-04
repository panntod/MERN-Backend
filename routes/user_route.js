const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

// Route untuk mendapatkan semua pengguna
router.get('/', async (req, res) => {
  try {
    const users = await userController.getUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route untuk menambah pengguna baru
router.post('/', async (req, res) => {
  const { name, age, address, email } = req.body;
  try {
    const newUser = await userController.addUser(name, age, address, email);
    res.json({ message: 'User added successfully', newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route untuk memperbarui pengguna
router.put('/', async (req, res) => {
  const { id, name, age, address, email } = req.body;
  try {
    const updatedUser = await userController.updateUser(id, name, age, address, email);
    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route untuk menghapus pengguna
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userController.deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found or already deleted' });
    } else {
      res.json({ message: 'Success Deleted User', deletedUser });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

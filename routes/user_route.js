const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");

// Route untuk mendapatkan semua pengguna
router.get("/", async (req, res) => {
  try {
    const users = await userController.getUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route untuk menambah pengguna baru
router.post("/", async (req, res) => {
  const { name, age, address, email, password } = req.body;
  try {
    const newUser = await userController.addUser(name, age, address, email, password);
    res.json({ message: "User added successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route untuk memperbarui pengguna
router.put("/", async (req, res) => {
  const { id, name, age, address, email, password } = req.body;
  try {
    const updatedUser = await userController.updateUser( id, name, age, address, email, password);
    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route untuk menghapus pengguna
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userController.deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found or already deleted" });
    } else {
      res.json({ message: "Success Deleted User", deletedUser });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginResult = await userController.loginUser(email, password);
    if (loginResult.success) {
      res.status(200).json(loginResult);
    } else {
      res.status(401).json(loginResult);
      console.log(loginResult);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;

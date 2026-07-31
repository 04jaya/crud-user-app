const express = require("express");

const router = express.Router();

const User = require("../User");
// GET API - Get All Users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch(error) {
    res.status(500).json({
        message: error.message  
    });
  }
});

// POST API - Save User
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      message: "User added successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving user",
      error: error.message
    });
  }
});

// PUT API - Update User
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
});

// DELETE API - Delete User
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message
    });
  }
});

module.exports = router;
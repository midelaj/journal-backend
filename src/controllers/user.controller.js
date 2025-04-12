const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const exitingUser = await User.findOne({ $or: [{ email }, { name }] });

    if (exitingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log("error:", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password)
      return res.statu(400).json({ error: "All fields are requred" });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.statu(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Found user", user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!updateUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const deletedUser = await User.findByIdAndDelete(user);

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Delete unsuccessfully", error });
  }
};

const getAllUser = async (req, res) =>{
  const user = await User.findOne();
  res.json(user)
}
module.exports = { register, getUser, loginUser, updateUser, deleteUser };

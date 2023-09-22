const bcrypt = require("bcrypt");
const user = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const SECRET_KEY = "this is april nodejs batch";
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all the credentials" });
  }

  const findUser = await user.findOne({ email });
  if (findUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  try {
    const saltRound = 9;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await new user({
      name,
      email,
      password: hashedPassword,
    });

    newUser.save();

    //sending user details if successfully is user is successfully registered
    return res.status(200).send({ newUser });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Please enter valid credentials" });
    }

    const loginUser = await user.findOne({ email });
    if (!loginUser) {
      return res.status(400).send({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, loginUser.password);

    if (!match) {
      return res.status(400).send({ error: "Password incorrect" });
    }

    const token = jwt.sign(
      { email: loginUser.email, name: loginUser.name },
      SECRET_KEY
    );

    //   getting token if successfullly login
    res.status(200).send({ token: token, username: loginUser.name });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };

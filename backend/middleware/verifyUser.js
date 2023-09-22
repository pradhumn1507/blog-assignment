const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const verifyUser = async (req, res, next) => {
  // console.log('nothing');
  if (!req.headers.authorization) {
    res.status(400).send("Please log in again");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).send("Not Verified");
  }

  try {
    const verify = await jwt.verify(token, SECRET_KEY);
    req.user = verify;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { verifyUser };

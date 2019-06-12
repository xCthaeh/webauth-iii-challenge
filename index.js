require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./data/dbConfig.js");
const port = 8000;
const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["sales", "marketing"]
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "24h"
  };

  return jwt.sign(payload, secret, options);
}

server.listen(port, function() {
  console.log(`\n=== API Listening on http://localhost:${port} ===\n`);
});

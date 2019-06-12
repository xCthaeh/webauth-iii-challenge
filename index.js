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

server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Login successful! Welcome!", token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.json(err));
});

server.listen(port, function() {
  console.log(`\n=== API Listening on http://localhost:${port} ===\n`);
});

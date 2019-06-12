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

server.listen(port, function() {
  console.log(`\n=== API Listening on http://localhost:${port} ===\n`);
});

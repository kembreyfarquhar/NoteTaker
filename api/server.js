const express = require("express");
const helmet = require("helmet");

// const db = require("../dbconfig.js");
const notesRouter = require("../notes/notesRouter");
const userRouter = require("../users/userRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/notes", notesRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("<h1>Welcome to NoteTaker</h1>");
});

module.exports = server;

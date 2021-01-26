const express = require("express")
const server = express()
server.use(express.json())

const usersRouter = require("./users/router")

server.use("/api/users", usersRouter)

server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack})
})

module.exports = server

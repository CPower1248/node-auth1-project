const express = require("express")
const server = express()
server.use(express.json())

const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

server.use(session({
  name: "corey session",
  secret: "wanna know a secret?",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("../data/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}))

const usersRouter = require("./users/router")
const authRouter = require("./auth/authRouter")

server.use("/api/users", usersRouter)
server.use("/api/auth", authRouter)

server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack})
})

module.exports = server

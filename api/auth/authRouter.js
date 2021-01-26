const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const Users = require("../users/model")

router.post("/register", (req, res, next) => {
  const { username, password } = req.body

  const hashed = bcrypt.hashSync(password, 10)

  Users.add({ username, password: hashed })
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body

  try{
    const allegedUser = await Users.findBy({ username }).first()

    if (allegedUser && bcrypt.compareSync(password, allegedUser.password)) {
      req.session.user = allegedUser
      res.status(200).json("Logged in!")
    } else {
      res.status(401).json("You shall not pass!")
    }
  } catch (err) {
    next(err)
  }
})

router.get("/logout", (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (!err) {
        res.json("Bye!")
      } else {
        res.json("You cannot leave...")
      }
    })
  } else {
    res.end()
  }
})

module.exports = router

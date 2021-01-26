const express = require("express")
const router = express.Router()

const Users = require("./model")

const { valUser } = require("../middleware")

router.get("/", (req, res, next) => {
  Users.find()
    .then(users => res.json(users))
    .catch(next)
})

router.post("/", valUser, (req, res, next) => {
  Users.add(req.body)
    .then(user => res.json(user))
    .catch(next)
})

module.exports = router

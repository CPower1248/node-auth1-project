const express = require("express")
const router = express.Router()

const Users = require("./model")

const { valUser } = require("../middleware")
const protected = require("../auth/authMiddleware")

router.get("/", protected, (req, res, next) => {
  Users.find()
    .then(users => res.json(users))
    .catch(next)
})

module.exports = router

module.exports = {
  valUser
}

function valUser(req, res, next) {
  const { username, password } = req.body

  if (username && password) {
    next()
  } else {
    res.json("Missing required username and password")
  }
}

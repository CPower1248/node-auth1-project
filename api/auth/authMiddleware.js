module.exports = function(req, res, next) {
  if (req.session && req.session.user) {
    next()
  } else {
    res.json("You shall not pass!")
  }
}

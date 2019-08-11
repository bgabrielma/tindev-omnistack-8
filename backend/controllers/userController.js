const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { authSecret } = require('../.env')

module.exports = app => {
  const generateHash = (password, callback) => {
    bcrypt.genSalt(10, (_err, salt) => {
      bcrypt.hash(password, salt, (_err, hash) => callback(hash))
    })
  }

  const generateJwt = (data) => {
    return jwt.sign({
      payload: data
    }, authSecret, { expiresIn: '10d' })
  }

  const save = (req, res) => {
    const { password } = req.body

    generateHash(password, hash => {
      const id = generateJwt({ id: 'raw23', email: 'rawbgabrielma.dev.pt' })
      res.status(200).send({ jwt: id })
    })
  }

  const verify = (req, res) => {
    const accessKey = req.headers.authorization.split(' ')[1]
    jwt.verify(accessKey, authSecret, (err, decoded) => {
      if (err) {
        res.status(401).send({ response: err })
      } else {
        const { payload } = decoded
        res.status(200).send({ payload })
      }
    })
  }

  return { save, verify }
}

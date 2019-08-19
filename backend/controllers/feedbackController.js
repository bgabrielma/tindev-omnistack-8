const { authSecret } = require('../.env')

const { auth, errorInvalidKey, invalidDataReceived } = require('../utils/functions')

module.exports = app => {
  const newLike = (req, res) => {
    const { giver } = req.body
    const { destination } = req.params

    const isValid = auth(req.headers.authorization.split(' ')[1])

    if (!isValid) {
      return res.status(401).send(errorInvalidKey(req))
    }

    if (!giver) {
      return res.status(403).send(invalidDataReceived())
    }

    app.db('likes')
      .insert({
        id_giver: giver,
        id_receiver: destination
      })
      .then(_ => res.status(200).send({ ok: true }))
      .catch(_err => res.status(403).send({ giver, destination }))
  }

  const getLikes = (req, res) => {
    const isValid = auth(req.headers.authorization.split(' ')[1])

    if (!isValid) {
      return res.status(401).send(errorInvalidKey(req))
    }

    app.db('likes')
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err))
  }

  const newDislike = (req, res) => {
    const { giver } = req.body
    const { destination } = req.params

    const isValid = auth(req.headers.authorization.split(' ')[1])

    if (!isValid) {
      return res.status(401).send(errorInvalidKey(req))
    }

    if (!giver) {
      return res.status(403).send(invalidDataReceived())
    }

    app.db('dislikes')
      .insert({
        id_giver: giver,
        id_receiver: destination
      })
      .then(_ => res.status(200).send({ ok: true }))
      .catch(err => res.status(403).send(err))
  }

  const getDislikes = (req, res) => {
    const isValid = auth(req.headers.authorization.split(' ')[1])

    if (!isValid) {
      return res.status(401).send(errorInvalidKey(req))
    }

    app.db('dislikes')
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err))
  }

  return { newLike, newDislike, getLikes, getDislikes }
}

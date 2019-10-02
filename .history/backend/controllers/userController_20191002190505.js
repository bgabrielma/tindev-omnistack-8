const axios = require('axios')
const { auth, errorInvalidKey, invalidDataReceived } = require('../utils/functions')

module.exports = app => {
  const findUserByUsername = user => {
    return app.db('user').first().where({ user })
  }

  const save = async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).send(invalidDataReceived)
    }

    const isValid = auth(req.headers.authorization.split(' ')[1] || '')
    const { user } = req.body

    if (!isValid) {
      return res.status(401).send(errorInvalidKey(req))
    }

    if (!(user)) {
      return res.status(403).send(invalidDataReceived)
    }

    const response = await axios.get(`https://api.github.com/users/${user}`)
      .catch(err => { return res.status(400).json(err) })

    // eslint-disable-next-line camelcase
    const { avatar_url: avatar, bio } = response.data

    app.db('user')
      .insert({ user, avatar: avatar, bio })
      .then(_ => {
        findUserByUsername(user)
          .catch(err => res.status(401).json(err))
          .then(data => res.status(200).json(data))
      })
      .catch(err => {
        if (err.sqlState === '23000') {
          app.db('user')
            .first()
            .where({ user })
            .update({ avatar, bio })
            .then(_ => {
              findUserByUsername(user)
                .catch(err => res.status(401).json(err))
                .then(data => res.status(200).json(data))
            })
            .catch(err => res.json(err))
        } else {
          res.status(400).json(err)
        }
      })
  }

  const get = async (req, res) => {
    const { giver: id } = req.headers

    if (!req.headers.authorization) {
      return res.status(403).send(invalidDataReceived)
    }

    const isValid = auth(req.headers.authorization.split(' ')[1] || '')

    if (!isValid) {
      return res.status(401).send(errorInvalidKey(req))
    }

    if (!(id)) {
      return res.status(403).send(invalidDataReceived)
    }

    app.db('user')
      .select('user.*')
      .whereNotIn('id', function () {
        this.select('id_receiver')
          .from('likes')
          .where('id_giver', '=', id)
      })
      .whereNotIn('id', function () {
        this.select('id_receiver')
          .from('dislikes')
          .where('id_giver', '=', id)
      })
      .whereNot('user.id', id)
      .then(users => res.status(200).send(users))
      .catch(err => res.status(401).send(err))
  }

  return { save, get }
}

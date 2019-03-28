const bcrypt = require('bcrypt')
const { common } = require('@configs')

function hashPassword(password) {
  return bcrypt.hash(password, common.saltRounds)
}

module.exports = {
  hashPassword,
}

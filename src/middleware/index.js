const passport = require('passport')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const swaggerDocument = YAML.load(path.resolve(__dirname, '../../api/index.yml'))
const PUBLIC_PATH = ['/signup', '/login']

module.exports = function middleware(app) {
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  )
  app.use(
    '/',
    (req, res, next) => {
      if (PUBLIC_PATH.includes(req.url)) {
        next()
        return
      }
      passport.authenticate('bearer', { session: false })(req, res, next)
    },
    (req, res, next) => {
      req.feathers.user = req.user
      next()
    },
  )
}

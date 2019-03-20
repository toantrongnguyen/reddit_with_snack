// const { Verifier, ExtractJwt } = require('@feathersjs/authentication-jwt')

module.exports = {
  path: '/authentication', // the authentication service path
  header: 'Authorization', // the header to use when using JWT auth
  // the entity that will be added to the request, socket, and context.params.
  // (ie. req.user, socket.user, context.params.user)
  entity: 'user',
  secret: 'supersecret', // either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA.
  service: 'users', // the service to look up the entity
  // whether the request object should be passed to the strategies `verify` function
  passReqToCallback: true,
  session: false, // whether to use sessions
  cookie: {
    enabled: false, // whether cookie creation is enabled
    name: 'feathers-jwt', // the cookie name
    httpOnly: false, // when enabled, prevents the client from reading the cookie.
    secure: true, // whether cookies should only be available over HTTPS
  },
  jwt: {
    header: { typ: 'access' }, // by default is an access token but can be any type. This is not a typo!
    audience: 'https://yourdomain.com', // The resource server where the token is processed
    subject: 'anonymous', // Typically the entity id associated with the JWT
    issuer: 'feathers', // The issuing server, application or resource
    algorithm: 'HS256', // the algorithm to use
    expiresIn: '1d', // the access token expiry
  },
}

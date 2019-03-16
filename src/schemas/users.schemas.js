const yup = require('yup')

const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),

  password: yup
    .string()
    .min(8)
    .required(),

  createdAt: yup
    .date()
    .default(() => new Date()),
})

module.exports = {
  createUserSchema,
}

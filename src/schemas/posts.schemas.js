const yup = require('yup')

const patchPostSchema = yup.object().shape({
  upVoteTimes: yup
    .number()
    .positive(),
})

module.exports = {
  patchPostSchema,
}

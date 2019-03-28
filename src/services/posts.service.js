const { PostsModel } = require('@models')
const { Unprocessable } = require('@feathersjs/errors')

class PostsService {
  constructor(app) {
    this.app = app
    this.PostsModel = PostsModel
  }

  async find() {
    try {
      return this.PostsModel.query()
    } catch (e) {
      return new Unprocessable()
    }
  }

  async create(data, params) {
    const { title, body, isDraft } = data
    const userId = params.user.id
    try {
      return this.PostsModel
        .query()
        .insert({
          title,
          body,
          isDraft,
          userId,
        })
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }

  async update(id, data, params) {
    const {
      title,
      body,
      isDraft,
    } = data
    const userId = params.user.id
    try {
      const post = await this.PostsModel
        .query()
        .findById(id)
      if (post.userId !== userId) return new Unprocessable()
      await this.PostsModel
        .query()
        .update({
          title,
          body,
          isDraft,
        })
        .where('id', id)
      return true
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }
}

PostsService.ROUTE = '/posts'

module.exports = PostsService

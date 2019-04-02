const { PostsModel } = require('@models')
const { Unprocessable, Forbidden, NotFound } = require('@feathersjs/errors')

class PostsService {
  constructor() {
    this.PostsModel = PostsModel
  }

  setup(app) {
    this.app = app
  }

  async getPostByPermission(id, userId) {
    const post = await this.PostsModel
      .query()
      .findById(id)
    if (!post) throw new NotFound()
    if (post.userId !== userId) throw new Forbidden()
    return post
  }

  async find() {
    try {
      return this.PostsModel.query()
    } catch (e) {
      return new Unprocessable()
    }
  }

  async get(id, params) {
    const userId = params.user.id
    try {
      return this.getPostByPermission(id, userId)
    } catch (e) {
      this.app.get('log')(e)
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
      await this.getPostByPermission(id, userId)
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

  async remove(id, params) {
    const userId = params.user.id
    try {
      await this.getPostByPermission(id, userId)
      await this.PostsModel
        .query()
        .deleteById(id)
      return true
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }

  async patch(id, data, params) {
    const { upVoteTimes } = data
    const userId = params.user.id
    try {
      const { vote } = await this.getPostByPermission(id, userId)
      const newVote = upVoteTimes && vote + upVoteTimes
      await this.PostsModel
        .query()
        .update({
          ...newVote && { vote: newVote },
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

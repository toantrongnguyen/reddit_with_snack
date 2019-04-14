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
      throw new Unprocessable()
    }
  }

  async get(id, params) {
    const userId = params.user.id
    try {
      return this.getPostByPermission(id, userId)
    } catch (e) {
      throw new Unprocessable()
    }
  }

  async create(data, params) {
    const { title, body, publish } = data
    const userId = params.user.id
    try {
      return this.PostsModel
        .query()
        .insert({
          title,
          body,
          publish,
          userId,
        })
    } catch (e) {
      throw new Unprocessable()
    }
  }

  async update(id, data, params) {
    const {
      title,
      body,
      publish,
    } = data
    const userId = params.user.id
    await this.getPostByPermission(id, userId)
    try {
      await this.PostsModel
        .query()
        .update({
          title,
          body,
          publish,
        })
        .where('id', id)
      return true
    } catch (e) {
      throw new Unprocessable()
    }
  }

  async remove(id, params) {
    const userId = params.user.id
    await this.getPostByPermission(id, userId)
    try {
      await this.PostsModel
        .query()
        .deleteById(id)
      return true
    } catch (e) {
      throw new Unprocessable()
    }
  }

  async patch(id, data, params) {
    const { upVoteTimes } = data
    const userId = params.user.id
    const { vote } = await this.getPostByPermission(id, userId)
    try {
      const newVote = upVoteTimes && vote + upVoteTimes
      await this.PostsModel
        .query()
        .update({
          ...newVote && { vote: newVote },
        })
        .where('id', id)
      return true
    } catch (e) {
      throw new Unprocessable()
    }
  }
}

PostsService.ROUTE = '/posts'

module.exports = PostsService

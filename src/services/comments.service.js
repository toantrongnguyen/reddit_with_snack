const { CommentsModel, PostsModel } = require('@models')
const { Unprocessable, Forbidden, NotFound } = require('@feathersjs/errors')

class CommentsService {
  constructor() {
    this.CommentsModel = CommentsModel
    this.PostsModel = PostsModel
  }

  setup(app) {
    this.app = app
  }

  async getCommentByPermission(id, userId) {
    if (!id) throw new NotFound()
    const comment = await this.CommentsModel
      .query()
      .findById(id)
    if (!comment) throw new NotFound()
    if (comment.userId !== userId) throw new Forbidden()
    return comment
  }

  async checkPostExist(id) {
    if (!id) throw new NotFound()
    const post = await this.PostsModel
      .query()
      .findById(id)
    if (!post) throw new NotFound()
    if (!post.publish) throw new Forbidden()
    return post
  }

  async find(params) {
    const { query: { postId } } = params
    try {
      await this.checkPostExist(postId)
    } catch (e) {
      return e
    }
    try {
      const comments = await this.CommentsModel
        .query()
        .join('users', 'comments.userId', 'users.id')
        .where('postId', postId)
        .select(
          'comments.id',
          'comments.content',
          'comments.updatedAt as date',
          'users.id as userId',
          'users.email as userEmail',
        )
      return comments
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }

  async create(data, params) {
    const { content, postId } = data
    const userId = params.user.id
    try {
      await this.checkPostExist(postId)
    } catch (e) {
      return e
    }
    try {
      return this.CommentsModel
        .query()
        .insert({
          postId,
          userId,
          content,
        })
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }

  async update(id, data, params) {
    const { content } = data
    const userId = params.user.id
    try {
      await this.getCommentByPermission(id, userId)
    } catch (e) {
      return e
    }
    try {
      await this.CommentsModel
        .query()
        .update({ content })
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
      await this.getCommentByPermission(id, userId)
    } catch (e) {
      return e
    }
    try {
      await this.CommentsModel
        .query()
        .deleteById(id)
      return true
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }
}

CommentsService.ROUTE = '/comments'

module.exports = CommentsService

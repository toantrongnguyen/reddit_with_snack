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

  async getCommentByPermission(id, userId, checkBelongToCurrentUser = true) {
    if (!id) throw new NotFound()
    const comment = await this.CommentsModel
      .query()
      .findById(id)
    if (!comment) throw new NotFound()
    if (checkBelongToCurrentUser && comment.userId !== userId) throw new Forbidden()
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
          'comments.commentId',
          'comments.content',
          'comments.updatedAt as date',
          'users.id as userId',
          'users.email as userEmail',
        )

      // Mapping child - parrent comment
      for (let i = comments.length; i--; i >= 0) {
        const comment = comments[i]
        const { commentId } = comment
        if (!commentId) break
        const parentComment = comments.find(item => item.id === commentId)
        if (parentComment.children) parentComment.children.push(comment)
        else parentComment.children = [comment]
        delete comments[i]
      }

      const filterNullComments = comments.filter((comment) => {
        if (comment) {
          if (!comment.children) comment.children = []
          return true
        }
        return false
      })
      return filterNullComments
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }

  async create(data, params) {
    const { content, parrentId } = data
    const userId = params.user.id
    const { postId } = params.query
    await this.checkPostExist(postId)
    if (parrentId) await this.getCommentByPermission(parrentId, userId, false)
    try {
      return this.CommentsModel
        .query()
        .insert({
          postId,
          userId,
          commentId: parrentId,
          content,
        })
    } catch (e) {
      throw new Unprocessable()
    }
  }

  async update(id, data, params) {
    const { content } = data
    const userId = params.user.id
    await this.getCommentByPermission(id, userId)
    try {
      await this.CommentsModel
        .query()
        .update({ content })
        .where('id', id)
      return true
    } catch (e) {
      throw new Unprocessable()
    }
  }

  async remove(id, params) {
    const userId = params.user.id
    await this.getCommentByPermission(id, userId)
    try {
      await this.CommentsModel
        .query()
        .deleteById(id)
      return true
    } catch (e) {
      throw new Unprocessable()
    }
  }
}

CommentsService.ROUTE = '/comments'

module.exports = CommentsService

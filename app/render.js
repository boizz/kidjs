'use strict'

module.exports = (app, router) => {
  return (path, page) => {
    router.get(path, async ctx => {
      ctx.body = await app.render(ctx.req, ctx.res, page, ctx.query)
    })
  }
}

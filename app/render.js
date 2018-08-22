'use strict'

const LRUCache = require('lru-cache')
const config = require('./config')

const ssrCache = new LRUCache(Object.assign({
  max: 100,
  maxAge: 1000 * 60 * 1
}, config.server.cache || {}))

module.exports = (app, router) => (path, page) => {
  router.get(path, async ctx => {
    const { req, res, query } = ctx
    const key = req.url

    if (ssrCache.has(key)) {
      ctx.set('x-cache', 'HIT')
      ctx.body = ssrCache.get(key)
      return
    }
    try {
      const html = await app.renderToHTML(req, res, page, query)

      if (ctx.status !== 200) {
        ctx.body = html
        return
      }

      ssrCache.set(key, html)

      ctx.set('x-cache', 'MISS')
      ctx.body = html
    } catch (e) {
      ctx.status = 500
    }
  })
}

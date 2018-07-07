'use strict'

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const config = require('./config')

const port = config.server.port || 8001
const dev = !['prod', 'production'].includes(process.env.NODE_ENV)
const app = next({ dev, conf: config.client })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      ctx.config = config
      await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line
    })
  })

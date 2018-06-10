'use strict'

const { resolve } = require('path')
const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const routerPath = resolve(process.cwd(), './app/router')

const config = require('./config')
const controller = require('./controller')
const appRender = require('./render')
const serverRouter = require(routerPath)

const port = config.server.port || 7214
const dev = !['prod', 'production'].includes(process.env.NODE_ENV)
const app = next({ dev, conf: config.client })
const handle = app.getRequestHandler()

module.exports = () => {
  app.prepare()
    .then(() => {
      const server = new Koa()
      const router = new Router()
      const render = appRender(app, router)

      serverRouter({ router, controller, render })

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
}

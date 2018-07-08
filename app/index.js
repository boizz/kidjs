'use strict'

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const config = require('./config')
const controller = require('./controller')
const service = require('./service')
const appRender = require('./render')

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

      try {
        const { resolve } = require('path')
        const routerPath = resolve(process.cwd(), './app/router')
        const serverRouter = require(routerPath)
        serverRouter({ router, controller, render })
      } catch (e) {}

      router.get('*', async ctx => {
        await handle(ctx.req, ctx.res)
      })

      server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        ctx.config = config
        ctx.service = service
        await next()
      })

      server.use(router.routes())
      server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line
      })
    })
}

'use strict'

const { resolve } = require('path')
const moduleLoader = require('./utils/moduleLoader')

const dirPath = resolve(process.cwd(), './config')

const configs = moduleLoader(dirPath)

let env = 'local'

switch (process.env.NODE_ENV) {
  case 'production':
  case 'prod':
    env = 'prod'
    break
  case 'test':
    env = 'test'
    break
  case 'development':
  case 'dev':
    env = 'dev'
    break
  default:
    env = 'local'
}

let server = configs['config.default'] || {}
if (configs[`config.${env}`]) {
  server = Object.assign(server, configs[`config.${env}`])
}

const client = server.page
delete server.page

server.privateKey = `${+new Date()}_${parseInt(Math.random() * 10000)}`

client.publicRuntimeConfig = server.public
client.distDir = resolve(process.cwd(), '.build')

module.exports = { server, client }

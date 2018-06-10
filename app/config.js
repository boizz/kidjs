'use strict'

const { resolve } = require('path')
const moduleLoader = require('./utils/modulesLoader')

const dirPath = resolve(process.cwd(), './config')

let configs = {}

try {
  configs = moduleLoader(dirPath)
} catch (e) {}

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
  case 'unittest':
  case 'unit':
    env = 'unittest'
    break
  default:
    env = 'local'
}

let server = configs['config.default'] || {}
if (configs[`config.${env}`]) {
  server = Object.assign(server, configs[`config.${env}`])
}

const client = server.client || {}
delete server.client

server.privateKey = `${+new Date()}_${parseInt(Math.random() * 10000)}`

client.publicRuntimeConfig = server.public

server = Object.assign(server, server.public)
delete server.public

client.serverRuntimeConfig = server
client.distDir = '.build'

module.exports = { server, client }

'use strict'

const { resolve } = require('path')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const moduleLoader = require('./utils/modulesLoader')
const env = require('./env')

const dirPath = resolve(process.cwd(), './config')

let configs = {}

try {
  configs = moduleLoader(dirPath)
} catch (e) {}

let server = configs['config.default'] || {}
if (configs[`config.${env}`]) {
  server = Object.assign(server, configs[`config.${env}`])
}

server.privateKey = `${+new Date()}_${parseInt(Math.random() * 10000)}`

let client

try {
  const rootPath = resolve(process.cwd(), './')
  const nextConfig = require(`${rootPath}/next.config.js`)

  client = nextConfig

  client.publicRuntimeConfig = Object.assign(server.public || {}, client.publicRuntimeConfig || {})
  client.serverRuntimeConfig = Object.assign(server, client.serverRuntimeConfig || {})

  server.port = server.port || 3000
} catch (e) {
  client = server.client || {}
  delete server.client
  client.publicRuntimeConfig = server.public
  client.serverRuntimeConfig = server
  client.distDir = '.build'
}

client = withSass(withCSS(client))

server = Object.assign(server, server.public)
delete server.public

module.exports = { server, client }

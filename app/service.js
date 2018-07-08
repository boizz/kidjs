'use strict'

const { resolve } = require('path')
const modulesLoader = require('./utils/modulesLoader')

const dirPath = resolve(process.cwd(), './app/service')

let service

try {
  service = modulesLoader(dirPath)
} catch (e) {
  service = {}
}

module.exports = service

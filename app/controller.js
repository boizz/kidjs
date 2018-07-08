'use strict'

const { resolve } = require('path')
const modulesLoader = require('./utils/modulesLoader')

const dirPath = resolve(process.cwd(), './app/controller')

let controller = {}

try {
  controller = modulesLoader(dirPath)
} catch (e) {}

module.exports = controller

'use strict'

const { resolve } = require('path')
const moduleLoader = require('./utils/modulesLoader')

const dirPath = resolve(process.cwd(), './app/controller')

module.exports = moduleLoader(dirPath)

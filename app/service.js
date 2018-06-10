'use strict'

const path = require('path')
const modulesLoader = require('./utils/modulesLoader')

const dirPath = path.resolve(__dirname, '../service')

let service

try {
  service = modulesLoader(dirPath)
} catch (e) {
  service = {}
}

module.exports = service

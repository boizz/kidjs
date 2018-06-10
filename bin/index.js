#!/usr/bin/env node
'use strict'

const dev = require('./dev')
const build = require('./build')

if (process.argv.includes('build')) {
  build()
} else {
  dev()
}

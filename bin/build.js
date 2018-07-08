'use strict'

module.exports = () => {
  const build = require('next/dist/build').default
  const { resolve } = require('path')

  const config = require('../app/config').client
  build(resolve(process.cwd(), './'), config)
}

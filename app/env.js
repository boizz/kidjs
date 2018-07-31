'use strict'

let env = 'local'
const ENV = process.env.KID_ENV || process.env.NODE_ENV

switch (ENV) {
  case undefined:
  case null:
  case '':
  case 'local':
    env = 'local'
    break
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
    env = ENV.toLowerCase()
}

module.exports = env

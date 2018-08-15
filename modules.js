'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

const _config = require('next/dist/lib/runtime-config')
_moduleExport('config', _config)

const _constants = require('next/dist/lib/constants')
_moduleExport('constants', _constants)

const _dynamic = require('next/dist/lib/dynamic')
_moduleExport('dynamic', _dynamic)

const _app = require('next/dist/lib/app')
_moduleExport('App', _app)

const _document = require('next/dist/server/document')
_moduleExport('Document', _document)

const _error = require('next/dist/lib/error')
_moduleExport('Error', _error)

const _head = require('next/dist/lib/head')
_moduleExport('Head', _head)

const _link = require('next/dist/lib/link')
_moduleExport('Link', _link)

const _router = require('next/dist/lib/router')
_moduleExport('Router', _router)

function _moduleExport (moduleName, value) {
  Object.defineProperty(exports, moduleName, {
    enumerable: true,
    get: function get () {
      return _interopRequireDefault(value)['default']
    }
  })
}

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { 'default': obj }
}

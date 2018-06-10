#!/usr/bin/env node
'use strict'

const build = require('next/dist/build').default
const { resolve } = require('path')

const config = require('../server/config')
build(resolve(process.cwd(), './'), config)
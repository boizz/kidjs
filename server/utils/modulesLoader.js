'use strict'

const fs = require('fs')

module.exports = (rootPath) => {
  const moduleList = {}

  const readAllControllers = (fileList, moduleList, path) => {
    for (let fileName of fileList) {
      const ext = /\.js$/
      if (ext.test(fileName)) {
        const moduleName = fileName.split(ext)[0]
        moduleList[moduleName] = require(`${path}/${fileName}`)
      } else {
        moduleList[fileName] = {}
        const subPath = `${path}/${fileName}`
        const fileList = fs.readdirSync(subPath)
        readAllControllers(fileList, moduleList[fileName], subPath)
      }
    }
  }

  const fileList = fs.readdirSync(rootPath)
  readAllControllers(fileList, moduleList, rootPath)

  return moduleList
}

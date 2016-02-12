const fs = require('fs')
const path = require('path')
const bowerFile = path.join(__dirname, '../bower.json')
const npmConfig = require(path.join(__dirname, '../package.json'))

const bowerConfig = Object.assign({}, require(bowerFile), {
  version: npmConfig.version
})

fs.writeFileSync(
  bowerFile,
  JSON.stringify(bowerConfig, null, 2) + "\n"
)

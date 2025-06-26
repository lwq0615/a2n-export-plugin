const fs = require('fs')
const path = require('path')

const template = fs.readFileSync(path.resolve(__dirname, './template.js'), 'utf-8')


module.exports = function createA2nExportPlugin(options) {
  const {baseUrl} = options
  return {
    name: 'api-transformer',
    enforce: 'pre', // 在其他插件之前执行
    // 转换处理
    transform(code, id) {
      const apiDir = path.resolve(process.cwd(), options.path).replaceAll("\\", '/')
      const filePath = id.replace(apiDir, '')
      // 只处理目标目录下的 ts/tsx 文件
      if (/\.(ts|tsx)$/.test(id) && id.startsWith(apiDir)) {
        return {
          code: template.replaceAll("#{baseUrl}", baseUrl).replaceAll("#{filePath}", filePath.slice(0, filePath.lastIndexOf('.'))),
          map: null // 如果需要 source map，这里可以提供
        }
      }
      // 不处理其他文件
      return null
    }
  }
}

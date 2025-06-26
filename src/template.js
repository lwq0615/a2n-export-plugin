import request from '#{request}'

export default function ApiExportProxy() {
  return new Proxy({}, {
    get(target, key) {
      return (...args) => {
        return request(`#{baseUrl}#{filePath}/${key}`, args).then(res => {
          return res.data
        })
      }
    },
    set() {
      return false
    }
  })
}

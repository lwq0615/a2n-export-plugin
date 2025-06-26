import axios from 'axios'

export default function ApiExportProxy() {
  return new Proxy({}, {
    get(target, key) {
      return (...args) => {
        return axios.post(`#{baseUrl}#{filePath}/${key}`, args).then(res => {
          return res.data
        })
      }
    },
    set() {
      return false
    }
  })
}

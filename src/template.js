import request from '#{request}';

let proxy = null;

function ApiExportProxy() {
  if (proxy) {
    return proxy;
  }
  proxy = new Proxy(
    {},
    {
      get(target, key) {
        return (...args) => {
          return request(`#{baseUrl}#{filePath}/${key}`, args).then((res) => {
            return res.data;
          });
        };
      },
      set() {
        return false;
      },
    }
  );
  return proxy;
}

ApiExportProxy.request = ApiExportProxy;

export default ApiExportProxy;

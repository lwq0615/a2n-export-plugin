<h1 align="center">a2n-export-plugin</h1>

<div align="center">

将ts或tsx的class导入转换为接口请求

[NPM][npm-url]&nbsp;&nbsp;&nbsp;&nbsp;[Github][github-url]

[npm-url]: https://www.npmjs.com/package/a2n-export-plugin
[github-url]: https://github.com/lwq0615/a2n-export-plugin
[a2n-url]: https://github.com/lwq0615/a2n
[api-export-url]: https://github.com/lwq0615/a2n?tab=readme-ov-file#ApiExport自动生成接口

</div>

## 📦 快速开始

### 插件配置

```ts
export type A2nExportPluginOption = {
  // 接口class所在文件夹
  path: string
  // 发起请求的url前缀
  baseUrl: string
}
```

### 在vite项目中使用

vite配置中引入插件
```ts
import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import createA2nExportPlugin from "a2n-export-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createA2nExportPlugin({
      path: './api/src',
      baseUrl: '/api-export'
    })
  ],
  resolve: {
    alias: {
      '@api': fileURLToPath(new URL('./api/src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api-export': {
        target: 'http://localhost:8080/', // 后台接口前缀
        changeOrigin: true, // 是否允许跨域
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/api-export/, ''),
      },
    },
  },
})
```

在根目录api文件夹下创建基于node的服务端程序（推荐使用孪生项目：[a2n][a2n-url]，关于ApiExport的能力请查看[a2n][api-export-url]文档），创建`src/user.ts`操作数据库
```ts
import { ApiExport } from "a2n";

@ApiExport
export default class User {
  async getName(id: number, group: number) {
    return userService.findUser(id, group).name
  }
}
```

使用
```ts
import UserControl from '@api/user'

const api = new UserControl()
api.getName(1, 2).then(res => {
  // 拿到服务端class函数的返回值
  console.log(res)
})
```

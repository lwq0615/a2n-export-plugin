import type {Plugin} from 'vite'

type A2nExportPlugin = (options: A2nExportPluginOption) => Plugin

export type A2nExportPluginOption = {
  // 接口class所在文件夹
  path: string
  // 发起请求的url前缀
  baseUrl: string
  // 请求函数文件路径
  request: string
}

export default A2nExportPlugin

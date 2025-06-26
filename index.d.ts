import type {Plugin} from 'vite'

type A2nExportPlugin = (options: A2nExportPluginOption) => Plugin

export type A2nExportPluginOption = {
  path: string
  baseUrl: string
}

export default A2nExportPlugin

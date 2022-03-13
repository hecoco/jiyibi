/* eslint @typescript-eslint/no-var-requires: "off" */
import { resolve } from 'path'

export const lintOnSave = false
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function chainWebpack(config) {
  const dir = resolve(__dirname, 'src/assets/icons')

  config.module
    .rule('svg-sprite')
    .test(/\.svg$/)
    .include.add(dir).end() // 包含 icons 目录
    .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()
  config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
  config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
}

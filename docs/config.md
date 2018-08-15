# 配置

框架提供了强大且可扩展的配置功能，可以区分服务端与客户端应用配置，且可以根据环境维护不同的配置。合并后的配置可直接从 app.config 获取。

## 多环境配置

框架支持根据环境来加载配置，定义多个环境的配置文件：

```
config
├─ config.default.js
├─ config.dev.js
├─ config.test.js
├─ config.prod.js
├─ config.unittest.js
└─ config.local.js
```

对应关系见 [运行环境](framework?id=运行环境)；配置优先级为 `config.${env}` > `config.default` ；

## 分端配置

考虑安全，客户端不能共享服务端的配置；当页面在客户端中渲染时，仅可以获取 `public` 字段下的配置；为了两端统一获取配置字段，配置被加载时，  `public` 下的配置会被合并到根节点。

### 在页面中获取配置

``` js
// pages/index.js
import { config } from 'kidjs'
const { getConfig } = config

/**
 * 在页面中会根据页面渲染的环境读取到不同的配置
 * serverRuntimeConfig: 服务端配置
 * publicRuntimeConfig：客户端配置
 */
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

console.log(serverRuntimeConfig.mySecret) // 仅在服务端可以获取
console.log(publicRuntimeConfig.staticFolder) // 在客户端和服务端均可获取

export default () => <div>
  <img src={`${publicRuntimeConfig.staticFolder}/logo.png`} alt='logo' />
</div>
```

## 页面配置

页面配置用于自定义页面缓存、CDN 等，统一放置在 `page` 字段下；

### 自定义页面缓存

``` js
module.exports = {
  page: {
    onDemandEntries: {
      // 控制页面在内存 `buffer` 中缓存的时间，单位是 ms
      maxInactiveAge: 25 * 1000,
      // 同时保留的缓存页面数量
      pagesBufferLength: 2,
    }
  }
}
```

### 自定义 CDN
``` js
module.exports = {
  page: {
    assetPrefix: 'https://cdn.mydomain.com'
  }
}
```

Kid.js 会自动使用配置上的 CDN 域加载脚本；该配置不会被应用到 `static` 目录下的文件，如果希望让静态文件也能用上 CDN，需要手动添加 CDN 域前缀；

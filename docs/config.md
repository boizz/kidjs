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

### 在服务端获取配置

``` js
// app/controller/index.js
module.exports = async (ctx) => {
  const { port } = ctx.config
  ctx.body = port
}
```

## 服务配置

服务配置用于管理页面缓存、自定义端口等；

### 自定义端口

``` js
module.exports = {
  port: 7707
}
```

### 自定义缓存

Kid.js 支持页面级缓存，在服务器中使用 [node-lru-cache](https://github.com/isaacs/node-lru-cache) 管理，默认缓存 100 个页面，缓存时间 1 分钟；

你也可以在配置文件中自定义缓存，参数继承 [node-lru-cache](https://github.com/isaacs/node-lru-cache) Options。

``` js
module.exports = {
  cache: {
    max: 100,
    maxAge: 1000 * 15
  }
}
```

页面缓存使用 `LRU-Cache` 管理

## 页面配置

页面配置用于自定义页面缓存、CDN 等，统一放置在 `page` 字段下；

### 自定义 CDN
``` js
module.exports = {
  page: {
    assetPrefix: 'https://cdn.mydomain.com'
  }
}
```

Kid.js 会自动使用配置上的 CDN 域加载脚本；该配置不会被应用到 `static` 目录下的文件，如果希望让静态文件也能用上 CDN，需要手动添加 CDN 域前缀；

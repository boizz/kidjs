# 概述

简单好用的 [Next.js](https://nextjs.org/) 自定义服务器。

## 为什么使用服务端渲染？

- 能够为客户提供更理想的性能；
- 提供更为一致的 SEO 表现；

## 为什么使用 Kid.js

Kid.js 为 Next.js 提供更加人性化的后端服务能力，支持自定义路由和接口、环境配置等功能。同时不破坏 Next.js 原有的特性及开发体验。

Kid.js 作为 Next.js 的附加服务，与 Next.js 本身不存在耦合，可随时被添加至一个现有的 Next.js 应用中，并可以在任何时候从你的应用中移除。

在技术选型上使用性能优异的 Koa 作为底层。

在安全和稳定性方面，Kid.js 内置常见攻击的防御机制。

Kid.js 关注服务端渲染的性能，默认开启页面级缓存。

### 特性

- 基于 [Koa.js](https://koajs.com/) 开发，性能优异；
- 页面级缓存；
- 配置化开发和部署；

## 快速入门

### 启动一个新的项目

我们只需要几个步骤，就可以让你的服务运行起来：

``` bash
$ npm i --save kidjs next react react-dom
```

在你的 package.json 中添加运行脚本：

``` json
{
  "scripts": {
    "dev": "kid",
    "build": "kid build",
    "start": "KID_ENV=prod kid"
  }
}
```

创建首页（`.pages/index.js`）：

``` js
export default () => <div>Welcome to kid.js!</div>
```

启动项目：

``` bash
$ npm run dev
$ open 127.0.0.1:7214
```

### 在 Next.js 中使用 Kid.js

``` bash
$ npm i --save kidjs
```

在配置中声明自定义端口（可选）：

``` js
// config/config.default.js

module.exports = {
  port: 7707
}
```

更改 package.json 中的运行脚本：

``` json
{
  "scripts": {
    "dev": "kid",
    "build": "kid build",
    "start": "KID_ENV=prod kid"
  }
}
```

启动项目：

``` bash
$ npm run dev
$ open 127.0.0.1:7707
```

## LICENSE

Kid.js 采用 [MIT](https://opensource.org/licenses/MIT) 开源许可。

> Kid.js 关注企业和项目的版权风险，所有依赖的框架和库均采用 MIT 许可，并对依赖进行扫描。



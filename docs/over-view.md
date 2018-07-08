# 概述

Kid.js 是一个轻量的服务端渲染框架，注重用户体验、高效构建。

## 为什么使用服务端渲染？

- 能够为客户提供更理想的性能；
- 提供更为一致的 SEO 表现；

## 为什么使用 Kid.js

Kid.js 关注用户体验和性能，在技术选型上使用性能优异的框架作为底层。

对于开发成本和开发体验考虑，Kid.js 上手成本低，不需要配置，几行代码就可以运行一个 SSR 服务，同时遵循高度组件化开发，高度可拓展机制，非常适合快速构建及形态丰富的业务。

在安全和稳定性方面，Kid.js 内置常见攻击的防御机制。

### 特性

- 基于 [Next.js](https://nextjs.org/) 和 [Koa.js](https://koajs.com/) 开发，性能优异；
- 高度组件化；
- 配置化开发和部署；

## 快速入门

我们只需要几个步骤，就可以让你的服务运行起来：

``` bash
$ npm i --save kidjs react react-dom
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

## LICENSE

KIDJS 采用 [MIT](https://opensource.org/licenses/MIT) 开源许可。

> KIDJS 关注企业和项目的版权风险，所有依赖的框架和库均采用 MIT 许可，并对依赖进行扫描。



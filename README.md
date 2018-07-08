# 开始使用

## 安装

``` bash
$ npm i --save kidjs react react-dom
```

> Kid.js 支持 [React 16](https://reactjs.org/blog/2017/09/26/react-v16.0.html) 及以上版本；   
> 支持在 [Node v7.6](https://nodejs.org/en/blog/release/v6.14.2/) 及以上版本中运行。

## 创建页面

框架约定页面文件存放在 `pages` 目录中；通常情况下，框架会根据页面自动生成对应的路由；

页面可以是无状态组件 （在 [快速入门](https://kidjs.org/#/?id=%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8) 中稍有提到），也可以是 React 组件；

多数时候我们的页面需要根据数据来渲染，于是在 Kid.js 中的 React Component 会多一个用于获取初始化数据的静态生命周期函数：`getInitialProps`，用法如下：

``` js
import React, { Component } from 'react'
import r2 from 'r2'

class IndexPage extends Component {
  static async getInitialProps ({ asPath }) {
    const res = r2('http://api.example.com')
    return res
  }

  render () {
    const { res } = this.props
    return (
      <h1>{res.title}</h1>
    )
  }
}

export default IndexPage
```

### getInitialProps

`getInitialProps` 方法只在顶层页面组件中使用。当初始化页面的时候，`getInitialProps` 只会在服务器端执行，而当通过 [Link](https://kidjs.org/#/page?id=%E8%B7%AF%E7%94%B1) 组件或者使用 [命令路由](https://kidjs.org/#/page?id=%E8%B7%AF%E7%94%B1) 来将页面导航到另外一个路由的时候，此方法就只会在客户端执行。

`getInitialProps` 接收的上下文对象包含以下属性：

- `pathname` - URL 的 path 部分；
- `query` - URL 的 query string 部分，并且其已经被解析成了一个对象；
- `asPath` - 在浏览器上展示的实际路径（包括 query 字符串）；
- `req` - HTTP request 对象（只存在于服务器端）；
- `res` - HTTP response 对象（只存在于服务器端）；
- `jsonPageRes` - 获取的响应数据对象 Fetch Response（只存在于客户端）；
- `err` - 渲染时发生错误抛出的错误对象；

## 使用静态文件

在你的项目的根目录新建 `static` 目录，然后你就可以在你的代码通过 `/static/` 开头的路径来引用此目录下的文件：

``` js
export default () => <img src="/static/my-image.png" />
```

## 样式

### 嵌入式样式 Built-in-CSS

Kid.js 使用 [style-jsx](https://github.com/zeit/styled-jsx) 来支持局部独立作用域的 CSS (scope CSS)，目的是提供一种类似于 Web 组件的 shadow CSS，不过，shadow CSS 并不支持服务器端渲染，而 scope CSS 是支持的。

``` js
export default () =>
  <div>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        background: black;
      }
    `}</style>
  </div>
```

### SCSS/LESS/CSS

同时，Kid.js 也支持 SCSS、LESS 和 CSS。

``` js
import '../anydir/example.scss'
export default () => <p className='say-hello'>Hello Kid.js!</p>
```
# 页面

框架约定页面文件存放在 `pages` 目录中；通常情况下，框架会根据页面自动生成对应的路由；

页面可以是无状态组件 ，也可以是 React 组件。

``` js
// pages/page1.js
module.export => <div>Hello Kid.js!</div>

// pages/page2.js
import React, { Component } from 'react'

class componentName extends Component {
  render () {
    return (
      <div>
        Hello Kid.js!
      </div>
    )
  }
}

export default componentName
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

## 使用静态文件

在你的项目的根目录新建 `static` 目录，然后你就可以在你的代码通过 `/static/` 开头的路径来引用此目录下的文件：

``` js
export default () => <img src="/static/my-image.png" />
```

## 自定义 Head 头部元素

框架集成了一个用于将元素追加到 `<head>` 中的组件。

``` js
import { Head } from 'kidjs'

export default () =>
  <div>
    <Head>
      <title>My page title</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <p>Hello world!</p>
  </div>
```

为了避免 `<head>` 下面的标签重复，可以为标签添加 `key` 属性：

``` js
import { Head } from 'kidjs'
export default () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <Head>
      <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
    </Head>
    <p>Hello world!</p>
  </div>
)
```

在上面的例子中，只渲染第二个 `<meta name="viewport" />` 标签。

**注意**：当组件卸载的时候，组件内定义的 `<head>` 将会被清空，所以请确保每个页面都在其各自的 `<head>` 内声明了其所有需要的内容，而不是假定这些东西已经在其他页面中添加过了。

## 获取数据

在 Kid.js 中的 React Component 会多一个用于获取初始化数据的静态生命周期函数：`getInitialProps`，用法如下：

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

`getInitialProps` 方法只在顶层页面组件中使用。当初始化页面的时候，`getInitialProps` 只会在服务器端执行，而当通过 [Link](/components?id=Link) 组件或者使用 [命令路由](/components?id=Router) 来将页面导航到另外一个路由的时候，此方法就只会在客户端执行。

`getInitialProps` 接收的上下文对象包含以下属性：

- `pathname` - URL 的 path 部分；
- `query` - URL 的 query string 部分，并且其已经被解析成了一个对象；
- `asPath` - 在浏览器上展示的实际路径（包括 query 字符串）；
- `req` - HTTP request 对象（只存在于服务器端）；
- `res` - HTTP response 对象（只存在于服务器端）；
- `jsonPageRes` - 获取的响应数据对象 Fetch Response（只存在于客户端）；
- `err` - 渲染时发生错误抛出的错误对象；

你也可以为无状态组件添加 `getInitialProps` 方法：

``` js
const Page = ({ res }) =>
  <h1>{res.title}</h1>

Page.getInitialProps = async ({ req }) => {
  const res = r2('http://api.example.com')
  return { res }
}

export default Page
```

## 组件生命周期

![Kid component lifecycle](/static/kid-component-lifecycle.png)

## 路由

客户端可以使用 link 组件来实现页面之间的切换功能：

``` js
// pages/index.js
import { Link } from 'kidjs'

export default () =>
  <div>
    Click{' '}
    <Link href="/about">
      <a>here</a>
    </Link>{' '}
    to read more
  </div>

// pages/about.js
export default () => <p>Welcome to About!</p>
```

**注意**：可以使用 `<Link prefetch>` 让页面在后台同时获取和预加载，以获得最佳的页面加载性能；

客户端的路由行为与浏览器完全相同：

1. 获取组件；
2. 如果定义了 `getInitialProps` 则获取数据，如果抛出异常，则渲染 `_error.js`；
3. 完成了前面两步后，则执行 `pushState` 并呈现新组件；

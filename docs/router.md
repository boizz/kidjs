# Router

Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系， 框架约定了 `app/router.js` 文件用于统一所有路由规则。

通过统一的配置，我们可以避免路由规则逻辑散落在多个地方，从而出现未知的冲突，集中在一起我们可以更方便的来查看全局的路由规则。

## 如何定义 Router

`app/router.js` 里面定义 URL 路由规则：

``` js
module.exports = app => {
  const { router, controller, render } = app

  // 页面路由
  render('/customPost', '/post')

  // 接口路由
  router.get('/user/:id', controller.user.info)
}
```

在 `pages` 目录里面创建 `post.js` 文件实现渲染：

``` js
// pages/post.js
export default () => <p>Hello post</p>
```

`app/controller` 目录下面实现 Controller：

``` js
// app/controller/user.js
module.exports = {
  async info() {
    const { ctx } = this
    ctx.body = {
      name: `hello ${ctx.params.id}`
    }
  }
}
```

当用户执行 GET /customPost 时会返回 `post.js` 输出的页面；当用户执行 GET /user/123 时 `user.js` 里的 info 方法就会被执行。

## Router 详细定义说明

下面是路由的完整定义：

``` js
render('path-match', 'page-name')
router.verb('path-match', app.controller.action)
```

路由完整定义主要包括 5 个主要部分:

- render - 页面渲染，支持传入两个参数 `path-match`、`page-name`；
- path-match - 路由 URL 路径；
- page-name - 页面名称，包含路径，不需要 `.js` 后缀；
- verb - 用户触发动作，支持 get，post 等所有 HTTP 方法：
  - router.head - HEAD
  - router.options - OPTIONS
  - router.get - GET
  - router.put - PUT
  - router.post - POST
  - router.patch - PATCH
  - router.del - DELETE（由于 delete 是一个保留字，所以提供了一个 DELETE 方法的别名）；
  - router.redirect - 可以对 URL 进行重定向处理，比如我们最经常使用的可以把用户访问的根目录路由到某个主页；

## 注意事项

- 由于框架会自动为每个页面创建对应的路由，上方的示例中，用户执行 GET /post 同样会返回 `post.js` 输出的页面；如果不希望框架自动为页面创建路由，我们可以在配置中关闭自动页面路由：

  ``` js
  // config/config.default.js
  module.exports = {
    page: {
      useFileSystemPublicRoutes: false
    }
  }
  ```
  详见 [配置](config)；
- Controller 必须定义在 `app/controller` 目录中；
- 一个文件里面也可以包含多个 Controller 定义，在定义路由的时候，可以通过 `${fileName}.${functionName}` 的方式指定对应的 Controller；
- Controller 支持子目录，在定义路由的时候，可以通过 `${directoryName}.${fileName}.${functionName}` 的方式制定对应的 Controller；

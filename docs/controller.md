# Controller

## 什么是 Controller

我们通过 Router 将用户的请求基于 method 和 URL 分发到了对应的 Controller 上，那 Controller 负责做什么？

简单的说 Controller 负责**解析用户的输入，处理后返回相应的结果**，例如：

- 在 [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) 接口中，Controller 接受用户的参数，从数据库中查找内容返回给用户或者将用户的请求更新到数据库中；
- 在 HTML 页面请求中，Controller 根据用户访问不同的 URL，渲染不同的模板得到 HTML 返回给用户；
- 在代理服务器中，Controller 将用户的请求转发到其他服务器上，并将其他服务器的处理结果返回给用户；

框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

1. 获取用户通过 HTTP 传递过来的请求参数；
2. 校验、组装参数；
3. 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求；
4. 通过 HTTP 将结果响应给用户；

## 如何编写 Controller

所有的 Controller 文件都必须放在 `app/controller` 目录下，可以支持多级目录，访问的时候可以通过目录名级联访问。Controller 支持多种形式进行编写，可以根据不同的项目场景和开发习惯来选择。

每一个 Controller 都是一个 async function，它的入参为请求的上下文 [Context](https://koajs.com/#context) 对象的实例，通过它我们可以拿到框架封装好的各种便捷属性和方法。

例如我们写一个对应到 `POST /api/posts` 接口的 Controller，我们会在 `app/controller` 目录下创建一个 post.js 文件：

``` js
// app/controller/post.js
exports.create = async ctx => {
  const createRule = {
    title: { type: 'string' },
    content: { type: 'string' }
  }
  // 校验参数
  ctx.validate(createRule)
  // 组装参数
  const author = ctx.session.userId
  const req = Object.assign(ctx.request.body, { author })
  // 调用 service 进行业务处理
  const res = await ctx.service.post.create(req)
  // 设置响应内容和响应状态码
  ctx.body = { id: res.id }
  ctx.status = 201
}
```


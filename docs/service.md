# Service

简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

- 保持 Controller 中的逻辑更加简洁；
- 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用；
- 将逻辑和展现分离，更容易编写单元测试；

## 使用场景

- 复杂数据的处理，比如要展现的信息需要从数据库获取，还要经过一定的规则计算，才能返回用户显示。或者计算完成后，更新到数据库；
- 第三方服务的调用，比如 GitHub 信息获取等；

## 定义 Service

``` js
// app/service/user.js
module.exports = {
  async find(ctx, uid) {
    const user = await ctx.db.query('select * from user where uid = ?', uid)
    return user
  }
}
```

## 使用 Service

下面就通过一个完整的例子，看看怎么使用 Service。

``` js
// app/router.js
module.exports = app => {
  app.router.get('/user/:id', app.controller.user.info)
}

// app/controller/user.js
module.exports = {
  async info(ctx) {
    const userId = ctx.params.id
    const userInfo = await ctx.service.user.find(userId)
    ctx.body = userInfo
  }
}

// app/service/user.js
module.exports = {
  async find(ctx, uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await ctx.db.query('select * from user where uid = ?', uid)

    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    const picture = await ctx.service.user.getPicture(uid)

    return {
      name: user.user_name,
      age: user.age,
      picture
    }
  }

  async getPicture(ctx, uid) {
    const result = await ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' })
    return result.data
  }
}
module.exports = UserService

// curl http://127.0.0.1:7214/user/1234
```

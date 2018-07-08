# 架构

## 目录结构

为了更好地管理项目，Kid.js 对目录结构做了约定。我们来简单了解下目录约定规范：

```
kid-project
├── package.json
├── app (可选)
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service
│   |   └── user.js
│   ├── middleware
│   |   └── response_time.js
├── config (可选)
|   ├── config.default.js
│   ├── config.dev.js
│   ├── config.prod.js
|   ├── config.test.js
|   ├── config.local.js
|   └── config.unittest.js
├── pages
|   └── index.js
├── static (可选)
|   └── my-image.png
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

如上，由框架约定的目录：

- `app/router.js` 用于配置 URL 路由规则，具体参见 [Router](router)；
- `app/controller/**` 用于解析用户的输入，处理后返回相应的结果，具体参见 [Controller](controller)；
- `app/service/**` 用于编写业务逻辑层，可选，建议使用，具体参见 [Service](server)；
- `app/middleware/**` 用于编写中间件，可选，具体参见 [Middleware](middleware)；
- `config/config.{env}.js` 用于编写配置文件，具体参见 [配置](config)；
- `pages/**` 用于页面的渲染，具体参见 [页面](page)；
- `static/**` 用于放置静态资源，可选，参见 [使用静态文件](quick-start?id=使用静态文件)；
- `test/**` 用于单元测试，具体参见 [单元测试](unittest)；

## 运行环境
| KID_ENV | 说明 |
| :-: | :-: |
| local | 本地开发环境 |
| unittest | 单元测试 |
| dev | 线上开发环境 |
| test | 测试环境 |
| prod | 生产环境 |

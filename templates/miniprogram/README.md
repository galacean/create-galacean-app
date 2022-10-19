## Oasis 0.8 适配 Demo

## npm
本 Demo 所有的依赖库都可通过 npm 加载获取。

```sh
npm install
```

安装完所有的依赖后，运行以下命令即可在小程序 IDE 中预览

```sh
npm run dev
```

## 额外

项目通过 Vite 构建, 渲染部分使用了 Oasis 引擎，这里简单介绍一下项目的基本结构。

### 小程序的项目目录

小程序的项目目录是由 `mini.project.json` 内的  `miniprogramRoot` 指定的，在小程序构建的时候，`IDE` 会以此为根目录来寻找 `app.json`。

### 入口文件

`app.json` 中的 `pages` 字段指定了项目的入口，在本项目中，`mini/pages/index/index.js` 就是我们的逻辑入口了，需要注意的是，我们没有必要的情况下不应该去改动 `mini/pages/index/index.js` ，所有的业务逻辑和渲染逻辑都应该在 `src` 目录中实现，`mini/pages/index/index.js` 只是引入了业务和渲染逻辑构建出来的产物包而已。

### 业务逻辑

在运行 `npm run dev` 时，Vite 会依照 `vite.config.js` 内设定的逻辑来构建项目产物，可以看到构建的入口是 `./src/main.ts` , 这也是我们业务与渲染逻辑的入口。

构建后的产物会放置在 `mini/dist` 目录下，等待被 `mini/pages/index/index.js` 引用。

### 常见问题

- Vite 构建依赖 nodejs 的版本，所以在构建失败的时候，可以检查一下 Vite 与 nodejs 的版本号。
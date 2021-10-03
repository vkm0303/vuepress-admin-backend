# vuepress 博客管理前端

## 介绍

### 前言

目前功能还是比较粗糙的，然后代码重复度也挺高的，等找完实习再考虑完善吧！

### 功能

-   [x] 登录
-   [x] 新增文章
-   [x] 修改文章
-   [x] 查看文章
-   [x] 上传图片

### 待完成

-   [ ] 评论管理
-   [ ] 安全问题

## 界面

### 登录

![image](./shot/login.png)

### 首页

![image](./shot/dashboard.png)

### markdown 编辑器

![image](./shot/markdown.png)

## 使用

### 拉取代码

```bash
git clone https://github.com/vkm0303/vuepress-admin-backend.git
```

### 安装依赖

```bash
npm i
```

### 配置

前端仓库：[vuepress-admin-backend](https://github.com/vkm0303/vuepress-admin-frontend.git)

#### app.js

```javascript
//配置端口
var port = 3100;
app.listen(port);
```

#### config.json

```
blogPath: 博客的工程地址
articlePath: 博客文章存放的根目录
imagePath: 博客图片存放的根目录
articleFormat: 文章格式
scripts: exec需要使用的脚本，这里`build`用于重新打包vuepress的内容
admin: 配置登录账号
```

```json
//config.json
{
	"blogPath": "D:/projects/blog",
	"articlePath": "D:/projects/blog/docs/articles",
	"imagePath": "D:/projects/blog/docs/articles",
	"articleFormat": ".md",
	"scripts": {
		"build": "cd /projects/blog & yarn docs:build"
	},
	"admin": {
		"username": "admin",
		"password": "admin"
	}
}
```

#### vuepress 的博客文件结构

目前是以这种结构进行适配的，若不按照这种文件结构，则需要改一下`/utils/file.js`里面的代码

> docs

> > articles

> > > date(以日期命名的目录)

> > > > \*.md

> > > > images

### 运行

```bash
npm run serve
```

# TouchMo

## 🚀 项目介绍

**TouchMo**一个支持实时电影推送和进行视频在线解析的SPA应用。

- **前端**：Vue3、Sass、Vue-Router、pinia、gsap、Element-Plus、Vite
- **后端**：java、redis等（另一位伙伴负责）
- **项目预览**：[TouchMo 预览地址](https://movie-website-wheat-gamma.vercel.app/)（部署于Vercel，需要梯子，暂时使用本地服务器提供后端服务）

## 🔆项目预览

**首页** （canvas绘制动态流星背景）
![enter image description here](https://i.ibb.co/6RZR0R3q/2025-03-07-021038.png)

**登录**（登录注册）
![enter image description here](https://i.ibb.co/NdZyNGZj/2025-03-07-020350.png)

**编辑资料**（支持拖拽上传图片、在线裁剪图片、在线预览头像）
![enter image description here](https://i.ibb.co/WvNnrgGy/2025-03-07-015005.png)

**影视筛选**
![enter image description here](https://i.ibb.co/d4GsbNS8/2025-03-07-021118.png)

**搜索电影**（搜索内容高亮提示）
![enter image description here](https://i.ibb.co/1GgppYCx/2025-03-07-021200.png)
![enter image description here](https://i.ibb.co/qLHvF8Jc/2025-03-07-021212.png)

**电影详情页面**（集收藏、评分、资源跳转、人员详情页跳转、评论于一页）
![enter image description here](https://i.ibb.co/hRnYLXD8/2025-03-07-021222.png)
![enter image description here](https://i.ibb.co/7JRn3Zpc/2025-03-07-021232.png)
![enter image description here](https://i.ibb.co/JWs485JR/2025-03-07-021258.png)

**收藏夹查看**
![enter image description here](https://i.ibb.co/cXcSH2SN/2025-03-07-022659.png)
![enter image description here](https://i.ibb.co/HD9sCmZq/2025-03-07-022708.png)

**即时消息**
![enter image description here](https://i.ibb.co/FkPpj2bF/2025-03-07-021324.png)
![enter image description here](https://i.ibb.co/HDy6FpJX/2025-03-07-021332.png)

**影视剧播放页**（切换线路和集数）
![enter image description here](https://i.ibb.co/3bY9zPZ/2025-03-07-021352.png)

## 模块开发文档（方便后续维护）

## 组件封装

### 分页器组件

- 通用组件
- 核心功能：显示页码、总页数、上一页跳转、下一页跳转、动态页码范围
- 可配置性：是否显示总页数、自定义每页条数、分页按钮数量、样式布局
- 采用v-model绑定子组件props.currentPage属性

## 消息模块

- 消息栏状态 已读、未读（默认）、升序、降序（默认）
- 消息图标状态 红点（未读列表不为空） 无红点
- 初始图标：默认参数拉取消息栏，不为空添加红点、建立websocket连接
- 【图标操作】：
- 点击图标：弹出消息框（改变isShowMessageBox）
- 再次点击： 隐藏消息框（改变isShowMessageBox）
- 再次点击：保留上次消息框状态
- 【消息框操作】：
- 点击分页器（修改本地参数page） 重新拉取 当前列表
- 点击消息 情况一：本地参数是否批量选择（isBatchSelect）为false直接跳转到该评论电影页面，并把该消息标记为已读；情况二：isBatchSelect为true点击直接将消息id收集到本地数组，并增加选中样式（动态类根据当前数组是否包含该消息id）
- 点击更多按钮（改变isActionBoxVisible） 弹出操作框、再次点击隐藏操作框
- 操作框 点击升序或降序或已读未读文字按钮（修改本地参数status、sortOrder） 重新拉取当前列表
- 操作框 点击批量选择按钮（改变isBatchSelect值），显示批量已读和删除两个按钮，点击按钮发送请求成功了直接再次拉取第一页（修改本地page参数再次发送请求）并退出选择状态（改变isBatchSelect的值）点击取消批量选择按钮（改变isBatchSelect的值）

## 评分模块

isScore（boolean）：是否评过分，拉取电影详情信息时根据userScore字段是否为null判断以及在初次评分后成功后进行修改
rateVal（number）：当前评分器绑定的评分数据

- 【图标操作】：
- 首次点击评分后发送评分post请求（根据v-model的值 rateVal发送post请求）
- 再次点击评分后发送修改评分put请求（根据变量 isScore 来判断是否发送的put请求）

## 推送模块

1. 网页加载后 显示 10项个性化推荐内容 和 10项 热门内容
2. 点击跳转到指定电影详情页面
3. 电影容器组件

## 电影视频播放模块

- 【电影详情页操作】：点击获取资源后根据电影id路由跳转到电影播放页面
- 【电影播放页面操作】：
- 点击不同线路按钮切换本地参数（改变currentLine的值，默认为第一个线路）
- 点击不同集数发送请求获取视频路径并显示在播放器上（改变videoUrl参数）
- 点击视频可以进行播放

## 下拉框组件实现

- 互斥逻辑，只有一个下拉框可以被打开（使用依赖注入进行父子组件通信）

## 收藏夹模块

- 【操作用户收藏夹页面】
- 进入后进行用户收藏夹列表的拉取（使用userStore里定义的的方法，并将收藏夹列表存储在userInfo中）
- 展示的收藏夹列表来自于userStore里的UserInfo
- 通过userStore里暴露的获取收藏夹的方法（page、sortOrder参数） 获取用户不同的收藏夹资料
- 默认降序展示第一页收藏夹（组件渲染时使用默认参数拉取）
- 点击不同页数 修改本地参数 进行收藏列表获取（获取后改变userStore里的userInfo里的收藏列表引起视图更新）
- 点击新建收藏夹 弹出新建收藏夹框（ModifyFavoritesCard）可以通过表单进行收藏夹创建请求
- 点击收藏夹 获取该收藏夹下的电影列表，并修改参数进行显示电影列表界面
-
-

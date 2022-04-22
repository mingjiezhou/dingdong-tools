### node js

-- 更新

[四月之声](./src/voice-of-shanhai/四月之声in%20Shanghai.mp4)

### 介绍
叮咚买菜 可派送时间 监听 工具🔧

[使用文档](https://github.com/mingjiezhou/notes/issues/10)

当有 派送时间段时，通知消息到手机（只支持 ios）

### 注意点

1、通过抓包获取叮咚的 api 后，将curl 转化为 node request 形式的接口后，header 和 form 里的参数需要根据自己的app 里的进行修改

2、barkId 要使用自己的，否则接受不到推送消息，bark 应用请后台常驻

<img src="https://user-images.githubusercontent.com/37775265/162608928-8c64c606-03ff-4710-90f7-c61eea506a82.jpg" width=400/>

-- 更新

3、main.js 只检查 运力，通知手机

4、main-card.js 检查运力 和 购物车库存，当两者都满足时，才通知
# FridgeNote-WX-miniprogram 冰箱笔记-微信小程序

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

冰箱笔记-微信小程序

![小程序码](https://images.gitee.com/uploads/images/2020/0716/163547_83aedf54_5720879.png)

微信搜索小程序 冰箱笔记

用于记录放入冰箱物品的保质期以及数量，防止遗忘导致食物浪费

## 内容列表

- [背景](#背景)
- [安装](#安装)
- [项目目录](#项目目录)
- [使用许可](#使用许可)

## 背景

经常清理冰箱时发现有些水果或者食物因为忘记导致无法食用造成浪费，所以开发一个功能简单的小程序进行记录

## 安装

这个项目可以直接使用微信开发者工具打开 

## 项目目录

```sh
├── components                  // 组件
│   ├── addfridge               // 添加冰箱组件
│   ├── addgoods                // 添加物品组件
│   ├── delfridge               // 删除冰箱组件
│   ├── fridgeList              // 冰箱列表组件
|   ├── goodsInfo               // 物品组件
├── custom-tab-bar              // 自定义tabbar
├── miniprogram_npm             
│   ├── @vant                   // vant Weapp组件
├── pages                       // 小程序页面
|   ├── fridgeInfo              // 冰箱页面
|   ├── personal                // 个人页面
├── utils                       // 工具类
|   ├── api.js                  // 封装wx.request
|   ├── util.js                 // 通用工具类
├── app.js                      // 小程序逻辑
├── app.json                    // 公共配置
├── app.wxss                    // 公共样式表
├── config.js                   // 自定义配置
```

## 使用许可

[MIT](LICENSE) © Richard Littauer

## 更新日志  

V1.0.0 版本，2022/7/15  

初始版本

## HTML
- [1. HTML5 的语义化](#1-html5-的语义化)
- [2. html5 的新特性](#2-html5-的新特性)   
- [3. Viewport](#3-viewport)
### 1. HTML5 的语义化

主要目的 : 简单地说，就是用正确的标签做正确的事情

语义化的意义 : 
- 让页面的内容结构化
- 利于浏览器解析和SEO（搜索引擎优化）
- 提高代码的可维护性和可重用性

例如用header nav footer 这类标签替代传统的 div + css 布局

### 2. html5 的新特性

- 加入了nav, header, footer等语义化标签
- DOCTYPE声明 : 就是document type, 声明用的 XHTML 和 HTML 是什么版本，使浏览器按照对应的方式渲染，不然不同浏览器下显示出来的页面可能会有不同
- 加入了svg, canvas 图形标签: svg 基于XML, 适用于描述XML中的2D图形的语言，可以为每个元素添加JavaScript事件处理程序；Canvas随时随地绘制2D图形(使用JavaScript); canvas一般用于网页游戏，svg一般用于地图
- 加入了video, audio等多媒体标签
- 移除了center, big等元素，提倡用css实现这些功能

### 3. Viewport

Viewport 是用户网页的可视区域

手机浏览器是把页面放在一个虚拟的"窗口"（viewport）中，通常这个虚拟的"窗口"（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分

常见的viewport优化 :
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- width: 控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）
- height: width 相对应，指定高度
- 初始缩放比例，也即是当页面第一次加载的时候缩放比例
- maximum-scale：允许用户缩放到的最大比例
- minimum-scale：允许用户缩放到的最小比例
- user-scalable：用户是否可以手动缩放

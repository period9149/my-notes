## BOM
<!-- TOC -->    
- [1. 什么是BOM](#1-什么是bom)   
- [2. BOM 与 DOM 的关系](#2-bom-与-dom-的关系)    
- [3. BOM 对象包含哪些内容](#3-bom-对象包含哪些内容)   
- [4. Window 对象](#4-window-对象)        
- [5. Navigator 对象](#5-navigator-对象)           
- [6. History 对象](#6-history-对象)              
- [7. Location 对象](#7-location-对象)           
- [8. Screen 对象](#8-screen-对象)       
<!-- /TOC -->

### 1. 什么是BOM
BOM 是 browser object model 的缩写， 简称浏览器对象模型。 主要处理浏览器窗口和框架， 描述了与浏览器进行交互的方法和接口， 可以对浏览器窗口进行访问和操作， 譬如可以弹出 新的窗口， 回退历史记录， 获取 url ……

### 2. BOM 与 DOM 的关系
- JavaScript通过操作 BOM 对象来访问、控制、修改浏览器
- BOM的 Window 包含 document，通过 window 对象 document 属性就可以访问、 检索、 修改文档内容与结构
- document 对象是 DOM 模型的根节点

### 3. BOM 对象包含哪些内容
- Window :  JavaScript 层级中的顶层对象， 表示浏览器窗口
- Navigator : 包含客户端浏览器的信息
- History : 包含浏览器窗口访问过的 URL
- Location : 包含当前 URL 的信息
- Screen :  包含客户端显示屏的信息

### 4. Window 对象
Window 对象表示一个浏览器窗口或一个框架。 在客户端 JavaScript 中， Window 对象是全局对象，所有的表达式都在当前的环境中计算。 例如，document， 相当于 window.document

#### 常用属性
- closed : 检查窗口是否已经被关闭
- name : 窗口名称
- parent : 父窗口

#### 常用方法
- alert() : 显示带有一段消息和一个确认按钮的警告框
- confirm() : 显示带有一段消息以及确认按钮和取消按钮的对话框
- moveTo() : 把窗口的左上角移动到一个指定的坐标
- setInterval() : 按照指定的周期（以毫秒计）来调用函数或计算表达式
- clearInterval(): 取消由 setInterval() 设置的 timeout
- setTimeout() : 在指定的毫秒数后调用函数或计算表达式
- clearTimeout() : 取消由 setTimeout() 方法设置的 timeout

### 5. Navigator 对象
Navigator 对象包含有关访问者浏览器的信息

#### 常用属性
- appName : 浏览器的名称
- appVersion : 浏览器的平台和版本信息
- platform : 运行浏览器的操作系统平台

#### 常用方法
- javaEnabled() : 规定浏览器是否支持并启用了 Java

### 6. History 对象
History 对象包含用户（在浏览器窗口中）访问过的 URL

#### 常用属性
- length : 浏览器历史列表中的 URL 数量

#### 常用方法
- back() : 加载 history 列表中的前一个 URL
- forward() : 加载 history 列表中的下一个 URL
- go() : 加载 history 列表中的某个具体页面

### 7. Location 对象
Location 对象包含有关当前 URL 的信息

#### 常用属性
- host : 主机名和端口号
- hostname : 主机名
- port : 端口号
- hash : 从井号 (#) 开始的 URL（锚）
- protocol : 协议

#### 常用方法
- assign() : 加载新的文档
- reload() : 重新加载当前文档
- replace() : 用新的文档替换当前文档

### 8. Screen 对象
Screen 对象包含有关客户端显示屏幕的信息。 每个 Window 对象的 screen 属性都引用一个 Screen 对象。 Screen 对象中存放着有关显示浏览器屏幕的信息。 JavaScript 程序将利用这些信息来优化它们的输出， 以达到用户的显示要求。 例如，一个程序可以根据显示器的尺寸选择使用大图像还是使用小图像，它还可以根据显示器的颜色深度选择使用 16 位色还是使用 8 位色的图形。 另外，JavaScript 程序还能根有关屏幕尺寸的信息将新的浏览器窗口定位在屏幕中间。

#### 常用属性
- availHeight : 显示屏幕的高度
- availWidth : 显示屏幕的宽度
- pixelDepth : 显示屏幕的颜色分辨率
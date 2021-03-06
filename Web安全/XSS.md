## XSS 

### 1. 什么是XSS
Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全

为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS

XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行

而由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，或者利用这些信息冒充用户向网站发起攻击者定义的请求

在部分情况下，由于输入的限制，注入的恶意脚本比较短。但可以通过引入外部的脚本，并由浏览器执行，来完成比较复杂的攻击策略

这里有一个问题：用户是通过哪种方法“注入”恶意脚本的呢？

不仅仅是业务上的“用户的 UGC 内容”可以进行注入，包括 URL 上的参数等都可以是攻击的来源。处理输入时，以下内容都不可信：
- 来自用户的 UGC 信息
- 来自第三方的链接
- URL 参数
- POST 参数
- Referer （可能来自不可信的来源）
- Cookie （可能来自其他子域注入）

### 2. XSS分类
根据攻击的来源，XSS 攻击可分为存储型、反射型和 DOM 型三种

#### 存储型XSS

存储型XSS会被保存到数据库，在其他用户访问（前端）到这条数据时，这个代码会在访问用户的浏览器端执行

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等

存储型 XSS 的攻击步骤：

①. 攻击者将恶意代码提交到目标网站的数据库中

②. 用户打开目标网站时，**网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器**

③. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行

④. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

#### 反射型XSS

通过 URL 参数直接注入

发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务端解析后返回，XSS代码随响应内容一起传回给浏览器，最后浏览器执行XSS代码。这个过程像一次反射，故叫做反射型XSS

存储型 XSS 的攻击步骤：

①. 攻击者构造出特殊的 URL，其中包含恶意代码

②. 用户打开带有恶意代码的 URL 时，**网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器**

③. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行

④. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见

另外，并不是在 URL 中没有包含script标签的网址都是安全的，可以使用短网址来让网址变得很短

反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里

#### DOM 型 XSS
DOM 型 XSS 的攻击步骤：

①. 攻击者构造出特殊的 URL，其中包含恶意代码

②. 用户打开带有恶意代码的 URL

③. 用户浏览器接收到响应后解析执行，**前端 JavaScript 取出 URL 中的恶意代码并执行**

④. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞

### 3. XSS 防御
通常有两种方式：
- 转义字符
- CSP

参考： https://tech.meituan.com/2018/09/27/fe-security.html
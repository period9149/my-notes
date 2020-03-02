## 常见问题

### 1. eval

eval 的功能是把对应的字符串解析成 JavaScript 代码并运行，如 : 

```js
    eval('1 + 1') // 结果为 2
```

### 2. JavaScript 的垃圾回收方法

（1）标记清除
- 这是 JavaScript 最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”
- 垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

（2）引用计数
- 在低版本 IE 中经常会出现内存泄露（见下一条），很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加 1，如果该变量的值变成了另外一个，则这个值得引用次数减 1，当这个值的引用次数变为 0 的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的空间

### 3. JavaScript 的内存泄漏
JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收
可能造成内存泄漏的有 : 
- 未使用用 var 关键字声明的全局变量
- 闭包
- 两个对象相互引用(循环引用)
- console.log()

### 4. JavaScript 的模块化

模块化的思想可以帮助我们解决变量命名冲突，提高代码的复用性、可维护性

实现模块化的几种方式 : 
- 立即执行函数
```js
(function(str){
    console.log(str);
})('abc')
``` 
- AMD 和 CMD
    - AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行
    - CMD是Common Module Definition的缩写, 意思就是“通用模块定义”，推崇 as lazy as possible

- CommonJS
    - Node.js 中 require()用于加载模块

- ES Module
    - ES Module 会编译成 require/exports 来执行

```js
// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}
```

### 5. setTimeout, setInterval
常见的定时器函数有 `setTimeout`、`setInterval`、`requestAnimationFrame`，但setTimeout、setInterval并不是到了哪个时间就执行，**而是到了那个时间把任务加入到异步事件队列中**

由于 JavaScript 是单线程执行的，如果某些同步代码影响了性能，就会导致 setTimeout 不会按期执行

而setInterval可能经过了很多同步代码的阻塞，导致不正确了，可以使用setTimeout每次获取Date值，计算距离下一次期望执行的时间还有多久来动态的调整

### 6. cookie，localStorage，sessionStorage，indexDB

|     特性     |                   cookie                   |       localStorage       | sessionStorage |         indexDB          |
| :----------: | :----------------------------------------: | :----------------------: | :------------: | :----------------------: |
| 数据生命周期 |     一般由服务器生成，可以设置过期时间     | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小 |                     4K                     |            5M            |       5M       |           无限           |
| 与服务端通信 | 每次都会携带在 header 中，对于请求性能影响 |          不参与          |     不参与     |          不参与          |

从上表可以看到，`cookie` 已经不建议用于存储。如果没有大量数据存储需求的话，可以使用 `localStorage` 和 `sessionStorage` 。对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage` 存储。

对于 `cookie`，还需要注意安全性。

|   属性    |                             作用                             |
| :-------: | :----------------------------------------------------------: |
|   value   | 如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识 |
| http-only |            不能通过 JS 访问 cookie，减少 XSS 攻击            |
|  secure   |               只能在协议为 HTTPS 的请求中携带                |
| same-site |    规定浏览器不能在跨域请求中携带 cookie，减少 CSRF 攻击     |

对于 `indexDB` : 
- 创建数据库
```js
// 第一个参数为数据库名称，第二个数据库为版本号，返回一个IDBOpenDBRequest对象用于操作数据库。
// 对于open()的第一个参数数据库名，open()会先去查找本地是否已有这个数据库，如果有则直接将这个数据库返回，如果没有，则先创建这个数据库，再返回。对于第二个参数版本号，则是一个可选参数，如果不传，默认为1，但是如果传入必须是一个整数
const request = indexedDB.open('myDatabase', 1)
request.addEventListener('success', e => {
    console.log('连接数据库成功')
})
request.addEventListener('error', e => {
    console.log('连接数据库失败')
})
```

- 创建对象仓库
```js
// 对象仓库（object store）是IndexedDB数据库的基础，类似于MySQL中表的概念
// 要创建一个对象仓库必须在upgradeneeded事件中，而upgradeneeded事件只会在版本号更新的时候触发，这是因为IndexedDB API中不允许数据库中的数据仓库在同一版本中发送变化

// 监听upgradeneeded事件，在事件触发时使用createObjectStore()方法创建了一个对象仓库。createObjectStore()方法接受两个参数，第一个是对象仓库的名称，在同一个数据库中，仓库名不能重复，第二个参数是可选参数，用于指定数据的主键，以及是否自增主键
const request = indexedDB.open('myDatabase', 2)
request.addEventListener('upgradeneeded', e => {
    const db = e.target.result
    const store = db.createObjectStore('User', {keyPath: 'userId', autoIncrement: false});
    console.log('创建对象仓库成功')
})

```

### 7. 严格模式的限制

 - 变量必须声明后再使用
 - 函数的参数不能有同名属性，否则报错
 - 不能使用 with 语句
 - 不能对只读属性赋值，否则报错
 - 不能使用前缀 0 表示八进制数，否则报错
 - 不能删除不可删除的属性，否则报错
 - 不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]
 - eval 不会在它的外层作用域引入变量
 - eval 和 arguments 不能被重新赋值
 - arguments 不会自动反映函数参数的变化
 - 不能使用 arguments.callee
 - 不能使用 arguments.caller
 - 禁止 this 指向全局对象
 - 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
 - 增加了保留字（比如 protected、static 和 interface）
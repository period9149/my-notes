# ECMAScript 6 笔记
<!-- TOC -->
[ECMAScript 6 笔记](#ecmascript-6-笔记)
- [1. var、let 及 const](#1varlet-及-const)   
- [2. 箭头函数](#2箭头函数)                 
- [3. 函数参数](#3函数参数)   
- [4. 解构赋值](#4解构赋值)   
- [5. 数组](#5数组)  
- [6. 字符串](#6字符串)   
- [7. 面向对象](#7面向对象)   
- [8. json](#8json)   
- [9. Promise](#9promise)    
- [10. generator - yield](#10generator---yield)    
- [11. async 和 await](#11-async-和-await)    
- [12. Proxy](#12-proxy)
<!-- /TOC -->

## 1.var、let 及 const 

 - 全局申明的var变量会挂载在window上，而let和const不会
 - var声明变量存在变量提升，let和const不会
    - 变量提升就是就是JavaScript编译时会将当前作用域的所有变量的声明提升到程序的顶部（就是先把要用的定义了）
 - let、const 的作用范围是块级作用域，而var的作用范围是函数作用域
     - 全局作用域：window环境下执行的代码
     - 函数作用域：由于函数执行，会产生作用域，这块作用域内存放着当前函数内部执行的代码中的变量，函数。
     - 块级作用域：声明的变量只会在当前作用域及其以下的作用域可以访问的到，一般就是{}n内
 - 同一作用域下let和const不能声明同名变量，而var可以
 - 同一作用域下在let和const声明前使用会存在暂时性死区
    - 暂时性死区：使用let命令声明变量之前，该变量都是不可用的（ReferenceError）
 - const
   - 一旦声明必须赋值,不能使用null占位
   - 声明后不能再修改
   - 如果声明的是复合类型数据（比如对象），可以修改其属性

  - 例子:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script>
        window.onload= function () {
            /*
            var aBtn = document.getElementsByTagName('input')
            for (var i=0; i < aBtn.length; i++) {
                aBtn[i].onclick = function () {
                    alert(i) //3,3,3
                }
            }*/
            var aBtn = document.getElementsByTagName('input')
            for (let i = 0; i < aBtn.length; i++) {
                aBtn[i].onclick = function () {
                    alert(i) //1,2,3
                }
            }
            /*
            var aBtn = document.getElementsByTagName('input')
            for (var i = 0; i < aBtn.length; i++) {
                // 封装到函数里，限制作用域
                (function (i) {
                    aBtn[i].onclick = function () {
                        alert(i)
                    }
                })(i)
            }*/
        }
    </script>
</head>
<body>
    <input type="button" value="按钮1">
    <input type="button" value="按钮2">
    <input type="button" value="按钮3">
</body>
</html>
```

## 2.箭头函数

- 箭头函数，就是简写函数
    - 如果只有一个参数，`()` 可以省
    - 如果只有一个`return`，`{}`可以省

```js
// 普通函数
function name() {

}
// 箭头函数，去掉 function， 加上 =>
() => {

}
```

```js
let show1 = function () {
    console.log('abc')
}

let show2 = () => {
    console.log('abc')
}

show1() // 调用函数
show2()

let show4 = function (a) {
    return a*2
}

let show5 = a => a * 2  //简洁，类似python lambda 函数

console.log(show4(10))
console.log(show5(10))
```

##### Es6中箭头函数与普通函数的区别？
 - 普通function的声明在变量提升中是最高的，箭头函数没有函数提升
 - 箭头函数没有属于自己的`this`，`arguments`
 - 箭头函数不能作为构造函数，不能被new，没有property
 - 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
 - 不可以使用 new 命令，因为：
   - 没有自己的 this，无法调用 call，apply
   - 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 `__proto__`

## 3.函数参数

- 参数扩展／展开 `...args`
    - 收集剩余的参数，只能作为最后一个参数
    - 展开数组的简写
    
- 默认参数

```js
function show(a, b, ...args) {
    console.log(a)
    console.log(b)
    console.log(args)
}
console.log(show(1, 2, 3, 4, 5))

let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [...arr1, ...arr2]
console.log(arr3)

function show2(a, b=5, c=8) {
    console.log(a, b, c)
}
show2(88, 12)
```

## 4.解构赋值

```js
let [a, b, c] = [1, 2, 3]
console.log(a, b, c)

let {x, y, z} = {x: 1, y: 2, z: 3}
console.log(x, y, z)

let [json, arr, num, str] = [{ a: 1, b: 2 }, [1, 2, 3], 8, 'str']
console.log(json, arr, num, str)
```

- 解构赋值
    - 赋值语句左右两边结构必须相同
    - 声明和赋值赋值需由一条语句完成

## 5.数组

- 增加map(), filter(), reduce(), foreach() 四个方法

- map() 映射 
    ######map()作用是遍历原数组，将每个元素拿出来做一些变换然后返回一个新数组，原数组不发生改变

```js
let arr = [12, 5, 8]
let result = arr.map(function (item) {
    return item * 2
})
let result2 = arr.map(item=>item * 2)
console.log(result)
console.log(result2)

let score = [18, 86, 88, 24]
let result3 = score.map(item => item >= 60 ? '及格' : '不及格')
console.log(result3)

[ 24, 10, 16 ]
[ 24, 10, 16 ]
[ '不及格', '及格', '及格', '不及格' ]
```

```js
['1','2','3'].map(parseInt)
// -> [ 1, NaN, NaN ]
//['1','2','3'].map(parseInt)
  // 接收两个参数parseInt(string,radix) radix区间范围介于2~36之间 没有或为0时按照10来执行
  parseInt('1',0);// radix 为 0，parseInt() 会根据十进制来解析，所以结果为 1
  parseInt('2',1);// radix 为 1，超出区间范围，所以结果为 NaN
  parseInt('3',2);// radix 为 2，用2进制来解析，应以 0 和 1 开头，所以结果为 NaN
```

- reduce() 汇总 
    ######可以将数组中的元素通过回调函数最终转换为一个值
    - 用于计算总和，平均数等

```js
var arr = [1, 3, 5, 7]
var result = arr.reduce(function (tmp, item, index) {
    // tmp 上次结果，item当前数，index次数1开始
    console.log(tmp, item, index)
    return tmp + item
})
console.log(result)
```
```js
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)
console.log(sum)
```
```js
var arr = [1, 3, 5, 7]
var result = arr.reduce(function (tmp, item, index) {
    if (index != arr.length - 1) { // 不是最后一次
        return tmp + item
    } else {
        return (tmp + item)/arr.length
    }
})
console.log(result) // 平均值
```

- filter() 过滤器
    ######filter 的作用是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组，可以利用这个函数删除一些不需要的元素
```js
var arr = [12, 4, 8, 9]
var result = arr.filter(item => (item % 3 === 0) ? true : false)
console.log(result)
var result = arr.filter(item => item % 3 === 0)
console.log(result)

var arr = [
    { title: '苹果', price: 10 },
    { title: '西瓜', price: 20 },
]
var result = arr.filter(json => json.price >= 20)
console.log(result)
```

- forEach 循环迭代

```js
var arr = [12, 4, 8, 9]
var result = arr.forEach(item => {console.log(item)})
var result = arr.forEach((item, index) => {console.log(item, index)})
```

## 6.字符串

- 两个新方法
    - `startsWith`
    - `endsWith`

```js
var url = 'http://qq.com'
console.log(url.startsWith('http'))// true
console.log(url.endsWith('com'))// true

```

- 字符串模版
    - 使用反引号，`${变量}`
    - 可以折行

```js
let a = 12
let str1 = `asdf${a}`
console.log(str1)
```
```js
let title = '标题'
let content = '内容'
let str = `<div>
<h1>${title}</h1>
<p>${content}</p>
`
console.log(str)
<div>
<h1>标题</h1>
<p>内容</p>
```
## 7.面向对象

- 原先写法
    - 类和构造函数一样
    - 属性和方法分开写

```js
// 原先
function User(name, pass) {
    this.name = name
    this.pass = pass
}

User.prototype.showName = function () {
    console.log(this.name)
}
User.prototype.showPass = function () {
    console.log(this.pass)
}

var u1 = new User('able', '1233')
u1.showName()
u1.showPass()

// 原先的继承
function VipUser(name, pass, level) {
    User.call(this, name, pass)
    this.level = level
}
VipUser.prototype = new User()
VipUser.prototype.constructor = VipUser
VipUser.prototype.showLevel = function () {
    console.log(this.level)
}

var v1 = new VipUser('blue', '1234', 3)
v1.showName()
v1.showLevel()

```

- 新版面向对象（类Java）
    - 有了 class 关键字、构造器
    - class 里面直接加方法
    - 继承，super 超类==父类

```js
class User {
    constructor(name, pass) {
        this.name = name
        this.pass = pass
    }

    showName() {
        console.log(this.name)
    }
    showPass() {
        console.log(this.pass)
    }
}

var u1 = new User('able2', '111')
u1.showName()
u1.showPass()

// 新版本继承
class VipUser extends User {
    constructor(name, pass, level) {
        super(name, pass)
        this.level = level
    }
    showLevel(){
        console.log(this.level)
    }
}

v1 = new VipUser('blue', '123', 3)
v1.showLevel()
```


## 8.json

- JSON 格式
    - 只能用双引号

- JSON 对象
    - JSON 对象是 JavaScript 的原生对象，用来处理 JSON 格式数据，有两个静态方法
    - JSON.parse(string) ：接受一个 **JSON 字符串**并将其转换成一个 JavaScript **对象**。
    - JSON.stringify(obj) ：接受一个 JavaScript **对象**并将其转换为一个 **JSON 字符串**。

```js
var json = {a: 12, b: 5}
var str = 'hi,' + JSON.stringify(json)
var url = 'http://www.xx.com/' + encodeURIComponent(JSON.stringify(json))
console.log(str)
console.log(url)

var str = '{"a": 12, "b": 4, "c": "abc"}'
var json = JSON.parse(str)
console.log(json)

// hi,{"a":12,"b":5}
// http://www.xx.com/%7B%22a%22%3A12%2C%22b%22%3A5%7D
// { a: 12, b: 4, c: 'abc' }
```


## 9.Promise
- Promise 对象
    - 用同步的方式来书写异步代码
    - Promise 让异步操作写起来，像在写同步操作的流程，不必一层层地嵌套回调函数
    - 改善了可读性，对于多层嵌套的回调函数很方便
    - 充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口
    
- Promise 的三种状态
     - 等待中（pending）
     - 完成了（resolved）
     - 拒绝了（rejected）

- Promise 也是一个构造函数
    - 接受一个回调函数f1作为参数，f1里面是异步操作的代码
    - 返回的p1就是一个 Promise 实例
    - 所有异步任务都返回一个 Promise 实例
    - Promise 实例有一个then方法，用来指定下一步的回调函数
    
```js
function f1(resolve, reject) {
  // 异步代码...
}
var p1 = new Promise(f1);
p1.then(f2); // f1的异步操作执行完成，就会执行f2。
```

    
当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的。
```js
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')

// 先打印new Promise， 再打印 finifsh
```

- Promise 使得异步流程可以写成同步流程

```js
// 传统写法（会造成回调地狱）
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // ...
      });
    });
  });
});

// Promise 的写法
(new Promise(step1))
  .then(step2)
  .then(step3)
  .then(step4);
```

- Promise.all(promiseArray)方法
    - 将多个Promise对象实例包装，生成并返回一个新的Promise实例
    - promise数组中所有的promise实例都变为resolve的时候，该方法才会返回
    - 并将所有结果传递results数组中
    - promise数组中任何一个promise为reject的话，则整个Promise.all调用会立即终止，并返回一个reject的新的promise对象

```js
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    console.log(results);  // [1, 2, 3]
});
```

- Promise.race([p1, p2, p3])
    - Promise.race就是赛跑的意思，哪个结果获得的快，就返回那个结果
    - 不管结果本身是成功状态还是失败状态
    
- 另外，Promise也存在一些缺点，比如无法取消 Promise，错误需要通过回调函数捕获

## 10.generator - yield

```js
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

 - 首先 generator 函数调用和普通函数不同，它会返回一个迭代器
 
 - 当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6

 - 当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8

 - 当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42


## 11. async 和 await

一个函数如果加上 async ，那么该函数就会返回一个 Promise
```js
async function test() {
  return "1"
}
console.log(test()) 
// -> Promise {<resolved>: "1"}
```

async 就是将函数返回值使用 Promise.resolve() 包裹了一下，和 then 中处理返回值一样，并且 await 只能配套 async 使用。
```js
async function test() {
  let value = await sleep()
}
```

当然也存在一些缺点，因为 **await 将异步代码改造成了同步代码**，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。
```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url)
  await fetch(url1)
  await fetch(url2)
}
```

一个使用 await 的例子：
```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a)
}
b()
a++
console.log('1', a)

//先输出  ‘1’, 1
//在输出  ‘2’, 10
```
 - 首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来
 - 因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执行函数外的同步代码
 - 同步代码 a++ 与打印 a 执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 0 + 10


上述解释中提到了 await 内部实现了 generator，其实 **await 就是 generator 加上 Promise 的语法糖，且内部实现了自动执行 generator**。

## 12. Proxy
 Proxy 可以用来自定义对象中的操作。 Vue3.0 中将会通过 Proxy 来替换原本的 Object.defineProperty 来实现数据响应式。
```js
let p = new Proxy(target, handler)
```
`target` 代表需要添加代理的对象，`handler` 用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    },
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 控制台输出：监听到属性a改变
p.a // 'a' = 2
```
自定义 set 和 get 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要我们在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。
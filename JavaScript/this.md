## JavaScript中的 this 
this代表函数调用相关联的对象，通常也称之为执行上下文

### 1. this 指向的几种情况
- 在函数中，严格模式下，this是未定义的（undefined），非严格模式下，this指向 window
- 在对象的方法中， this指向该对象
- 在构造函数中， this指向新创建的对象
- 使用apply()、call()、bind() 可以引用 this 到任何对象
- 在事件中，this 表示接收事件的元素
- 箭头函数没有单独的this值，this在箭头函数创建时确定，它与声明所在的上下文相同

### 如果对一个函数进行多次 bind，this = ?
```js
let a = {}
let fn = function(){
    console.log(this) 
}
fn.bind().bind(a)() // => ?
```
无论函数 bind 几次，fn 中的 this 永远由第一次 bind 决定，所以结果永远是 window。

fn.bind().bind(a) 相当于 :
```js
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```
### this的优先级 : 
首先，new 的方式优先级最高，接下来是 bind() 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。
![this](../img/this.png)
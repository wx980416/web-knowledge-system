## call 函数调用 this 绑定情况

```js
function foo() {
  console.log(this)
}
foo.call() // window
foo.call(null) // window
foo.call(undefined) // window
foo.call('abc') // String {'abc'}
foo.call(1) // Number {1}
foo.call(true) // Boolean {true}
foo.call({}) // {}
foo.call([]) // []
```

## call 实现

```js
Function.prototype.myCall = function (thisArg, ...argArray) {
  // 1.获取被调用函数引用，此时 this 指向该函数
  let fun = this

  // 2.判断绑定的 this 情况，对 thisArg 转成对象类型(防止它传入的是非对象类型)
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window

  // 3.使用对象的方法改变函数的 this
  thisArg.fun = fun

  // 4.调用函数
  const res = thisArg.fun(...argArray)
  delete thisArg.fun

  // 5.返回结果
  return res
}
```

## apply 实现

```js
Function.prototype.myApply = function (thisArg, argArray) {
  const fun = this

  // 处理绑定的 this 和参数
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
  argArray = argArray ? argArray : []

  thisArg.fun = fun
  const res = thisArg.fun(...argArray)
  delete thisArg.fun

  return res
}
```

## bind 实现

```js
Function.prototype.myBind = function (thisArg, ...argArray) {
  const fun = this

  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window

  function proxyFn(...args) {
    thisArg.fun = fun
    let finalArgs = [...argArray, ...args]
    const res = thisArg.fun(...finalArgs)
    delete thisArg.fun

    return res
  }

  return proxyFn
}
```


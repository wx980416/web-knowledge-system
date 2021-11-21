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
  let fun = this
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
    
  thisArg.fun = fun
  const res = thisArg.fun(...argArray)
  delete thisArg.fun

  return res
}
```

## apply 实现

```js
Function.prototype.myApply = function (thisArg, argArray) {
  const fun = this
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


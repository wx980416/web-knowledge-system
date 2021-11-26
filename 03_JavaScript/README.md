[TOC]

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


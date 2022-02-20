const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJRECTED = 'rejected'
class WXPromise {
  constructor(executor) {
    // 默认状态
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const reslove = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value)
          })
        })
      }
    }

    const reject = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJRECTED
          this.reason = value
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(reslove, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new WXPromise((resolve, reject) => {
      // 1.将成功回调和失败回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING && onFulfilled) {
        this.onFulfilledFns.push(() => {
          try {
            const value = onFulfilled(this.value)
            resolve(value)
          } catch (err) {
            reject(err)
          }
        })
        this.onRejectedFns.push(() => {
          try {
            const reason = onRejected(this.reason)
            resolve(reason)
          } catch (err) {
            reject(err)
          }
        })
      }

      // 2.如果在 then 调用的时候，状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED) {
        try {
          const value = onFulfilled(this.value)
          resolve(value)
        } catch (err) {
          reject(err)
        }
      }
      if (this.status === PROMISE_STATUS_REJRECTED) {
        try {
          const reason = onRejected(this.reason)
          resolve(reason)
        } catch (err) {
          reject(err)
        }
      }
    })
  }
}

const promise = new WXPromise((reslove, reject) => {
  // reslove('success')
  reject('error')
})

promise
  .then(
    (res) => {
      console.log('res1:', res)
      return 'SUCCESS'
    },
    (err) => {
      console.log('err1:', err)
      return 'ERROR'
    }
  )
  .then(
    (res) => {
      console.log('res2:', res)
    },
    (err) => {
      console.log('err2:', err)
    }
  )

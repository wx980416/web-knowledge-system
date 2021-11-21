# axios

## 文件夹结构

![image](https://img2020.cnblogs.com/blog/2002005/202111/2002005-20211120231201037-1838125069.png)

## 配置文件 config.js
```js
const devBaseUrl = 'https://httpbin.org'
const proBaseUrl = 'https://production.org'

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseUrl : proBaseUrl

export const TIME_OUT = 5000

```
## 封装文件 request.js
```js
import axios from 'axios'

import { BASE_URL, TIME_OUT } from './config'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log('请求拦截')

    return config
  },
  (err) => {
    console.log(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    console.log(err)
  }
)

export default instance

```
## 使用
```js
import request from './service/request'

request({
  url: '/get',
  params: {
    name: 'wangxin',
    age: 23,
  },
}).then((res) => {
  console.log(res)
})
```

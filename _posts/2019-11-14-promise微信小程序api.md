---
layout: post
title: promise微信小程序api
categories: Develop
description: 将微信小程序api promise化，使用async ... await ...的方式对api进行同步调用。
keywords: 微信小程序, http, fly, flyio, mpvue
---

# why promisify
微信小程序API提供的大部分是异步接口，只有极少数同时提供两个接口，例如数据缓存的set storage  

```js
// 异步接口
wx.setStorage({
  key:"key",
  data:"value",
  success(res){

  },
  fail(err){

  }
})
// 同步接口
try {
  wx.setStorageSync('key', 'value')
} catch (e) { }
```

## 异步代码示例

使用异步接口，总有一个success回调。当我们在操作一个顺序执行的业务场景时，这代码看起来就相当繁琐且不好处理。差不多像这样

```js
// 获取当前的经纬度，并记录到本地缓存，然后请求接口数据
function test(){
  wx.getLocation({
  type: 'wgs84',
  success (res) {
      const latitude = res.latitude
      const longitude = res.longitude
      const speed = res.speed
      const accuracy = res.accuracy
      wx.request({
        url: 'test.php', //仅为示例，并非真实的接口地址
        data: {
          latitude: latitude,
          longitude: longitude
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          wx.setStorage({
            key:"key",
            data:"value",
            success(){
              console.log("all right");
            }
          })        
        }
      })
    }
  })
}
```

是不是让人眼花缭乱，下面我们就将接口写成promise的方式，使用 async ... await ... 来改写这段代码

# 编写promisify.js

下面这段代码是google到的，并作了一定的修改。本人的项目采用mpvue框架，使用了import export，如果使用其他框架，请做适当修改。  

```js
function wxPromisify(api) {
  return (options, ...params) => {
      return new Promise((resolve, reject) => {
          api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
      });
  }
}

export default wxPromisify
```

## 使用promisify
```js
// 注意这里的相对地址，在我的项目中
// promisify.js位于 /src/utils/promisify.js
// 示例代码位于 /src/pages/drugstore/index.vue
import wxPromisify from "../../utils/promisify";

var wxGetLocation = wxPromisify(wx.getLocation);
var res = await wxGetLocation({});
```

# 同步代码示例

这里将上文的异步代码改写成同步代码

```js
import wxPromisify from "../../utils/promisify";

async function test(){
  var wxRequest = wxPromisify(wx.request);
  var wxGetLocation = wxPromisify(wx.getLocation);
  var wxSetStorage = wxPromisify(wx.setStorage);

  var res1 = await wxGetLocation({});
  var res2 = await wxRequest({latitude:res1.latitude, longitude:res1.longitude});
  var res3 = await wxSetStorage({key: "location", value: {} });
}
```
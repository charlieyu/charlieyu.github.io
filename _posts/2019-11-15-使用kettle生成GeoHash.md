---
layout: post
title: 使用kettle生成GeoHash
categories: Develop
description: 通过给kettle添加第三方库，编写java脚本生成GeoHash，并将结果写入数据库
keywords: kettle, spoon, geohash
---

关于GeoHash是什么，有什么用，可以参考我的另一篇文章[使用GeoHash查找附近的药店]({% post_url 2019-11-14-使用GeoHash查找附近的药店 %})。或者自行Google。  
# 必备技能
要想使用GeoHash，首先得想办法，给数据库中的经纬度生成GeoHash。好消息是，很多数据库软件都提供对应的函数，比如mysql的[12.16.10 Spatial Geohash Functions](https://dev.mysql.com/doc/refman/8.0/en/spatial-geohash-functions.html)。不过坏消息是，它家亲戚MariaDB并没有对应的方法。对于没有提供原生支持的数据库，这里给出的答案就是用kettle做数据清洗，把GeoHash补写进数据库。  

# 给kettle添加第三方jar包
kettle生成GeoHash只能通过编写脚本实现，鉴于网上已经有很多java脚本可以用了，所以我们导入kettle，就不自己写了。  
## 将.java打包成.jar
### 下载Class文件 
[https://github.com/GongDexing/Geohash/blob/master/src/cn/net/communion/GeoHashHelper.java](https://github.com/GongDexing/Geohash/blob/master/src/cn/net/communion/GeoHashHelper.java)   
### 编译Class文件
```sh
javac GeoHashHelper.class
```
### 创建MANIFEST.MF描述文件
```sh
echo Main-Class: GeoHashHelper > test.mf
```
### 打包jar
```sh
jar cvfm GeoHashHelper.jar test.mf GeoHashHelper.class
```
大功告成

## 将jar放入kettle
将GeoHashHelper.jar放到kettle的安装目录/lib下面，重新启动kettle。恭喜你，你已经成功的添加了第三方jar包，现在可以在转换中使用了。


# 编写java脚本生成GeoHash
![kttle geohash java](/images/kettle-geohash.jpg)
```java
String latitudeStr = get(Fields.In, "latitude").getString(r);
String longitudeStr = get(Fields.In, "longitude").getString(r);
Double latitude = Double.parseDouble(latitudeStr);
Double longitude = Double.parseDouble(longitudeStr);

GeoHashHelper  geoHashHelper = new GeoHashHelper();
String geoHash = geoHashHelper.encode(latitude, longitude);

get(Fields.Out, "geohash").setValue(r, geoHash);
```
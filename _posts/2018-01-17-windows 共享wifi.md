---
layout: post
title: Windows共享wifi
categories: 日常操作
description: Windows共享wifi
keywords: Windows, wifi
---

之前使用猎豹免费Wifi这样的工具来实现共享wifi，得装个软件，比较麻烦。win10自带了无线热点的功能，可以直接使用。  

#### 1、启用hostednetwork
```sh
netsh wlan set hostednetwork mode=allow ssid=JayFan key=12345678
```

#### 2、配置适配器共享网络
在网络与共享中心，选择一个正常联网的网卡，配置共享网络
![共享Wifi](/images/共享wifi.jpg)

#### 3、启用共享wifi
```sh
netsh wlan start hostednetwork
```


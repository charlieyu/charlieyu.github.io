---
layout: post
title: shadowsocks服务器安装
categories: Operation
description: shadowsocks服务器安装
keywords: Linux, Porxy
---

为了防止哪天无法查询官方文档，特在此处记录。

#### 安装服务器

```sh
$ pip install shadowsocks
```

#### 单一用户配置文件

```json
{
    "server":"my_server_ip",
    "server_port":8388,
    "local_port":1080,
    "password":"barfoo!",
    "timeout":600,
    "method":"chacha20-ietf-poly1305"
}
```

#### 多用户配置文件

```json
{
    "server": "0.0.0.0",
    "port_password": {
        "8381": "xxxx",
        "8382": "xxxx"
    },
    "timeout": 300,
    "method": "aes-256-cfb"
}
```

#### 启动脚本

```sh
ssserver -c config.json -d start
```

#### 停止脚本

```sh
ssserver -d stop
```
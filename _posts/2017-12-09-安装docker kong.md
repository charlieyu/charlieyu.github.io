---
layout: post
title: 安装docker kong
categories: Operation
description: docker安装及常用脚本
keywords: Linux, docker
---

kong 是一个开源的API管理工具。官网提供了docker的安装方式，不过不够简单。这里我提供一份docker compose文件，并简要说明安装的过程。

#### docker compose 文件

```yaml
version: '2.0'

services:

    kong-database:
        image: postgres:9.4
        volumes:
            - /etc/localtime:/etc/localtime:ro
            - ./pgdata:/var/lib/postgresql/data
        environment:
            - TZ=Asia/Shanghai
            - POSTGRES_USER=kong
            - POSTGRES_DB=kong
        ports:
            - "5432:5432"
        container_name: kong-database

    kong:
        image: kong:latest
        volumes:
            - /etc/localtime:/etc/localtime:ro
        environment:
            - TZ=Asia/Shanghai
            - KONG_DATABASE=postgres
            - KONG_PG_HOST=kong-database
            - ONG_CASSANDRA_CONTACT_POINTS=kong-database
            - KONG_PROXY_ACCESS_LOG=/dev/stdout
            - KONG_ADMIN_ACCESS_LOG=/dev/stdout
            - KONG_PROXY_ERROR_LOG=/dev/stderr
            - KONG_ADMIN_ERROR_LOG=/dev/stderr
        ports:
            - "8000:8000"
            - "8443:8443"
            - "8001:8001"
            - "8444:8444"
        links:
            - "kong-database: kong-database"
        container_name: kong

    kong-dashboard:
        image: pgbi/kong-dashboard
        volumes:
            - /etc/localtime:/etc/localtime:ro
        environment:
            - TZ=Asia/Shanghai
        ports:
            - "8080:8080"
        links:
            - "kong:kong"
        command:
            start --kong-url http://kong:8001 --basic-auth admin=admin
        container_name: kong-dashboard
```

文件的具体内容还是得读者自己阅读了。这里简要说明一下，这里一共启用了三个容器，一个数据库Postgres, 一个Kong服务，一个UI项目。UI项目基于Kong接口做的，与数据库无关。

#### 初始化数据库

根据官方文档的要求，第一次使用需要初始化Postgres数据库。

```sh
#启动Postgres数据库
$ docker-compose up -d kong-database
#运行初始化脚本
$ docker run --rm \
    --link kong-database:kong-database \
    -e "KONG_DATABASE=postgres" \
    -e "KONG_PG_HOST=kong-database" \
    -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
    --net kongcompose_default \
    kong:latest kong migrations up
```

需要注意的是，这里有一个 --net 的参数，需要指明一个docker网络。因为数据库的初始化需要跟Postgres在同个docker网络中。可以通过执行```$ docker network ls ```查看所有的docker网络。

#### 启动Kong

```sh
$ docker-compose up -d kong
```

测试服务是否可用 

```sh
$ curl localhost:8001
```

#### 启动kong dashboard

```sh
$ docker-compose up -d kong-dashboard
```

这里需要注意的是，如果kong服务还没起来，8001无法访问，那么kong dashboard会启动失败，容器自动退出。

dashboard的访问地址 http://localhost:8080 账户名 admin 密码 admin
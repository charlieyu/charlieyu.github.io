---
layout: post
title: 安装Docker Registry
categories: Operation
description: 安装Docker Registry
keywords: Linux, Docker
---

要将docker应用于项目部署，肯定少不了私有仓库。总不能整天把images文件copy来copy去吧，太麻烦了。

#### 编辑docker-compose文件

新建文件夹registry-compose, 在里面新建文件 docker-compose.yml 内容如下：

```yaml
version: '2'

services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./registry:/var/lib/registry
    environment:
      - TZ=Asia/Shanghai
      - REGISTRY_STORAGE_DELETE_ENABLED=true
    container_name: registry
  registry-web:
    image: hyper/docker-registry-web
    ports:
      - "8000:8080"
    volumes:
      - /etc/localtime:/etc/localtime:ro
    environment:
      - TZ=Asia/Shanghai
      - REGISTRY_AUTH_ENABLED=false
      - REGISTRY_URL=http://registry-srv:5000/v2
      - REGISTRY_READONLY=false
    links:
      - "registry:registry-srv"
    container_name: registry-web
```

#### 启用http协议

Docker registry默认使用https，官方也建议使用https，不过我搞不定，所以得启用http。

编辑 /etc/docker/daemon.json 文件，加入

```json
{
  "insecure-registries" : ["myregistrydomain.com:5000"]
}
```

配置完别忘了重启Docker

```bash
$ systemctl daemon-reload
$ systemctl restart docker
```

#### 启动registry及对应的管理界面

```bash
$ docker-compose up -d
```

启动完后，私有仓库运行在5000端口，管理界面运行在8000端口，仓库文件存放在 registry-compose/registry

#### 上传镜像示例

##### 下载镜像

```bash
$ docker pull ubuntu
```

##### 重新打标签

```bash
$ docker tag ubuntu localhost:5000/myfirstimage
```

##### 上传镜像

```bash
$ docker push localhost:5000/myfirstimage
```

#### 查看仓库内容

打开浏览器 http://localhost:8000

#### 清理仓库

通过管理界面可以delete镜像，不过这个操作只是删除对应的标签而已，实际内容并没有删除。

可以进入容器，执行如下命令对没有用的blobs进行清理

```bash
$ registry garbage-collect /etc/docker/registry/config.yml
```
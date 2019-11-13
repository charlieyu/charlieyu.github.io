---
layout: post
title: 安装docker gitlab
categories: Operation
description: 安装docker gitlab
keywords: Linux, gitlab
---

gitlab安装之前是挺麻烦，数据库，缓存，文件系统一个不能少，不过官方最近推出了docker镜像。

生活又变得美好起来了。

#### docker-compose 配置

```yaml
version: '2'

services:
  gitlab:
    image: 'gitlab/gitlab-ce:latest'
    restart: always
    hostname: 'gitlab.example.com'
    environment:
      - TZ=Asia/Shanghai
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://192.168.1.134'
        # Add any other gitlab.rb configuration here, each on its own line
        gitlab_rails['gitlab_shell_ssh_port'] = 2224
        gitlab_rails['time_zone'] = 'Asia/Shanghai'
    ports:
      - '80:80'
      - '443:443'
      - '2224:22'
    volumes:
      - './gitlab/config:/etc/gitlab'
      - './gitlab/logs:/var/log/gitlab'
      - './gitlab/data:/var/opt/gitlab'
      - /etc/localtime:/etc/localtime:ro
    container_name: gitlab
```

external_url 填写你本机的ip地址。

大功告成，执行 docker-compose up -d 就可以了。

#### 更新gitlab

```bash
$ docker-compose stop
$ docker-compose rm
$ docker-compose up -d
```

docker 会自动拉取最新的latest镜像运行
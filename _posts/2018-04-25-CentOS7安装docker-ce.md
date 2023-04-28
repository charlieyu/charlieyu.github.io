---
layout: post
title: CentOS7安装DockerCE
categories: Operation
description: CentOS7安装DockerCE
keywords: Linux, Docker
---

DockerCE是新版本的Docker，由于晚于CentOS7发布，所以并不在官方仓库里，这里采用官方文档的做法，通过加入新的yum仓库来安装docker-ce。   
官方文档地址：[https://docs.docker.com/install/linux/docker-ce/centos/#upgrade-docker-ce](https://docs.docker.com/install/linux/docker-ce/centos/#upgrade-docker-ce)

#### 1、安装yum工具
```sh
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

#### 2、下载docker-ce仓库
```sh
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

#### 3、安装docker-ce
```sh
$ sudo yum install docker-ce
```
---
layout: post
title: docker posts 端口映射失败
categories: Operation
description: docker posts 端口映射失败
keywords: Linux, Docker
---

docker映射端口的命令是 -p 比如可以用如下命令将容器的8080端口映射到主机的80端口。

```bash
$ docker run -p 80:8080 tomcat
```

不过端口映射生效的前提是，系统必须启用ip_forward。

#### 1、编辑 /etc/sysctl.conf 文件，加入

```text
net.ipv4.ip_forward=1
```

#### 3、立即生效

```bash
$ sysctl -p /etc/sysctl.conf
```

#### 3、检查是否生效

```bash
$ sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 1
```

#### 4、重启Docker

```bash
$ service docker restart
```

结束

> 题外:

如果你使用了firwalld, 可以通过打开asquerade达到相同的目的

```bash
$ firewall-cmd --add-masquerade
$ firewall-cmd --add-masquerade --permanent
$ firewall-cmd --list-all
FedoraWorkstation (active)
  target: default
  icmp-block-inversion: no
  interfaces: ens33
  sources: 
  services: dhcpv6-client ssh samba-client mdns
  ports: 1025-65535/udp 1025-65535/tcp
  protocols: 
  masquerade: yes
  forward-ports: 
  source-ports: 
  icmp-blocks: 
  rich rules: 
``` 
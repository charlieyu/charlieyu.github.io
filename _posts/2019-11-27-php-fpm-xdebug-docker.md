---
layout: post
title: 制作php-fpm-xdebug docker镜像
categories: Develop Operation
description: 制作php-fpm-xdebug docker镜像
keywords: php, fpm, xdebug, docker
---

如果你还不理解docker跟docker镜像制作，请自行google学习。

# Dockerfile
给php-fpm镜像安装php扩展可以参考[How to install more PHP extensions](https://hub.docker.com/_/php/)   
由于内地的网络通讯问题，这里提供第二种方式，先下载[安装文件](https://pecl.php.net/package/Xdebug)，放在Dockerfile的同级目录下，然后再执行安装。  
温馨提示：因为新版xdebug已经不支持php5，如果你用的是php5，请选择xdebug-2.5.5。   

```text
FROM php:5-fpm
# 安装mysql扩展
RUN docker-php-ext-install mysql

# 安装并启用xdebug
# 方法一，使用pecl直接安装
#RUN pecl install xdebug-2.5.5
#RUN docker-php-ext-enable xdebug
# 方法二，下载文件安装
RUN mkdir /home/software
COPY xdebug-2.5.5.tgz /home/software/
RUN pecl install /home/software/xdebug-2.5.5.tgz
RUN docker-php-ext-enable xdebug
```

# 生成镜像

```sh
docker build -t php5-fpm-xdebug .
```

# docker-compose.yml
温馨提示：   
1、不要把/usr/local/etc/php/conf.d/这个目录映射出来，因为你使用docker-php-ext-install的时候，会往里面写配置文件。你只需要把你自定义的ini文件映射到容器里面就好了。 
2、这里没有把php-fpm默认的9000端口映射到host机，因为没有必要，容器间通讯，我们可以使用php-fpm:9000。在下面的nginx站点配置，你会看到我们就是怎么写的。而且9000我们用作了xdebug的remote_port，所以调试的时候，9000就是phpstrom的监听端口。为了避免冲突，我们不把9000端口映射host机。

```yml
version: '3' 

services:
  php-fpm:
    image: php5-fpm-xdebug
    volumes:
     - /etc/localtime:/etc/localtime:ro
     - ./html:/usr/share/nginx/html:rw
     - ./php/php.ini:/usr/local/etc/php/php.ini
     - ./php/conf.d/docker-php-ext-xdebug.ini:/usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
    container_name: "php-fpm"
  nginx:
    image: nginx:1.15
    ports:
      - "85:85"
    depends_on:
      - "php-fpm"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:rw
      - ./html:/usr/share/nginx/html:rw
    container_name: "nginx"
```

## docker-php-ext-xdebug.ini

```ini
zend_extension=xdebug.so
xdebug.remote_enable=on
xdebug.remote_host=192.168.204.129
xdebug.remote_port=9000
xdebug.idekey=PHPSTORM
```

有不少同学不理解xdebug.remote是什么意思，它是xdebug提供的一种远程调试模式，也就是服务器跟你调试的代码不在一个地方。idekey就是一个标志，当你在querystring中加入?XDEBUG_SESSION_START=PHPSTORM，xdebug就会往remote_host:remote_port发送调试信息。一般来说，我们会在phpstorm配置监听，接收来自xdebug的信息，这样就可以实现服务器联调了。我会在这篇章做详细说明。

## default.conf

这是nginx的配置文件，放在./nginx/conf.d/下面。  
温馨提示：     
1、 root   /usr/share/nginx/html/pingjia; 跟   
fastcgi_param  SCRIPT_FILENAME  /usr/share/nginx/html/pingjia$fastcgi_script_name;  
要写一样的路径。  
2、 docker-compose.yml 文件中两个serice的 /usr/share/nginx/html 都映射到了 ./html。  

```conf
server {
    listen       85;
    server_name  192.168.204.129:85;

    location / {
        root   /usr/share/nginx/html/pingjia;
        index  index.html index.htm index.php;
    }

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    location ~ \.php$ {
        root           html;
        fastcgi_pass   php-fpm:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /usr/share/nginx/html/pingjia$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

## 整个compose目录结构

```sh
[root@localhost php-nginx-compose]# tree ./ -L 3
./
├── docker-compose.yml
├── html
│   ├── index.html
│   └── phpinfo.php
├── nginx
│   └── conf.d
│       └── default.conf
└── php
    ├── conf.d
    │   └── docker-php-ext-xdebug.ini
    ├── php.ini
    ├── php.ini-development
    └── php.ini-production

```

# 打开phpinfo，检查xdebug是否正常安装
![phpinfo-xdebug](/images/phpinfo-xdebug.jpg)
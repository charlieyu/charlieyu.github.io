---
layout: post
title: phpstorm xdebug 调试
categories: Develop
description: phpstorm xdebug 调试
keywords: phpstorm, xdebug
---

# 1、安装LAMP

首先需要安装php(含xdebug模块), apache(nginx)。这部分按官网说明安装就可以。  
php安装  
xdebug安装 <https://xdebug.org/docs/install> 可以使用pecl的方式安装，比较简单。

## 调整xdebug的部分参数

打开php.ini文件，增加下面两个配置

``` text
xdebug.idekey=PHPSTORM
xdebug.remote_enable=ON
```

## 检查是否正常安装

打开页面phpinfo.php

``` php
<?php
    phpinfo();
?>
```

![phpinfo-xdebug](/images/phpinfo-xdebug.jpg)

# 配置PhpStorm

## 配置settings

打开 File -\> Settings -\> PHP  
![phpstorm-php](/images/phpstorm-php.jpg)

打开 File -\> Settings -\> PHP -\> Debug  
确认debug port跟phpinfo -\> xdebug.remote\_port 一致
![phpstorm-settings-php-debug](/images/phpstorm-settings-php-debug.jpg)

打开 File -\> Settings -\> PHP -\> Debug -\> DBGp
Proxy  
填入Apache站点的信息  
![phpstorm-settings-php-dbgp-proxy](/images/phpstorm-settings-php-dbgp-proxy.jpg)

## 配置 Debug Configurations

打开 Run -\> Edit Configurations  
添加 PHP WEB
Page  
![phpstorm-php-debug-configurations](/images/phpstorm-php-debug-configurations.jpg)

## 开始调试

![phpstorm-php-xdebug-start](/images/phpstorm-php-xdebug-start.jpg)

此时phpstrom会打开浏览器，类似这样的网址
<http://192.168.233.129/tp5/public/?XDEBUG_SESSION_START=18718> 请留意这段尾巴
XDEBUG\_SESSION\_START=18718 ，你可以改成 XDEBUG\_SESSION\_START=PHPSTORM，
效果是一样，其中PHPSTORM就是那个idekey。  
只需要在访问页面的时候加上XDEBUG\_SESSION\_START=PHPSTORM，phpstorm的断点就会生效了。

可能你也注意到了，你的软件要放在apache下面，首要条件是他得能通过浏览器访问。

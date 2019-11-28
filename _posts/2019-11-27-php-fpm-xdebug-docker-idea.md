---
layout: post
title: php-fpm-xdebug-docker phpstorm联调
categories: Develop
description: php-fpm-xdebug-docker phpstorm联调
keywords: php, fpm, xdebug, docker, idea
---

之前我写过一篇文章，如何配置phpstorm xdebug联调，当时没有用到docker，是用本地的php跟apache。[phpstorm xdebug 调试](/develop/2019/06/18/phpstrom-xdebug-调试.html)  
正常开发这样应该就够了，但如果你手上有不少项目，而且还是用不同的php版本运行的。搭建多个本地的调试环境估计会把你搞得晕头转向。  
在一台机子分割多个运行环境，我们会想到使用容器，自由调用不同版本的php，我们会想到使用php-fpm。当然还有开发利器phpstrom。将docker，xdebug，php-fpm, phpstorm结合起来就是这篇文章宗旨。

# xdebug remote 原理
有不少同学不理解xdebug.remote是什么意思，它是xdebug提供的一种远程调试模式，也就是服务器跟你调试的代码不在一个地方。idekey就是一个标志，当你在querystring中加入?XDEBUG_SESSION_START=PHPSTORM，xdebug就会往remote_host:remote_port发送调试信息。一般来说，我们会在phpstorm配置监听，接收来自xdebug的信息，这样就可以实现服务器联调了。  
这也可以解答很多同学的疑问——docker容器跟代码不在同个环境，要怎么调试？答案就是他们不需要在同个地方，因为xdebug会把debug信息送出来，remote_host:remote_port可以是任何地方。当然还有一个问题，就是phpstrom接受到debug信息后如何跟项目代码对应，这里面有一个map的配置，下面会说明map要怎么做。

# 制作php-fpm-xdebug-docker镜像

请阅读我之前写的这篇文章[制作php-fpm-xdebug-docker镜像](/develop/operation/2019/11/27/php-fpm-xdebug-docker.html)。这篇文章还包括了怎么配置docker-cmpose跟nginx。

# 配置phpstorm
以下这几个步骤跟[phpstorm xdebug 调试](/develop/2019/06/18/phpstrom-xdebug-调试.html)一样，所以我使用了那篇文章的截图。只是在配置server那里多了一个选项，要打开Use path mappings。

## 配置 debug port
打开 File -\> Settings -\> PHP -\> Debug  
确认debug port跟phpinfo -\> xdebug.remote\_port 一致
![phpstorm-settings-php-debug](/images/phpstorm-settings-php-debug.jpg)

## 配置 DBGp Proxy
打开 File -\> Settings -\> PHP -\> Debug -\> DBGp Proxy  
填入nginx站点的信息,截图是引用之前文章的，这一次我们用的是85端口。
![phpstorm-settings-php-dbgp-proxy](/images/phpstorm-settings-php-dbgp-proxy.jpg)

## 配置 Debug Configurations
打开 Run -\> Edit Configurations  
添加 PHP WEB Page  
![phpstorm-php-debug-configurations](/images/phpstorm-php-debug-configurations.jpg)

## 配置 Servers
打开 File -\> Settings -\> PHP -\> Servers  
添加 nginx站点
![phpstorm-xdebug-servers](/images/phpstorm-xdebug-servers.jpg) 

这里我们写了一些map。  
/usr/share/nginx/html/pingjia/data 是nginx那边的目录，还记得nginx的配置吗```root   /usr/share/nginx/html/pingjia```。  
data是phpstorm项目的代码。  
如果你没法下断点，提示phpstorm找不到对应的代码，你就来这里添加映射就可以了。

# 开始调试
![phpstorm-php-xdebug-start](/images/phpstorm-php-xdebug-start.jpg)

其实你只要打开监听就可以了。然后自己打开浏览器，比如你要调试页面是 http://192.168.204.129:85/member/login.php，访问地址加上 ?XDEBUG_SESSION_START=PHPSTORM，变成 http://192.168.204.129:85/member/login.php?XDEBUG_SESSION_START=PHPSTORM 就可以了。



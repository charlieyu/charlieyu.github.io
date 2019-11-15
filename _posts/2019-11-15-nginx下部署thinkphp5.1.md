---
layout: post
title: nginx下部署thinkphp5.1
categories: Develop
description: nginx下部署thinkphp5.1，修正路径重定向的问题
keywords: thinkphp, php, nginx
---

按照要求，部署的时候只开放/public目录的访问。需要打开重定向，apache2的话，因为官方已经提供了.htaccess，启用mod_rewrite就可以了。  
关于在nginx下的重定向问题，在[官方文档](https://www.kancloud.cn/manual/thinkphp5_1/353955)URL设计中有说明。  
下面是那个重定向的关键配置，摘录自官方文档。

```text
location / { // …..省略部分代码
   if (!-e $request_filename) {
   		rewrite  ^(.*)$  /index.php?s=/$1  last;
    }
}
```

请特别留意这段配置中有一个```s=/$1```，在/thinkphp/convention.php中可以找到如下代码

```php
// PATHINFO变量名 用于兼容模式
'var_pathinfo'           => 's',
```

一开始也是每搞清楚，被坑了好久。
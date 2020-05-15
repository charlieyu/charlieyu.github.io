---
layout: post
title: Fedora 添加快捷方式
categories: 日常操作
description: Fedora 添加快捷方式
keywords: Fedora
---

Fedora增加快捷方式很简单，只需增加一个文件就可以了。Fedora开始菜单的快捷方式都存放在这个目录
```text
/usr/share/applications
```

新增文件pycharm.desktop，内容如下：

```text
[Desktop Entry]
Name=PyCharm
GenericName=pycharm ide
Exec=/usr/local/pycharm/bin/pycharm.sh
Icon=/usr/local/pycharm/bin/pycharm.png
Terminal=false
Type=Application
Categories=Development;
```

Name：快捷方式名称

GenericName：说明

Exec：程序位置

Icon：图标位置

Terminal：是否从终端运行

Type：类型

Categories：存放在哪个分类
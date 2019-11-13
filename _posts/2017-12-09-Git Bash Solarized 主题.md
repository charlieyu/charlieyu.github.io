---
layout: post
title: GIT Bash Solarized 主题
categories: Develop
description: docker安装及常用脚本
keywords: Windows, GIT, Bash, Solarized
---

其实GIT Bash这玩意挺好用的，只要修改一下UI，生活就会变得美好起来。不过前提是安装的时候你选择的是mintty这个终端。

#### 下载Solarized主题配色文件

原始地址 [https://github.com/mavnn/mintty-colors-solarized](https://github.com/mavnn/mintty-colors-solarized){:target="_blank"}

#### 编辑配置文件

文件地址 ~/.minttyrc， 如果没有这个文件的话就新建一个。填入你想要的主题，以Solarized Dark为例，文件内容如下：

```text
ForegroundColour=131, 148, 150
BackgroundColour=  0,  43,  54
CursorColour=    220,  50,  47

Black=             7,  54,  66
BoldBlack=         0,  43,  54
Red=             220,  50,  47
BoldRed=         203,  75,  22
Green=           133, 153,   0
BoldGreen=        88, 110, 117
Yellow=          181, 137,   0
BoldYellow=      101, 123, 131
Blue=             38, 139, 210
BoldBlue=        131, 148, 150
Magenta=         211,  54, 130
BoldMagenta=     108, 113, 196
Cyan=             42, 161, 152
BoldCyan=        147, 161, 161
White=           238, 232, 213
BoldWhite=       253, 246, 227
```

#### 修改一下字体

其实这还不够，修改一下字体，效果就个更完美了。右键单击标题栏->Options

![GIT-Bash-options-text](/images/GIT-Bash-options-text.jpg)

#### 重启GIT Bash

下面是效果图:

![GIT-Bash-Solarized](/images/GIT-Bash-Solarized.jpg)

示例配置文件
[.minttyrc]({{ site.url }}/downloads/minttyrc)
> 下载后请把文件改成 .minttyrc
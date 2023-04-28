---
layout: post
title: git忽略权限变更
categories: Develop
description: git忽略权限变更
keywords: git
---

默认情况下，对文件权限的更改也会被git跟踪。即使文件内容没有变化，也会被定义成modify。我们可以通过配置项来让git忽略权限变更。

```sh
git config core.filemode false
```

注意，这个操作有全局命令，但不会对以存在的项目有效。只有新建项目的时候会生效。所以对已存在的项目，请逐一执行上面这条指令。


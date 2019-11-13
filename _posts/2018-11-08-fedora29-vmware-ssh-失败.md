---
layout: post
title: fedora29 vmware ssh 失败
categories: Operation
description: fedora29 vmware ssh 失败
keywords: linux，fedora, ssh
---

fedora总能搞出一些事来，这次fedora29就有ssh无法使用的问题。总是报Broken pipe的错误。

解决办法是修改ssh的config

```sh
cat ~/.ssh/config
Host *
    IPQoS lowdelay throughput
```
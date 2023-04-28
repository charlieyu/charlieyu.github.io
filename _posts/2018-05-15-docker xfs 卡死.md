---
layout: post
title: docker xfs 卡死
categories: Operation
description: 频繁重启docker导致xfs文件系统挂载错误
keywords: Linux, GIT
---

docker是一个快速更新的开源项目，今天就碰到一个棘手的问题。运行docker的linux内核出错，docker整个卡死，不接受任何命令，无法停止。
查了下系统日志，发现是文件系统错误。

```text
May 15 09:12:00 localhost dockerd-current: time="2018-05-15T09:12:00.282507381+08:00" level=info msg="Container 86f8559b50d7 failed to exit within 10 seconds of kill - trying direct SIGKILL"
May 15 09:12:00 localhost kernel: XFS (dm-18): Unmounting Filesystem
```

借助万能的google，发现docker在xfs文件系统中确实会出现这种现象。过于频繁create/destory container、pull/push image，当thin pool满时，DeviceMapper后端默认文件系统xfs会不断retry 失败的IO，导致进程挂起。  
解决方法有两个：
1、不用xfs文件系统
2、加入启动参数 dm.xfs_nospace_max_retries=0  

对于加入启动参数这件事，docker官方文档也有说明 [https://docs.docker.com/engine/reference/commandline/dockerd/](https://docs.docker.com/engine/reference/commandline/dockerd/){:target="_blank"}  

```text
By default XFS retries infinitely for IO to finish and this can result in unkillable process.   
To change this behavior one can set xfs_nospace_max_retries to say 0 and XFS will not retry IO after getting ENOSPC and will shutdown filesystem.

Example
$ sudo dockerd --storage-opt dm.xfs_nospace_max_retries=0
```

新版本的docker可以通过修改 /etc/docker/daemon.json 改变启动参数。

```json
{
  "storage-driver": "devicemapper",
  "storage-opts": [
    "dm.xfs_nospace_max_retries=0"
  ]
}
```
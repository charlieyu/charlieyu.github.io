---
layout: post
title: VMware在Linux客户机中装载共享文件夹
categories: Operation
description: VMware转载共享文件夹
keywords: linux，vmware
---

官网原文地址 [https://docs.vmware.com/cn/VMware-Workstation-Pro/14.0/com.vmware.ws.using.doc/GUID-AB5C80FE-9B8A-4899-8186-3DB8201B1758.html](https://docs.vmware.com/cn/VMware-Workstation-Pro/14.0/com.vmware.ws.using.doc/GUID-AB5C80FE-9B8A-4899-8186-3DB8201B1758.html)

# 1、在vmware中启用共享文件夹

![共享文件夹](/images/共享文件夹.jpg)

# 2、使用以下脚本挂载

```sh
/usr/bin/vmhgfs-fuse .host:/share /home/share -o subtype=vmhgfs-fuse,allow_other
```

这样就可以了，共享文件夹挂到了/home/share下面。  
至于其它问题，比如软件版本的问题，请查询官方文档。
---
layout: post
title: fedora31 cgroupsv2 disable
categories: Develop Operation
description: 关闭cgroupsv2
keywords: linux fedora cgroups
---

fedora31 开启了 CGroupsV2 ，然后 docker 还不支持。

要回到V1版本，需要将 systemd.unified_cgroup_hierarchy=0 加入内核启动选项

打开 /etc/default/grub 在 GRUB_CMDLINE_LINUX 加入这个选项

更新grub配置 grub2-mkconfig -o /boot/grub2/grub.cfg

重启计算机
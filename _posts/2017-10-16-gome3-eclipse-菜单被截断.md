---
layout: post
title: eclipse运行在gome3下面，右键菜单被截断
categories: Develop
description: eclipse运行在gome3下面，右键菜单被截断
keywords: Fedora, Linux, Gome3, Eclipse
---

刚更新了Fedora26, 又碰到Eclipse快捷菜单太长被截断的问题，这次记下来。

主要原因是Eclipse仍不支持GTK2, 所以在Eclipse的配置文件中加入下面这两行就可以了。

#### 修改eclipse.ini文件，添加以下两行

```text
--launcher.GTK_version
2
```

最后的文件看起来像这样，请注意上面那两行所在的位置

```text
-startup
plugins/org.eclipse.equinox.launcher_1.4.0.v20161219-1356.jar
--launcher.GTK_version
2
--launcher.library
plugins/org.eclipse.equinox.launcher.gtk.linux.x86_64_1.1.550.v20170928-1359
-product
org.eclipse.epp.package.jee.product
-showsplash
org.eclipse.epp.package.common
--launcher.defaultAction
openFile
--launcher.defaultAction
openFile
--launcher.appendVmargs
-vmargs
-Dosgi.requiredJavaVersion=1.8
-Dosgi.instance.area.default=@user.home/eclipse-workspace
-XX:+UseG1GC
-XX:+UseStringDeduplication
--add-modules=ALL-SYSTEM
-Dosgi.requiredJavaVersion=1.8
-Xms256m
-Xmx1024m
--add-modules=ALL-SYSTEM
```
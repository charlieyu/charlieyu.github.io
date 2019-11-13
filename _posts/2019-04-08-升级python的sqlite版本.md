---
layout: post
title: 升级python的sqlite版本
categories: Operation
description: 升级python的sqlite版本
keywords: Linux, Python, Sqlite
---

如果之前有用yum安装过，需要先删除yum的版本

```sh
yum remove sqlite3
```

从sqlite官网下载源代码 sqlite-autoconf-3270200.tar.gz [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html)

```sh
tar -xvf sqlite-autoconf-3270200.tar.gz
cd sqlite-autoconf-3270200
./configure
make && make install
```

测试安装结果

```sh
# sqlite3
SQLite version 3.26.0 2018-12-01 12:34:55
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite> 
Ctrl+D 退出
```

如果没有效果，把sqlite-autoconf-3270200/sqlite3 复制到 /usr/bin/sqlite3 就可以了

# 重新编译Python3

```sh
cd Python-3.7.2
LD_RUN_PATH=/usr/local/lib ./configure LDFLAGS="-L/usr/local/lib" CPPFLAGS="-I/usr/local/include"  
LD_RUN_PATH=/usr/local/lib make
make install
```

在执行编译前加入/usr/local/的路径，这样就能找到你新安装的sqlite3了，不然它还是会用系统的就版本。

测试安装结果

```sh
[root@bogon charlieyu.github.io]# python3
Python 3.7.2 (default, Mar 21 2019, 10:09:12) 
[GCC 8.3.1 20190223 (Red Hat 8.3.1-2)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import sqlite3
>>> sqlite3.sqlite_version
'3.26.0'
>>> 
Ctrl+D 退出
```

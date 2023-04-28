---
layout: post
title: 如何给jekyll markdown里的table加入样式
categories: Develop
description: 给markdown里的table加入样式的语法，目前只在jekyll测试过。其它引擎是否可用，尚未知。
keywords: jekyll, markdown, table, style
---

下面的代码示例是在markdown中写一个表格，并且给这个表格应用t1样式。这段代码在jekyll中可以正常使用，其它引擎就不知道了。  

```markdown 
||||
|---:|:---:|:---|
|NorthWest|North|NorthEast|
|West|<span style="color:green">Me</span>|East|
|SouthWest|South|SouthEast|
{:.t1}

<style>
.t1{
    width:auto;
    border: none;
}
.t1 td{
    border: none;
    padding:10px;
}
.t1 th{
    border:none;
}
</style>
```
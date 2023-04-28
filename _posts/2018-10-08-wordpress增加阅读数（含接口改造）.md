---
layout: post
title: wordpress增加阅读数（含接口改造）
categories: Develop
description: wordpress增加阅读数（含接口改造）
keywords: git
---

wordpress默认是没有阅读数的，本文通过使用wordpress内部的set_post_meta方法来实现。在主题文件的functions.php增加以下代码：

```php
/**
 * 增加浏览数
 **/
function getPostViews($postID){
    $count_key = 'post_views_count';  
    $count = get_post_meta($postID, $count_key, true);  
    if($count==''){
        delete_post_meta($postID, $count_key);  
        add_post_meta($postID, $count_key, '0');  
        return "0";   
    }  
	return $count;
}  

function setPostViews($postID) {  
    $count_key = 'post_views_count';  
    $count = get_post_meta($postID, $count_key, true);  
    if($count==''){  
        $count = 0;  
        delete_post_meta($postID, $count_key);  
        add_post_meta($postID, $count_key, '0');  
    }else{  
        $count++;  
        update_post_meta($postID, $count_key, $count);  
    }  
}
/**
 * 在接口增加 post_view 字段
 **/ 
add_action( 'rest_api_init', function () {
    register_rest_field( 'post', 'post_view_count', array(
        'get_callback' => function($post) {
            return getPostViews($post['id']);
        },
    ) );
} );
```

在single.php文件放入以下代码，这样每次打开都会把阅读数加一。

```php
<?php setPostViews(get_the_ID()); ?>
```

在需要现实阅读数的地方，加入以下代码

```php
<?php echo getPostViews(get_the_ID()); ?>
```

最后一段函数是把阅读数加入wp rest api的返回。key=post_view_count。  
官方说明[https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/](https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/)

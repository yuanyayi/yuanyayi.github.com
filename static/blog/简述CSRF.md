## CSRF的定义：
Cross Site Request Forgery-跨站请求伪造
简单理解就是：合法用户使用自己的身份信息，在可能不知情的情况下发出了一个合法的恶意请求。这个请求可以由被误导的用户点击链接发出，也可以通过植入一个网络资源，在资源加载时发出。
具体例子看这里->[「每日一题」CSRF 是什么？](https://zhuanlan.zhihu.com/p/22521378)

## CSRF的防范：
1. 针对Get的攻击：
针对Get方式进行攻击是最简单的，只要设置成一个会被自动访问加载的资源地址即可。可以是img、script、iframe等等。
> <img src="http://UserSite/admin/deletepage?id=74NBCDSEFG"/>

参考解决方法：
* 页面资源地址不要直接使用用户传来的不加处理的地址；
* 按照Http规范，所有会对网络资源进行修改的请求都不要使用Get方式（需要后端需要进行判断，比如php的$_REQUEST和$_GET/$_POST）

2. 针对POST的攻击：
CSRF可以诱导用户带着自己的验证信息去访问另一个网址，并在网址中加入脚本来发出一个恶意的POST请求。
参考解决方法：
*  检查 HTTP 头部 Refer 信息，禁止跨域请求。此方法无法应对同域攻击的情况。
* 使用一次性令牌。服务端在 session或 cookie中加入一个随机数，这个随机数将随请求发回服务端进行验证。
* 使用验证图片。

***
参考资料：
[Web 应用程序常见漏洞 CSRF 的入侵检测与防范](https://www.ibm.com/developerworks/cn/rational/r-cn-webcsrf/index.html)
[浅谈CSRF攻击方式](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)
[[Web 安全] 如何通过JWT防御CSRF](https://segmentfault.com/a/1190000003716037)

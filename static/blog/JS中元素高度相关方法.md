## 按照获取范围整理：
### 1. content
 `$(node).height()`
![image](http://upload-images.jianshu.io/upload_images/5720797-25c1eed9e7a36f10.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2. content+padding
 `$(node).innerHeight()` 
![image](http://upload-images.jianshu.io/upload_images/5720797-fc01c0c8332ba40d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 原生JS:
1.  `node.clientHeight`只读属性，元素content+padding目前可视的部分，不包括滚动条。
2.  `node.scrollHeight`只读属性，元素content+padding所有可滚动部分，不包括滚动条
3. `window.innerHeight`可以返回窗口可视区高度。
##### * clientHeight和scrollHeight的区别
* 从字面意思讲：clientHeight返回元素可视区的高度（不包括伪元素），scrollHeight返回整个元素所有部分的大小（很神奇的包括伪元素！）。
* 当元素小于容器大小时，``node.scrollHeight == node.clientHeight``
![image](http://upload-images.jianshu.io/upload_images/5720797-b1a7c2c9eab2a5d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image](http://upload-images.jianshu.io/upload_images/5720797-77d87afc363373b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3. content+padding+border
`$(node).outerHeight()`
![image](http://upload-images.jianshu.io/upload_images/5720797-469c58d2e96120b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 原生JS
 1. `node.offsetHeight`，只读属性，content+padding+元素水平滚动条。这个属性值会被四舍五入为整数值。
2. `window.outerHeight`可以返回整个窗口的高度，包括地址栏菜单栏状态栏等等一系列乱七八糟的东西（有什么使用场景希望大家给个补充～）。
注：window不是一般的DOM元素，比如它就没有clientHeight属性。

### 4. content+padding+border+margin
`$(node).outerHeight(true)`
(示意图同上)

***
## 特殊的：window、document
window和document都不是DOM元素，不能按普通的DOM元素调用API。
### window：窗口
window本身只有两个高度：
* `window.innerHeight` 可视区高度
* `window.outerHeight` 窗口整体带菜单地址栏等等的高度

但是window还有一个元素，它也有两个height：
### window.screen：用户屏幕信息
* `window.screen.height` 用户屏幕高度（不换屏这个数值不变）
* `window.screen.availHeight` 用户屏幕能使用的高度。
window.screen 就是媒体查询`@media screen and (min-width: 700px){ // some css styles }`里面的**screen**。
补充：在Mac上实验，**Chrome浏览器**在桌面时，window.screen.height === 900，window.outerHeight === window.screen.availHeight === 878。但是将浏览器全屏（单开桌面）时，window.screen.availHeight === 878，window.outerHeight === window.screen.height === 900。**即窗口实际高度竟然超过了屏幕可用高度！**
**火狐浏览器**的表现更好，window.screen.availHeight 会跟随全屏状态，即单开桌面时，window.outerHeight === window.screen.availHeight === window.screen.height === 900。

### document：文档
document是指整个html文件。它并不是一个页面更不是一个DOM元素，所以document没有高度。
那么document到底是个什么位置呢？下面给出主要元素的相对关系：
> document.documentElement => html
> document.documentElement.childeNodes[1] => body
> document.body => body

### document.documentElement
上面说了document.documentElement就是html标签，DOM元素会有的属性，document.documentElement就会有，包括clientHeight，scrollHeight，offsetHeight。
一般的，window.innerHeight === document.documentElement.clientHeight


参考资料：
[MDN中文文档：https://developer.mozilla.org/zh-CN/](https://developer.mozilla.org/zh-CN/)
[jQuery文档：https://api.jquery.com/](https://api.jquery.com/)

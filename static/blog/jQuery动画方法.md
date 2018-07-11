jQuery给我们提供了非常简单的动画设计方案。只要指定的属性是个连续值，我们就可以通过简单的指定初始状态、最终状态、时间、速度函数来实现一些动画效果。
## 创建自定义的动画：
### 1. 语法：`$el.animate(params, [speed], [easing], [fn])`
#### params：
一组包含作为动画属性和终值的样式属性和及其值的集合对象。
1. 对象中的每个key取值都必须是可变化的、连续的值；
2. 所有指定的属性必须用骆驼形式，比如用marginLeft代替margin-left。
[查看animate支持的属性](http://www.w3school.com.cn/jquery/effect_animate.asp)
颜色动画的支持需要插件。
#### speed：
1. 三种预定速度之一的字符串("slow","normal", or "fast")
2. 表示动画时长的毫秒数值(如：1000)
#### easing：
动画效果速度函数的名称(需要插件支持)。默认jQuery提供"linear" 和 "swing"。
#### fn：
在动画完成时的回调函数，每个元素执行一次。

### 2. 举个例子：
[jQuery Animate 测试](http://js.jirengu.com/lazeg/edit?html,css,js,output)
```
$(ev.target).animate({
    width: 120,
    height: 120,
    left: 100,
    backgroundColor: 'silver'
  }, 1000, 'swing')
```
这些动画会同时进行。
在这个例子中，我使用了jquery-color-animate-plugin处理颜色渐变的问题。

### 3.动画队列：
其实jQuery中有一个隐藏的对象：队列。这个对象主要服务的对象就是animate。
#### 队列
> ### 队列控制
> *   [queue(e,[q])](http://jquery.cuishifeng.cn/queue.html "queue(element,[queueName])")
> *   [dequeue([queueName])](http://jquery.cuishifeng.cn/dequeue.html "dequeue([queueName])")
> *   [clearQueue([queueName])](http://jquery.cuishifeng.cn/clearQueue.html "clearQueue([queueName])")

当需要多个animate依次执行时，会自动将多个动画放入队列，顺序执行。

#### jQuery animate中的队列操作：
##### 1). stop([clearQueue],[gotoEnd])
看这个例子：[jQuery Animate Queue队列](http://js.jirengu.com/suyar/edit?html,css,js,output)
* 当clearQueue取值true时，动画队列被完全清空；
* 当gotoEnd取值true时，当前动画虽然被取消，但是元素会直接显示为动画最终结束时的样子。

##### 2). delay(duration)
没什么说的，这是延时。target.delay(5000)可以让前后两个动画间隔5s。
有趣的是：delay()可以被stop中止。在延时中调用stop()可以直接开始下一个动画。在上面的例子中将注释掉的delay放出来试试看～

##### 3). finish()
.finish()方法和.stop(true, true)很相似，.stop(true, true)将清除队列，并且**目前的动画**跳转到其最终值。但是，不同的是，.finish() 会导致**所有排队的动画**的CSS属性跳转到他们的最终值。

### 3. 如果不支持动画。。。
大杀器：`jQuery.fx.off = true;`
这个属性允许所有jQuery动画被触发时不进行动画，直接跳到动画完成状态。用以保证即使动画无法正常执行，也不影响页面的可访问性。

***
## jQuery准备好的动画效果：
*   ### 基本
    *   [show([s,[e],[fn]])](http://jquery.cuishifeng.cn/show.html "show([speed,[easing],[fn]])")
    *   [hide([s,[e],[fn]])](http://jquery.cuishifeng.cn/hide.html "hide([speed,[easing],[fn]])")
    *   [toggle([s],[e],[fn])](http://jquery.cuishifeng.cn/toggle.html "toggle([speed],[easing],[fn])")
*   ### 滑动
    *   [slideDown([s],[e],[fn])](http://jquery.cuishifeng.cn/slideDown.html "slideDown([speed],[easing],[fn])")
    *   [slideUp([s,[e],[fn]])](http://jquery.cuishifeng.cn/slideUp.html "slideUp([speed,[easing],[fn]])")
    *   [slideToggle([s],[e],[fn])](http://jquery.cuishifeng.cn/slideToggle.html "slideToggle([speed],[easing],[fn])")
*   ### 淡入淡出
    *   [fadeIn([s],[e],[fn])](http://jquery.cuishifeng.cn/fadeIn.html "fadeIn([speed],[easing],[fn])")
    *   [fadeOut([s],[e],[fn])](http://jquery.cuishifeng.cn/fadeOut.html "fadeOut([speed],[easing],[fn])")
    *   [fadeTo([[s],o,[e],[fn]])](http://jquery.cuishifeng.cn/fadeTo.html "fadeTo([[speed],opacity,[easing],[fn]])")
    *   [fadeToggle([s,[e],[fn]])](http://jquery.cuishifeng.cn/fadeToggle.html "fadeToggle([speed,[easing],[fn]])")

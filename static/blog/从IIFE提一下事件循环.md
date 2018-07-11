# 立即执行函数表达式是什么？有什么作用？
1. 首先，JS中每个函数在被调用时都会创建一个执行上下文，在该函数内部定义的变量和函数只能在该函数内部被使用（闭包）。这样，虽然JS中没有明确的私有变量定义，我们也可以创建一些私有变量。
2. 其次，函数也可以使用自己上级作用域中定义的变量。
3. 立即执行函数（IIFE）。顾名思义，就是创建后立即自动执行的函数。这种函数既可以是具名的，也可以是匿名的。
4. **结合以上，立即执行函数可以配合闭包保存变量状态。**
示例：
```
function loop() {
  for (var i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 100)
  }
}
loop()
// 10 10 10 10 10 10 10 10 10 10
```
先同步再异步，变量 i 不会被保存，所以输出10次10。
```
function loop1() {
  for (var i = 0; i < 10; i++) {
    (function (n) {setTimeout(() => { console.log(n) }, 100)}(i))
  }
}
loop1()
```
变量 i 的状态被保存再传入，每次输出都是当时的状态而不是同步结束后的状态。输出0 1 2 3 4 5 6 7 8 9。

# 另一个问题：为什么要用增加监听事件的例子讲IIFE？
讲解IIFE时，有时会遇到这个例子：
```
var elems = document.getElementsByTagName( 'a' );

for ( var i = 0; i < elems.length; i++ ) {

  elems[ i ].addEventListener( 'click', function(e){
    e.preventDefault();
    alert( 'I am link #' + i );
  }, 'false' );

}
```
在这个例子中，因为i不会被锁定，我们所有的事件监听其实都加给了elems[elems.length]，但是elems[elems.length]又是不存在的，所以失败。
我们期望的运行结果应该是这个代码：
```
var elems = document.getElementsByTagName( 'a' );

for ( var i = 0; i < elems.length; i++ ) {

  (function( lockedInIndex ){

    elems[ i ].addEventListener( 'click', function(e){
      e.preventDefault();
      alert( 'I am link #' + lockedInIndex );
    }, 'false' );

  })( i );

}
```
用lockedInIndex锁住i的值，才会加给elems中的每一个对象。
所以我遇上了另一个问题：
## 为什么addEventListener是异步操作？
简单说，异步操作就是：
1. 从主线程角度说：主线程将任务丢给其他任务线程，然后去做自己的事（同步操作），空闲下来回去从头看消息队列，如果遇到任务线程的完成通知，就执行对应的回调函数。
2. 从任务线程角度说：任务线程接到一个任务就去完成，做完了就在消息队列末尾加入一条消息。
3. 所以，**消息队列中的每条消息实际上都对应着一个事件。**

事件中还有很常见的一个类型：**DOM事件**。
addEventListener发起了一个异步过程。事件触发时，异步任务完成，任务线程将事件回调函数封装在消息中放到消息队列中，等待主线程执行。

所有异步过程都可以用事件来描述。

##### 参考文章
* [立即执行函数表达式（IIFE）](http://www.cnblogs.com/nzbin/p/5713406.html) (译文，后半部分是名词解释)
* [JavaScript：彻底理解同步、异步和事件循环(Event Loop)](https://segmentfault.com/a/1190000004322358)
* [js处理异步的几种方式](http://www.cnblogs.com/zuobaiquan01/p/8477322.html) (图解很清晰)

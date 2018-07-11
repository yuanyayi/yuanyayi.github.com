## 什么是DOM？
DOM全称为The Document Object Model，应该理解为是一个**规范**，定义了HTML和XML文档的逻辑结构和文档操作的编程接口。
### DOM到底是对象模型还是编程接口？
总的来说，DOM应该理解为是1个规范。
站在实现（如浏览器）和使用者（如程序员）的角度来看，DOM就是一套文档节点的编程接口，只要实现了接口，就可以使用接口成员来操作文档；站在设计和制定的角度来看，DOM是一个对象模型，它将文档内容建模为对象并组织为树状结构，定义了这些对象的行为和属性以及这些对象之间的关系。
我的理解：当代指DOMTree、DOM节点时，是对象模型；当代指WebAPI、节点方法时，是接口。

## DOM事件
事件是在编程时系统内的发生的动作或者发生的事情，系统通过它来告诉您在您愿意的情况下您可以以某种方式对它做出回应。

## DOM的分级
### 0级DOM
最早期的网页想法很简单：我点击这个节点，这个节点就做它设置好的事情。
将事件监听直接挂在节点上，回调中的this将指向当前的节点。这种方式是我们通常所说的**0级DOM**。
例：
```
<input id="myButton" type="button" value="Press Me" onclick="alert('thanks');" >  
```
##### # Tips：为什么是0级？
DOM级别1于1998年10月1日成为W3C推荐标准。1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。
而在此之前已经形成的、得到广泛应用的事件模型被称为0级。

### 1级DOM：
DOM1级主要定义的是HTML和XML文档的底层结构。 相当于规范化以前大家约定俗成的一些用法。
1级DOM标准中并没有定义事件相关的内容。如果提到1级DOM，当作0级处理。

### 2级DOM
2级DOM中，除了**目标节点**之外，允许**目标的每个祖先节点**也有机会处理那个事件。

#### 2级DOM的事件传播分三个阶段进行：（注：不按顺序！）
1. 在捕获(capturing)阶段，**事件从Document对象沿着文档树向下传播给节点**。如果目标的任何一个祖先**专门**注册了事件监听函数，那么在事件传播的过程中就会运行这些函数。
2. 在**目标节点自身**，直接注册在目标上的适合的事件监听函数将运行。
3. 在冒泡(bubbling)阶段，事件将从**目标元素向上传播回Document对象**（与capturing相反的阶段）。虽然所有事件都受capturing阶段的支配，但并不是所有类型的事件都bubbling。（0级DOM事件模型处理没有capturing阶段）

#### 什么事件才是2级DOM？
2级事件模型中，通过**addEventListener()**这个2级DOM的API注册的函数才有可能在上述事件传播三个阶段中任意一个阶段捕捉到事件的发生（如果用0级DOM的2个方法赋值的事件监听函数不能在capturing阶段捕捉到事件）。
DEMO：[DOM事件分级DEMO](http://js.jirengu.com/robuw)

> ##### addEventListener():
> `target.addEventListener(type, listener, useCapture);`
> 1. type是String，事件类型名，没有前缀on，比如要注册click事件就传入“click”（不是“onclick”）；
> 2. listener是监听函数，在调用的时候js会传给他一个Event对象，这个对象放了有关事件的细节，如果调用的这个对象的stopPropagation()方法，则会阻止事件传播进一步传播（比如在第一个阶段捕捉到事件并运行事件监听函数，其中调用了event。stopPropagation则事件就不会再被传播经历第二第三阶段了） ；
> 3. useCapture是Boolean，true表示事件监听函数能够在三个阶段中的任意一个阶段捕捉到事件（符合2级DOM标准），如果是false就表示事件监听函数不能在capturing阶段捕捉到事件（表现同0级DOM）。
> * **被捕捉的事件在哪里？**
> addEventListener会自动获取一个事件Event，作为第一个参数(e)传给listener函数。Event对象中包括：
>   * type: 发生的事件的类型，例如”click”, “mouseover”
>   * target: 发生事件的节点，可能与 currentTarget 不同
>   * currentTarget: 正在处理事件的节点，如果在 capturing 阶段和冒泡阶段处理事件，这个属性就与 target 属性不同。在事件监听函数中应该用这个属性而不是 this.
>   * stopPropagation(): 可以阻止事件从当前正在处理他的节点传播
>   * preventDefault(): 阻止浏览器执行与事件相关的默认动作，与0级DOM中返回false一样
>   * clientX, clientY: 鼠标相对于浏览器的x坐标y坐标
>   * screenX, screenY: 鼠标相对于显示器左上角的x坐标y坐标

#### 2级DOM中监听函数中的this
通过addEventListener添加的函数中的this，标准中并没有规定this必须指向目标元素， 尽管大多数浏览器都是这么实现的，但最终还是取决于浏览器的实现，我们需要用到目标元素的时候请调用event.currentTarget。
回到刚才那个DEMO，打开控制台，点击一个a试试看：e.currentTarget指向挂载事件监听器的元素，e.target指向激活事件的那个元素。

##### Tips：IE9之前的浏览器……
IE9之前的浏览器不支持addEventListener。有attachEvent方法，但是不支持捕获阶段。
例：
```
document.getElementById("myTest").attachEvent("onclick", function(win){alert(1)});  
```
相当于：
```
document.getElementById("myTest").addEventListener("click", function(event){alert(1)}, false);  
```
另外用attachEvent注册的函数将被作为全局函数调用，而不是作为发生事件的文档元素的方法，也就是说this引用的是window对象，而不是事件的目标元素。
即在上述代码中：`win.event == event`
注意：attachEvent事件还是会冒泡的～

#### 如果不需要这么复杂：
* 中止事件派发：`event.stopPropagation()`
  调用这个方法可以要求事件不在向其他节点派发，但是不影响同一个节点上的其他事件。
  * 在IE中使用：`window.event.cancelBubble = true; `
* 取消事件的默认动作：`event.preventDefault()`
  不进行浏览器默认设置给元素的行为。最常见的例子是<a>，被禁止后将不会再进行页面跳转。
   * 在IE中使用：`window.event.returnValue = false;`

> #### DOM2主要更新内容：
> 1、DOM2级核心（DOM Level 2 Core）：在1级核心的基础上构建，为节点添加了更多方法和属性；
> 2、DOM2级视图（DOM Level 2 Views）：为文档定义了基于样式信息的不同视图；
> 3、DOM2级事件（DOM Level 2 Style）：定义了如何以编程方式来访问和改变CSS样式信息；
> 4、DOM2级遍历和范围（DOM Level 2 Traversal and Range）：引入了遍历DOM文档和选择其特定部分的新接口。
> 5、DOM2级HTML（DOM Level 2 HTML）：在1级HTML基础上构建，添加了更多属性、方法和新接口。
> [HTML DOM Event 对象-W3school](http://www.w3school.com.cn/jsref/dom_obj_event.asp)
> [HTML DOM 事件-菜鸟教程](http://www.runoob.com/jsref/dom-obj-event.html)

### 3级DOM
DOM3级又增加了XPath模块和加载与保存（Load and Save）模块。补充了一些新事件：
* [oninput](http://www.runoob.com/jsref/event-oninput.html)
* [Location](http://www.runoob.com/jsref/event-key-location.html)
* [key](http://www.runoob.com/jsref/event-key-key.html)

### 还有4级？！
是的！W3C标准一直在更新，所以DOM标准也会持续不断的更新，提供更多更好用的API给我们，让我们这些底层菜鸟们编程越来越容易～
* 来自W3C中国的信息：[W3C发布DOM4的正式推荐标准](http://www.chinaw3c.org/archives/1155/)：
2015年11月19日，W3C的[HTML工作组](http://www.w3.org/html/wg/)发布了[文档对象模型（W3C DOM4）](http://www.w3.org/TR/2015/REC-dom-20151119/)的W3C正式推荐标准。DOM定义了一个平台中立的模型，用于处理文档节点树及相关事件。DOM4增加了 Mutation Observers （突变观测器），作为原来 Mutation Events（突变事件）的替代。更多内容，请参阅HTML标准计划，及[英文原文](https://www.w3.org/blog/news/archives/5154?pk_campaign=feed&pk_kwd=w3c-dom4-is-a-w3c-recommendation-2)。
W3C的DOM最新标准文档地址：[http://www.w3.org/TR/dom/](http://www.w3.org/TR/dom/)


***
##### 参考文章：
* [DOM概述-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)
* [EventTarget.addEventListener()-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

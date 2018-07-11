> * px, pt
> * em, rem
> * vw,vh

## 1. px(pixel)像素，pt(point)磅
**px**像素描述了一个屏幕能展示的最小单位。在计算机编程中，像素组成的图像叫位图或光栅图像，像素是光栅图像中最小的物理点。
**pt**是一个专用的印刷单位“磅”，大小为1/72英寸。
可以看到px是个相对值，而pt是个绝对值。
你不可能在实际屏幕上画出低于1px的点。
*补充1：[《像素不是一个小正方形，像素不是一个小正方形，像素不是一个小正方形》from 微软](http://alvyray.com/Memos/CG/Microsoft/6_pixel.pdf)。好玩的事参见[为什么部分街机游戏的画面宽于正常比例？ - Thinkraft的回答 - 知乎](
https://www.zhihu.com/question/40483065/answer/87006216)*
*补充2: 响应式开发DPR了解一下：[响应式网页开发基础：DPR 与 viewport](https://zhuanlan.zhihu.com/p/26131956)*

## 2. em， rem
**em** 是一个相对大小，可以指定到小数点后三位。它相对于**父元素的font-size**。比如说父元素的字体大小为16px，给子元素设定为0.75em，那么子元素的字体大小就是16x0.75=12px。
*为什么叫em？* em指element M，因为英文字母中M可以充满一个字母的空间，所以取大写M作为参照字母。
**rem** 的‘r’是‘root'，即根元素。rem只参照**body**的font-size。
#### 补充：
1. 浏览器的默认字体大小是16px，所以一般1rem=16px。
2. 如果元素自身没有设置字体大小，那么元素自身上的所有属性值如“boder、width、height、padding、margin、line-height”等值，我们都可以按下面的公式来计算
> 1 ÷ **父元素**的font-size × 需要转换的像素值 = em值

3. 如果元素设置了字体大小，那么**字体大小的转换**依旧按第二条公式计算，但此元素的**其他属性**，如“border、width、height、padding、margin、line-height”计算就需要按照下面的公式来计算：
> 1 ÷ **元素自身**的font-size × 需要转换的像素值 = em值

## 3. vw，vh
view-width，view-height是CSS3新引入的单位，根据视窗宽高计算。视窗宽度==100vw，视窗高度==100vh。
“视窗”所指为浏览器内部的可视区域大小，即window.innerWidth/window.innerHeight大小，不包含任务栏标题栏以及底部工具栏的浏览器区域大小。
参看[张鑫旭关于vw、vh的文章](http://www.zhangxinxu.com/wordpress/2012/09/new-viewport-relative-units-vw-vh-vm-vmin/)

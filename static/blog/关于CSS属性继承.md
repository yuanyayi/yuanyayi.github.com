CSS（层叠样式表）是一种样式表语言，用来描述 HTML 或 XML（包括如 SVG、XHTML 之类的 XML 分支语言）文档的呈现。样式是为内容做辅助的。在实际使用中，很多时候我们会默认子元素会使用父元素已经选定的样式，这样既能体现网页的整体性，又可以简化大量的代码。
## CSS属性又可以分为**继承属性(inherited property)**和**非继承属性(reset property)**。
### *!!! 这里的区分是指该属性的 **初始值** 是否取父元素同属性的 **计算值(computed value)** ，不是说该属性不能被继承！！！*
那么按常理，哪些属性我们会希望能一次设置终身有效，哪些属性我们只希望使用一次呢？
* 比如说字体相关属性就是继承属性。一般来说网页的大部分字体都是统一的，除了少部分标题和特殊提示之外，那么当然是继承更好。
* 比如背景属性就是非继承属性。单色还好，假设我们给一个父元素加了棋盘格，子元素如果都继承了这个属性，多写几层子元素页面就没法看了。而且重复设置颜色、图形，虽然显示结果可能一致，但是计算量明显不同。
* 比如边框/轮廓、内外边距都是非继承属性。很明显的，如果这些属性都是继承，我们计算元素位置就会更加复杂了。
* overflow属性为非继承属性（可能防止默认出现多个滚动条）。opacity为非继承属性（但是会造成子元素的颜色计算基准从父元素的opacity值开始。父元素为0.8，子元素为1，实际值为0.8*1=0.8）。
* 弹性盒模型相关属性为非继承属性。
* list-style相关属性均为继承属性。

后面不再赘言，我尽量归结一个大致的原则如下：
## 总结：
1. CSS中存在继承属性和非继承属性，区别是该属性的初始值是否使用父元素同属性的计算值。**非继承属性可以通过指定值为inherit来实现继承。**
2. **继承属性**通常是更体现**网页整体性的属性**，比如字体属性（font），一些文本属性（color，direction，letter-spacing，line-height，text-align...）。
3. 更多的是**非继承属性**。通常会**严重改变布局**的都是非继承属性（flex，float，animation，transition，user-interface，margin，padding，overflow...），用途为**突出显示的属性**属于非继承属性（text-decoraction...），**需要指定元素**的也属于非继承属性（content...）。
4. **一个属性集合可以通过各个属性继承**，没有继承的属性为默认值（例：父元素的background属性可以通过一组 background- *: inherit;来继承），反之亦然（例：父元素的一组 background- *属性可以通过background: inherit;来继承）。
5. 这个原则不是绝对的，且还在调整中。
* [CSS属性继承问题DEMO](http://js.jirengu.com/kulog/7/edit)
* [table属性继承DEMO](http://js.jirengu.com/xoqas/6/edit?html,css,output)
6. 做个补充：有时应该被继承的样式没有表现出来，打开控制台会发现被user agent stylesheet覆盖掉了。user agent stylesheet是由浏览器定义的一套内置样式，不同的浏览器表现会有所不同。可以参看这个问题：[what-is-user-agent-stylesheet from stackoverflow](https://stackoverflow.com/questions/12582624/what-is-user-agent-stylesheet)。目前还没有找到能够直接禁用它的方法，但是可以通过reset.css和normalize.css来重置基本样式。

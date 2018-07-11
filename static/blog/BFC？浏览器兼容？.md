1. BFC 是什么？如何生成 BFC？BFC 有什么作用？举例说明。

    BFC( Block Formatting Context)块级格式化上下文。 它是指一个独立的块级渲染区域，只有Block-level BOX参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。
    CSS2.1中规定满足下列CSS声明之一的元素便会生成BFC。

    *   根元素
    *   float的值不为none
    *   overflow的值不为visible
    *   display的值为inline-block、table-cell、table-caption
    *   position的值为absolute或fixed

    一个BFC会成为一个简单的UI模块，可以被移动到任何位置，并且不会被其他UI影响，亦不会与其他UI冲突。因为BFC的条件是正常文档流内的块级元素，或是清除浮动的父元素，或是脱离文档流的绝对/固定定位。
    另外BFC会造成子元素的margin重叠。属于同一个BFC的两个相邻Box的margin会发生重叠。
***
2. 在什么场景下会出现外边距合并？如何合并？如何不让相邻元素外边距合并？给个父子外边距合并的范例

    MDN文档中的描述：[外边距合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing "null")
    根据文档描述，只有上下外边距才会出现边距合并，在两个值中取大的。三种基本情况：

    1.  相邻兄弟元素之间；
    2.  父元素与其第一个子元素可能合并上边距，与最后一个子元素可能合并下边距；
    3.  空的块级元素自己的上下边距也可以合并。
        三种情况可能会叠加。

    合并规则：

    1.  即使合并值中有0，依然正常计算。所以子元素的margin值可能会溢出到父元素外面。
    2.  所需合并值都为正，则取最大值；
    3.  有正有负，取最大正值减去最大绝对值的负值；
    4.  都为负值，取最大绝对值的负值

    禁止外边距合并的方法：

    1.  改变布局方式，浮动元素和绝对定位元素不会计算外边距；
    2.  父子元素之间，可以添加一个padding（padding: 1px;）或者border（border: 1px solid transparent）；
    3.  空元素需要给一个高度。height、min-height、border、padding或者干脆加进一些内容，都可以撑开这个元素，后面的元素就不会再参加计算了。

    [外边距合并DEMO](http://js.jirengu.com/mejas/ "null")

***
3.  什么是 CSS hack？在哪个网站查看标签(属性)的浏览器兼容情况。

    不同厂商的浏览器、同一浏览器的不同版本、不同时期的浏览器对CSS的解析实现都不完全一样，使得同一套代码会产生不同的效果，与我们的预期结果会有偏差，这时需要对不同的浏览器做特殊的处理，使页面表现尽可能一致。
    对不同的浏览器做专门的CSS处理，这种方式叫做CSS hack。
    查看兼容性的网站：[Can I use](https://caniuse.com/ "null")。这个网站也可以查询一些ECMA标准、js库、原生jsAPI等的兼容情况。

***

4. ie6、7的 hack 写法是？

    属性前缀法(即类内部Hack)：例如 IE6能识别下划线""和星号" "，IE7能识别星号" "，但不能识别下划线""，IE6~IE10都认识"\9"，但firefox前述三个都不能认识
    选择器前缀法(即选择器Hack)
    IE条件注释法(即HTML条件注释Hack)：针对所有IE(注：IE10+已经不再支持条件注释)： <!--[if IE]>IE浏览器显示的内容 <![endif]-->，针对IE6及以下版本：<!--[if lt IE 6]>只在IE6-显示的内容 <![endif]-->。这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效

    .box{
    color: red;
    _color: blue; /*ie6*/
    *color: pink; /*ie67*/
    color: yellow\9; /*ie/edge 6-8*/
    }
    <!–-[if IE 7]>

    <link rel="stylesheet" href="ie7.css" type="text/css" />
    <![endif]–->

***

5. 如下属性，兼容哪些浏览器？

    1.  inline-block: [IE8以上完全支持](https://caniuse.com/#search=inline-block "null")
    2.  min-width/min-height [IE7以上，7、8不支持inherit值](https://caniuse.com/#search=min-height "null")
    3.  :before,:afte: [IE9以上完全支持](https://caniuse.com/#search=%3Aafter "null")
    4.  div:hover [IE7以上完全支持](https://caniuse.com/#search=%3Ahover "null")
    5.  background-size [IE9以上完全支持](https://caniuse.com/#search=background-size "null")
    6.  圆角 [IE9以上完全支持](https://caniuse.com/#search=border-radius "null")
    7.  阴影
        [box-shadow：IE9以上完全支持](https://caniuse.com/#search=box-shadow "null")
        [text-shadow：IE10以上支持，不支持spread](https://caniuse.com/#search=text-shadow "null")
    8.  动画/渐变
        [animation：IE10以上完全支持](https://caniuse.com/#search=animation "null")
        [Gradients：IE10以上支持背景渐变和重复渐变](https://caniuse.com/#search=Gradients "null")

***
6. 渐进增强和优雅降级分别是什么意思？

    **渐进增强**意味着先按照所需要兼容的最低版本的浏览器进行开发，然后逐渐增加一些新的特性满足更高版本浏览器用户的体验。渐进增强开发难度高于优雅降级，这种开发模式可以保证所有用户都可正常使用所有功能，不过用户体验可能低于优雅降级的开发方式。
    **优雅降级**正好相反，先按一般用户使用的浏览器版本进行开发，保证大部分用户的正常使用，然后对低版本的浏览器做一些兼容去兼顾少量低版本用户。优雅降级的开发模式可能导致少部分用户甚至无法正常使用网站的功能，但是开发简单速度快，可以使用新特性，会带来更好的用户体验。

***

7. 以下工具/名词是做什么的？

    *   条件注释
    *   IE Hack
    *   js 能力检测
    *   html5shiv.js
    *   respond.js
    *   css reset
    *   normalize.css
    *   Modernizr
    *   postCSS

    *   条件注释：IE浏览器支持在一段注释中书写代码，并注明适配的浏览器版本，符合版本的浏览器可以运行该注释中的代码，不符合的浏览器会将该部分代码看作是注释。此功能仅对IE浏览器有效。
    *   IE Hack：IE的CSS中有一些bug，输入* - / /9 等等不符合一般CSS标准的符号时，IE可以识别，一般其他的浏览器都不能识别。利用这一特性我们可以针对IE做出一些CSS上的调整。注意IE一直在修复这些问题，有些原来支持IE9或IE10的写法可能不被更高等级的浏览器支持。
    *   js 能力检测：对于不同的浏览器，不检测其版本，而是检测其是否具有需要使用的功能。比如Ajax基于XMLHttpRequest对象，在IE中对应为ActiveXObject，代码中如果判断XMLHttpRequest为undefined不存在，那么后面的请求则使用ActiveXObject对象完成相应功能。
    *   html5shiv.js：用于解决IE9以下版本浏览器对HTML5新增标签不识别，并导致CSS不起作用的问题。利用脚本document.createElement()创建对应的脚本，CSS选择器便可正确应用到该标签。
    *   respond.js：让不支持css3 Media Query的浏览器包括IE6-IE8等其他浏览器支持查询。
    *   css reset：重置样式，清除浏览器默认样式，并配置适合设计的基础样式（强调文本是否大多是粗体、主文字色，主链接色，主字体等）。
    *   normalize.css：使浏览器可以更加一致地呈现所有元素，并符合现代标准。它精确地只针对需要标准化的样式。
    *   Modernizr：是一个 JavaScript 库，用于检测用户浏览器的 HTML5 与 CSS3 特性。Modernizr 使你可以方便地为各种情况编写 JavaScript 和 CSS，无论浏览器是否支持这些特性。这是处理渐进增强的完美方案。
    *   postCSS：使用JS帮助重新生成标准CSS代码，提供功能有批量增加厂商前缀、标准化CSS、支持使用预处理器的CSS写法、提供模拟的CSS命名空间、内置的网格系统。

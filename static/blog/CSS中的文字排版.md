想到什么写什么的总结帖：
1. 段落首行空两格：`text-indent: 2em;`
这个属性直接写长度几乎所有现代浏览器都能支持，但是关键字就不一定了。
[https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-indent](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-indent)
[https://caniuse.com/#search=text-indent](https://caniuse.com/#search=text-indent)

2. 首字大小：`::first-letter { font-size: 130%; }`
相似的伪元素还有：`::first-line`，可以改变第一行的文字效果。

3. 英文大小写：`text-transform: uppercase;`
[https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform)
一般常用的就是uppercase | lowercase，另外none可以禁止改变大小写。

4. 段落之间空行：直接用margin-bottom。

5. 加粗和斜体：不要寄希望于<b>、<i>标签！建议老老实实用span+class，或者可以在css中加一句：
    ```
    p b { font-weight: bolder; }
    p i { font-style: italic; }
    ```
    其实现在i标签一般理解成icon，很有可能样式就会被改写了，所以最好自己固定一下。

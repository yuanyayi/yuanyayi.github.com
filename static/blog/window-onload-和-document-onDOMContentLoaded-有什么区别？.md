## 一、看文档：
* [load-MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/load)
* [DOMContentLoaded-MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)

|  | window.onload| document.onDOMContentLoaded |
| -- | -- | -- |
| 描述 | 当一个资源及其依赖资源已完成加载时，将触发load事件。 | 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而**无需等待**样式表、图像和子框架的完成加载。 |
| 常规-规范 | DOM L3 | HTML5 |
| 常规-接口 | UIEvent | Event |
| 常规-是否冒泡 | 否 | 是 |
| 常规-能否被取消 | 否 | 能 (尽管一个简单的事件被指定为不可取消) |
| 目标 | window | document |
| 默认行为 | 无 | 无 |
| 属性 | target type bubbles cancelable view detail | target type bubbles cancelable |

## 二、实验
### 一个简单的DEMO：[测试onload/onDOMContentLoaded](http://js.jirengu.com/kiwiw/edit?html,console)
1. 实验设计：
给一个HTML文档中加载css、js、和img元素，给每个资源加上一个onload事件，以此判断这些资源是在何时加载完成的。
2. 实验过程：
    #### 实验1：
    * 文件内顺序：css - script.scope - script - img - iframe。
    * 输出：
    > "font-awesome was loaded."
    > "jquery was loaded."
    > "bootstrap was loaded."
    > "DOM fully loaded and parsed"
    > "image was loaded."
    > "baidu was loaded."
    > "All resources finished loading!"

    可以看到，DOMContentLoaded事件会在文档内部的img和iframe加载完成之前就触发了。因为这一事件只涉及初始的HTML文件的信息，而不涉及外部依赖。
    * Tips：如果已有css文件的缓存，刷新时css也有可能会在DOMContentLoaded事件后面才出现。但是script一定会在之前出现，哪怕使用了scope / defer属性。

    #### 实验2：
    * 异步加载脚本：分别使用scope/defer/createElement方式加载新脚本。
    * 输出：
    > "newscript was loaded."
"error"
"TypeError: Cannot read property 'appendChild' of null
    at <anonymous>:14:21
    at http://js.jirengu.com/js/prod/runner-3.25.5.min.js:1:13840
    at http://js.jirengu.com/js/prod/runner-3.25.5.min.js:1:10893"
"jquery was loaded."
"bootstrap was loaded."
"DOM fully loaded and parsed"
"font-awesome was loaded."
"image was loaded."
"baidu was loaded."
"All resources finished loading!"

    可以看到，使用scope/defer方法异步加载的脚本依然会在onDOMContentLoaded触发前完成；但是createElement方式加载的脚本，虽然加载时间还是在onDOMContentLoaded之前，但**却无法直接加到文档中**。这是因为后面的appendChild是一个DOM操作，而此时DOM树还没有渲染完成，找不到对应元素。
  appendChild至少要在onDOMContentLoaded触发后才能进行。

    #### 实验3：
    * 给iframe一个非法地址。
    * 输出：
    > DOM fully loaded and parsed
// 很长很长时间……
"baidu was loaded."
"All resources finished loading!"
    
    可以看到，**样式表、图像和子框架**资源请求无响应时会阻塞window.onload事件，但不会影响document.onDOMContentLoaded事件。因为onDOMContentLoaded只考虑初始的HTML文档。

## 结论：
1. onload事件是DOM事件，onDOMContentLoaded是HTML5事件。
2. onload事件会被**样式表、图像和子框架**阻塞，而onDOMContentLoaded不会。
3. 当加载的脚本内容**并不包含立即执行DOM操作**时，使用onDOMContentLoaded事件是个更好的选择，会比onload事件执行时间更早。

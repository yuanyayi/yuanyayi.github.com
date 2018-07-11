# 作用域
> **作用域**就是变量和函数的可访问范围，控制着变量和函数的可见性与生命周期，在JavaScript中变量的作用域有全局作用域和局部作用域。在JavaScript中，变量的作用域有*全局作用域*和*局部作用域*两种。

显而易见，全局作用域就是大家都可以访问的部分，局部作用域就是只能在固定代码中访问的部分。
另：浏览器中，全局作用域定义的变量都是window对象的一个属性。
更详细的不提了，看文档。

# 作用域链
## 先上定义：
>作用域链决定了哪些数据能被函数访问。当一个函数创建后，它的作用域链会被创建此函数的作用域中可访问的数据对象填充。

## 举个栗子：
* JS的世界中，一个作用域只对自己直接包含的部分负责。而在一个作用域中查不到对应变量时，JS会转而向上寻求帮助，在更高级的、直接包含当前作用域的作用域中查找。
  ```
  var familyFund = 10000

  function Papa () {
    var papaMoney = 1000
    function Son() {
      papaMoney -= 100
      familyFund -= 100
      var sonMoney = 100
    }
    Son()
    console.log(papaMoney)
    console.log(familyFund) 
    console.log(sonMoney)
  }

  Papa()

  // 900
  // 9900
  // ReferenceError: sonMoney is not defined
  ```
  可以看到：直系后裔是可以直接调用祖先中定义的变量的。
* 同样的，JS不会向下查找，也不会向同级查找。
  ```
  var familyFund = 10000

  function Papa() {
    var papaMoney = 1000
  }

  function Uncle() {
    Papa();
    console.log(familyFund)  
    console.log(papaMoney) 
  }

  Uncle()

  // 10000
  // ReferenceError: papaMoney is not defined
  ```
  这里可以很清楚地看到，定义位置同级的函数，**无论调用位置在哪里，不告诉你就是不告诉你[摊手]**
* 然后问题来了：把所有钱的变量名设置成一样的，就能混着用了吗？
  ```
  var money = 10000

  function Papa() {
    var money = 1000
    function Son() {
      console.log('Son: '+money)
    }
    Son();
  }

  function Uncle() {
    console.log('Uncle: '+money)
  }

  Papa()
  Uncle()
  // Son: 1000
  // Uncle: 10000
  ```
  即使变量叫一样的名字，依然不是一样的东西。
  这个就是作用域链。
## 复杂一点……
  还是那句话：这个值不在你的作用域下也不在你的作用域链中，那就是看不到，除非人家写个方法开放出来给你看。
但是如果重复定义了，能不能本来能看的东西再拿出来看？
可以啊，只要能说清楚是哪个就行啦～
```
function Papa() {
  var money = 1000

  function Son() {
    console.log(money)
  }

  function Daughter() {
    var money = 500
    Son()
  }
  return Daughter
}
(Papa())()
// 1000
```
可以看到，Daughter中定义了自己的money是500，然后去调用了Son。Son直属于Papa，而且自己没有money，所以向上查找Papa中有这个值，就拿过来用了。
### 注意！函数作用域与*调用位置无关！*只与*声明位置有关！*
### 注意变量提升：
  如果一个函数运行在这个变量声明之前：
```
function show(){ cosnole.log(abc) }
show()
var abc = 123
```
它实际等同于：
```
var abc = undefined // 变量提升
function show(){ cosnole.log(abc) }
show()
abc = 123
```
所以它会输出`undefined`。这就是为什么我们鼓励将变量声明统一写在函数前面。（好歹不会报错，知足吧～）

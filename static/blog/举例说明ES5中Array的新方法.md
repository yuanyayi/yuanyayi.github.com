* Array.prototype.indexOf()
* Array.prototype.forEach()
* Array.prototype.map()
* Array.prototype.every()
* Array.prototype.some()
* Array.prototype.filter()
* Array.prototype.reduce()55h y t r g

# 1. Array.prototype.indexOf()
```
var arr = ['a','d','e','f','a','s']
// 顺序搜索返回指定元素的位置，找不到时返回-1
console.log(arr.indexOf('a')) // 0（从0开始搜索，非贪婪模式）
console.log(arr.indexOf('a', 4)) // 4（从指定位置向后搜索）
console.log(arr.indexOf('a', -5)) // 4（当位置为负数时，意为从倒数的指定位置开始搜索。搜索方向依然是向后搜索！）
console.log(arr.indexOf('a', -arr.length)) // 0（当位置>=arr.length，倒数超过整个字符串，默认相当于从0开始搜索）
console.log(arr.indexOf('x')) // -1（没有找到要查找的元素，返回-1（不是false！））
```
# 2. Array.prototype.forEach()
```
// 对于每个数组中的值进行一次操作。forEach返回值永远为undefined
var words = ["one", "two", "three", "four", undefined];
console.log('And this function returns: '+words.forEach(function(currentValue, index, array){
    console.log(currentValue+' '+index+' ['+array+']')
})) // undefined（forEach遍历的范围会在第一次调用callback之前确定，调用时对数组作出修改，计算结果会与预想的不同。）
words.forEach(function(word, index, array) {
  console.log(word+' ['+array+']');
  if (word === "two") {
    words.shift();
  }
}); // one two four (因为数组在回调中做出了修改，forEach按照预定下标继续，所以跳过了一个元素。另外，forEach不会对已删除的值或不存在的值进行操作。注意undefined不算不存在的值，会正常参与计算。)
// 仅修改currentValue不会修改数组中的原值
```
规定除非跑出一个异常，否则forEach方法是不能跳出的（break没有用的）。但如果抛出了异常，可能说明这个函数没用对……如果你希望在中间停止，试试for-in语句或者every方法吧。
# 3. Array.prototype.map()
遍历并生成一个新数组：
```
var words = ["one", "two", "three", "four"];
console.log(words.map((value, index, array)=>{
  return value+'-test'
}))
// map返回一个新数组，新数组中的值是原数组中对应的值经过callback计算后得出的返回值。
var newArr = words.map((value, index, array)=>{
  console.log(value +' '+ index+' ['+array+']')
  if(value == 'two'){
    words.shift()
  }
  return value+'-test'
})
console.log(newArr)
console.log('newArr.length = '+newArr.length)
// 同样的，在callback中修改原数组会造成map跳过一些值，但是新数组的长度会与原数组相等，空的地方用empty-item补上。
var a = Array.prototype.map.call("Hello World", function(x) { 
  return x.charCodeAt(0); 
})
console.log(a) // [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```
# 4. Array.prototype.every()
every方法可以判断数组中的值是否都符合一个标准。**如果存在false立刻返回false**，否则返回true。规定空数组返回true，因为没有元素。
```
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough); // false
passed = [12, 54, 18, 130, 44].every(isBigEnough);  // true
passed = [].every(isBigEnough); // true
```
# 5. Array.prototype.some()
与every相反，some方法只要数组中**存在一个符合标准的值即返回true**，否则为false。规定空数组返回false，因为没有元素可以符合标准。
```
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].some(isBigEnough); // true
passed = [2, 5, 8, 3, 4].some(isBigEnough);  // false
passed = [].some(isBigEnough); // false
```
# 6. Array.prototype.filter()
filter可以说是every和some的高级版。every/some只能告诉你数组全部符合条件或是部分符合条件，而filter可以返回符合条件的部分。
```
function isBigEnough(value) {
  return value >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
// ES6 way
const isBigEnough = value => value >= 10;
let [...spread]= [12, 5, 8, 130, 44];
let filtered = spread.filter(isBigEnough);
// filtered is [12, 130, 44]
```

# 7. Array.prototype.reduce()
累加器，将数组中所有的值用callback函数依次计算，最后返回一个确定的值。这个函数主要用法是要求所有元素参与计算，当元素间相互影响时可以使用此函数。
## 语法：
```
arr.reduce(callback[, initialValue])
```
## 参数：
> ### callback
> 执行数组中每个值的函数，包含四个参数：
>  #### 1. accumulator
>  累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
>  #### 2. currentValue
>  数组中正在处理的元素。
>  #### 3. currentIndex - 可选
>  数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
>  #### 4. array - 可选
>  调用reduce的数组
> ### initialValue - 可选
> 用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
## 示例：
```
// 将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5],[6, 7]].reduce(
 ( acc, cur ) => acc.concat(cur)
);
console.log(flattened)
```

* 全文参考：[Array-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

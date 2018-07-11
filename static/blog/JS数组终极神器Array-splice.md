## 语法：
```
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
arr.splice其实是个修改数组的方法。设定从哪里开始改，抹掉的范围，加入的元素。可以发现，配合arr.length，这个方法几乎涵盖了所有数组会有的操作。
### 参数：
* **start**​
指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数）；若只使用start参数而不使用deleteCount、item，如：array.splice(start) ，表示删除[start，end]的元素。
* **deleteCount 可选**
整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
如果deleteCount被省略，则其相当于(arr.length - start)。
* **item1, item2, ... 可选**
要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
splice方法使用deleteCount参数来控制是删除还是添加：
start参数是必须的，表示开始的位置（从0计数），如：start=0从第一个开始；start>= array.length-1表示从最后一个开始。
    **1. 从start位置开始删除[start，end]的元素。**
array.splice(start)
    **2. 从start位置开始删除[start，Count]的元素。**
array.splice(start, deleteCount)    
    **3. 从start位置开始添加item1, item2, ...元素。**
array.splice(start, 0, item1, item2, ...)   


## 用splice方法模拟数组方法：
```
console.log('var arr = [1, 2, 3]');
// ------------------
Array.prototype.splicePush = function (...values) {
  this.splice(this.length, 0, ...values);
  return this.length;
}
var arr = [1, 2, 3];
console.log('arr.splicePush(10, 11, 12) = ' + arr.splicePush(10, 11, 12) + '; arr = [' + arr + ']');
// ------------------
Array.prototype.splicePop = function () {
  var item = this.splice(arr.length-1, 1)[0];
  return item;
}
var arr = [1, 2, 3];
console.log('arr.splicePop() = ' + arr.splicePop() + '; arr = [' + arr + ']');
// ------------------
Array.prototype.spliceShift = function () {
  var item = this.splice(0, 1)[0];
  return item;
}
var arr = [1, 2, 3];
console.log('arr.spliceShift() = ' + arr.spliceShift() + '; arr = [' + arr + ']');
// ------------------
Array.prototype.spliceUnshift = function (...values) {
  values.splice(values.length, 0, ...this);
  this.splice(0, this.length, ...values);
  return values.length;
}
var arr = [1, 2, 3]
console.log('arr.spliceUnshift(10, 11, 12) = ' + arr.spliceUnshift(10, 11, 12) + '; arr = [' + arr + ']')
```

进不去MDN的看这里=>[Array.prototype.splice()--MDN](http://cncc.bingj.com/cache.aspx?q=mdn+splice&d=4835830004450647&mkt=zh-CN&setlang=en-US&w=6zim5NpC-U6XFKjJqsPHf34dNELBGyti)

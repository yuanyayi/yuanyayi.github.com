# mock：
mock测试就是在测试过程中，对于某些不容易构造或者不容易获取的对象，用一个虚拟的对象来创建以便测试的测试方法。
## 什么时候需要mock？
在web 开发流程中，经常是约定接口规范之后，前后端同时进行开发。当前端开发到获取数据的部分时，如果后端还没有提供接口，就需要前端自己提供一个虚拟对象进行开发。
方法很简单：搭一个本地或线上的接口，向这个接口发出请求，接口将返回约定参数格式的假数据。等待后端的接口开发完成之后，就可以转到后端开发的接口上，再进行调试完善。

### 搭建服务器
* 使用http-sever node工具启动一个静态服务器；
* 使用server-mock node工具启动一个能处理静态文件和动态路由的服务器；

### 数据：
可以在指定文件夹通过http-server node启动一个静态服务器，将数据以文件形式保存在里面。请求时直接请求这个文件，将会返回文件的内容。
```
// index.html
var xhr = new XMLHttpRequest;
xhr.open('GET', '/cate.json', true);
xhr.send();
xhr.onload = function() {
  console.log(JSON.parse(xhr.reponseText))
}
```
```
// cate.json
{
  status: 0,
  data: ['90后', '80后', '清晨', '工作']
}
```

## 现有的mock工具：
easy-mock.js
阿里RAP工具

### easy-mock

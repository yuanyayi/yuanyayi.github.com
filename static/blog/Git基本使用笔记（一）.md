（本文全文参考[廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)）
## Git是做什么用的？

> Git(读音为/gɪt/)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。
> 
> ————百度百科

是否感觉上面的说明让人雾里看花似懂非懂踏雪无痕？

其实Git主要用途就是：
1\. 保存每一次修改，让你不止在文件中，也可以在项目里Ctrl+Z；
2\. 允许你用多种方式写同一段代码（branch分支），然后从中挑一个最好的留下；
3\. 允许很多人帮你写同一个项目的不同部分，然后合并大家的工作，而且不影响线上正常的项目。
我用的Mac所以后面的命令默认为Mac系统。（PS：Windows墙裂建议装个TortoiseGit走图形化界面否则自求多福吧哈哈哈）

## 安装Git

1\. 一般Linux系统可以通过命令行安装，可以先在命令行中输入*git*试试，有的系统会提供安装命令；
2\. Linux系统和Windows系统都可以去官网下载对应的安装文件进行安装；
3\. Mac系统建议直接去AppStore安装XCode，会自动附带Git。

安装完成可以用 *git --version *查看安装的版本。
安装完成后，Linux/Mac直接在命令行里输入 *git *就进入Git了，windows则需要打开Git Bash。
安装完成后，还需要全局设置用户名及邮件地址，相当于自报家门：
> $ git config --global user.name"Your Name"
> $ git config --global user.email"email@example.com"

## 使用Git

### 1\. 创建仓库
Git是存储代码的方式，所以首先要指定一个文件夹（repository仓库）作为储存的目标。
在指定的文件夹打开命令行，输入：
> $ git init
就创建好了一个仓库。
在这个仓库里会默认创建一些记录，比如.git目录（如果没有可能是系统文件被隐藏了），这个目录相当于是这个仓库的身份证明和库存记录，务必不要直接修改，否则这个仓库的记录就全乱了。

### 2\. 向仓库提交文件
向git提交新增文件或变更分为两步：
  1. 告知git哪些文件需要提交（add）：
> $ git add <filename | .>
这句命令没有反馈。如果filename写个‘.’那么就是全部变更和新增。
  2. 正式入库（commit）：
> $ git commit -m <Massages of this Commit>

### 3\. 查看修改状态：
写好一段代码之后，回来看Git。比如说，我修改了文件，然后忘记自己都改过什么了怎么办？让Git给我们查一下那些文件有变化：
> $ git status
如果出现**Changes not staged for commit**字样，说明下面提到的文件与上一版本有区别，不过还没有被提交。那么如何提交呢？git add 和 git commit 嘛。
如果知道这个文件有改动，但是不知道改了什么：
> $ git diff <filename>

## Git的后悔药

### 1.版本控制
我们为什么要用Git？因为它给我们提供了后悔药。那么怎么使用这个后悔药呢？
先看看到底哪些操作是我希望Ctrl+Z的？打印下仓库记录看看（日志log）：
> $ git log [--pretty=oneline]
后面的方括号里的pretty参数是可选的，控制显示格式的。
好了我决定回退了：
> $ git reset--hard HEAD[^(...n) | ~n]
同样，方括号里的东西拿出来，回退几个版本就写几个‘^’，要是数字太大就写成‘~n’。
一不留神退过了怎么办？上面 *git log *时有显示的commit都是有一串莫名其妙编号的，找到还想要的最新commit的编号，然后：
> $ git reset --hard <commitcode>
（补充：其实这是一个移动current指针的过程，并不是真的删除文件。）

### 2\. 多余的commit
改个边框commit，改个字体commit，改个背景又commit……一个组件写完，却可能提交了很多个commit，看着不整齐，以后也不好找。Git也允许你合并多个commit并重写message，这样提交记录会更有条理：
> $ git rebase -i HEAD~n
n是需要合并的commit数量。如果要合并的commit提交的比较早了？参看[「Git」合并多个 Commit](https://www.jianshu.com/p/964de879904a)。

### 3\. 删除和回复文件
Git监测到仓库里有文件被删除时，*git status*是可以检测到的，这时候也可以用下面的命令彻底将文件从版本库中删除：
> $ git rm <filename>
> $ git commit -m <message of this commit>
当然如果删错了，也能找回来：
> $ git checkout -- <filename>

*下一篇总结Git中最强大的Branch用法：*

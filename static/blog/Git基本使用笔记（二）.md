（本文全文参考[廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)）
## 小王牌：branch
### 1. 基本branch操作
Git可以让项目进行多人协作！可以让别人给你修Bug！可以暂停开发先修Bug！怎么做到的呢？这就是分支功能。
一个分支就是一个相对独立的开发空间。我们可以自己相对独立的进行开发测试，再将测试合格后的代码合并到发布的项目中去。

创建并切换至新分支：
> $ git branch <branchname>
> $ git checkout <newbranch>

这个命令可以简化为：
> $ git checkout -b <branchname>

然后查看下项目的分支：
> $ git branch

这个命令会列出所有的分支，当前分支前有个‘*’号
在这个分支下，可以正常的进行开发、提交等Git操作。也可以用 **git checkout master** 命令回到master分支上。
开发测试完成后，需要将这部分代码合并到正式的代码中：
> $ git merge <branchname>

这句代码，要站在保留分支上，输入被合并分支的名字，搞不清状况的用 **git branch** 看一下。
如果想删除dev分支：
> $ git branch -d <branchname>

### 2. 冲突处理
Git允许项目分支各自相对独立进行开发，那么就可能一行代码两边都进行了修改，这时merge就会产生冲突（conflict），会报个错：**CONFLICT (content)**告诉你哪个文件出了问题。用**git status**也可以。
怎么处理冲突呢？只能选一个呗。
* 如果使用了Git图形化界面（比如TortoiseGit）这时会给你一个大对比窗口，告诉你哪段代码左边怎么写的右边怎么写的，让你选一个。
* 没有的话就手动吧TOT。

然后重新commit就好了。
可以检查下自己到底做了些什么：
> $ git log --graph --pretty=oneline --abbrev-commit

* Git鼓励使用Branch，相对独立的开发环境，可追溯可回滚的过程可以最大限度理清开发思路，便于复盘。还可以帮助程序员解决“老板删除代码诬告离职程序员”的问题……毕竟只要不删除仓库回滚一下就可以了嘛，配合GitHub使用更佳～
一般开发策略：只有可以正式上线测试使用的代码才可以合并到master，其他代码建议用自己的分支各自独立处理。

## 大王牌：远程仓库
多人协作或多功能分别开发，当然要将项目存在一个无论何时参加者均可自主访问的地方，将项目存储在网络上当然是首选。
### 情景1: 构建一个本地仓库后上传至网络
1. 在远程创建一个仓库，获取一个网络地址。此处用GitHub做例子：
> <git@github.com>:<username>/<repository-name>.git

这里可以使用全局的用户名，也有可能会要求输入用户名和密码。
2. 关联仓库：
> $ git remote add origin <git@github.com>:<username>/<repository-name>.git
3. 推送分支：
> $ git push -u origin master

其中的‘-u’第一次用过，以后Git就会自动关联，不用再输入了。
> $ git push origin master

* 注：origin master是远程仓库上的那个master的别名，具体参见 [What is “origin” in Git?](https://stackoverflow.com/questions/9529497/what-is-origin-in-git)

### 情景2:克隆已经存在的仓库
1. 获取地址
每个仓库都有自己的地址，只要拿到这个地址进入下一步就好啦。Git支持多种协议，比如https协议，常用且最快的是通过ssh支持的git协议。
2. 克隆项目
> $ git clone <git@github.com>:<username>/<repository-name>.git

### 情景3: 远程冲突：
基本解决思路：从远程拿回最新代码，在本地解决冲突，再次上传。
> $ git pull

* 如果git pull提示*“no tracking information”*，则说明本地分支和远程分支的链接关系没有创建，用命令**git branch --set-upstream branch-name origin/branch-name**。
然后本地解决冲突，commit+push上去就好了。

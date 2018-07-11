Git是目前最喜闻乐见的版本管理器，其最大的优势就是可以保存项目各个版本历史状态，帮你保留开发中的复活点，在你出错时给你一帖后悔药。
下面简单介绍一下两种常用后悔药的服用方法：
* Reset
* Revert
***
## Reset命令
附上Git文档reset部分说明->[传送门](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86#r_git_reset)

Git文档里对于reset是这样定义的：
> git-reset - Reset current HEAD to the specified state
> 重置头指针到指定的状态。

### 简单说：
1. git reset --soft HEAD~
    * 头指针往回移动一格，取消上次的commit操作；
    * 上次add过的文件不变，依然存储在暂存区；
    * 本地仓库里的代码不变；
    * **要取消这次reset，直接commit就可以了。**
2. git reset --mixed HEAD~
    * 头指针往回移动一格，取消上次的commit操作；
    * 上次add过的文件被清空；
    * 本地仓库里的代码不变；
    * **要取消这次reset，需要add+commit才可以。**
3. git reset --hard HEAD~
    * 头指针往回移动一格，取消上次的commit操作；
    * 上次add过的文件被清空；
    * 本地仓库里的代码也被完全重置，刚才写的都不算了；
    * **要取消这次reset：不好意思没可能的，所有被回退的代码都被删除了TOT**

### 还有一些选项：
* 可以指定重置的文件，其他文件不受影响：
    > $ git reset <filename>
* 也可以在横向指定文件的同时，也纵向指定提交的版本：
    > $ git reset <commit_id> <filename>

    commit_id自己用git log去查吧
* 可以在reset 后面增加 **-q** 选项静默重置，没有错误将不会返回输出。
* 可以追加提交：
    改动一大堆代码并提交后，发现少了个冒号导致代码出错？请使用**git reset --soft + add + commit**，这将只记录一次提交，没有人会发现曾经少过一个冒号……
* reset commit搞不清项目状态了？请使用**$ git status**查看。
***
## Revert命令
reset命令会重写历史。这里有一个问题：如果我的提交已经给其他人看过并pull走了，然后我发现需要进行修改，怎么办呢？
Git也提供了revert命令来解决这个问题。Git revert并不是删除原来的commit，所以也不会更改历史。但是如果将文档树理解成一个链表，那么revert并不是一路向下增加commit，而是做了一个新的分支出来。
* 这是一个有三个commit的仓库
> localhost:revert yuanyayi$ git log --oneline
> 1efa57e (HEAD -> master) commit3
> 2b07c99 commit2
> dc1b2da commit1
> ***
> localhost:revert yuanyayi$ git status
> On branch master
> nothing to commit, working tree clean

* 回滚：
> $ git revert HEAD

* 进入vim编辑器。**i**：修改说明，**:q**：退出
可以看到返回已修改的说明：
> [master 2fdb4dc] Revert "commit3"
>  1 file changed, 1 insertion(+), 2 deletions(-)

* 在打印一下日志看看：
> localhost:revert yuanyayi$ git log --oneline
> 2fdb4dc (HEAD -> master) Revert "commit3"
> 1efa57e commit3
> 2b07c99 commit2
> dc1b2da commit1
> ***
> localhost:revert yuanyayi$ git status
> On branch master
> nothing to commit, working tree clean

可以看到，原来的commit都没有变动，不过又增加了一个反向的commit。
如果有冲突，需要手动处理完之后add+commit一下。但是不会保存这次commit时输入的信息。

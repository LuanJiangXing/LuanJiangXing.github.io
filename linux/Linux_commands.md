# 通用命令

cd 文件夹名

进入文件夹

cd ..

回到上一层，.. 即表示上一层目录/.表示当前目录，这可以在ll中看到

cd ~

回到home目录

ls

查看当前目录下有什么东西

ls -a

显示全部包括隐藏，如.git

ll(ls -l)

具体查看

tree

当前目录文件树状查看

cat 文件夹名

直接打印某文件内容

file 文件夹名

查看某文件性质

mv 路径A下的文件名 路径B

移动

一般需要提供很具体的路径 尤其是移动到与当前不相干的地方

举例

mv ~Downloads/bomb.tar ~/Desktop/mycode

mv 文件名字 文件新名字

改名

一次移动多个文件到一个地方

mv file1 file2 file3 ~/Desktop

cp

复制

man

手册

### Vim

Vim 文件名

使用vim文本编辑器打开文件

i（insert）

出现insert可开始编辑

输入/搜索

得到第一个答案后先点enter

再点n看下一个 N看上一个

gg去top GG去bottom

ctrl D down 向下滚动半屏 ctrl U up 向上滚动半屏

ctrl F forward 向下滚动整屏 ctrl B backward 向上滚动整屏

ESC

退回到只读页面

:wq

保存并推出

:q!

不保存退出

# 通用快捷键

tab

一键补全

上下箭头

选择之前输入过的命令

Ctrl alt T

出terminal

Ctrl shift +

放大界面

ctrl shift c/v

复制粘贴

ctrl c

在命令行内为强制终止当前操作

ctrl l

刷新界面

Firefox about:config

放大

在一些不兼容上下箭头移动的窗口内，如tmux，可能可以使用：

ctrl B 【 来用上下键移动

# 其他常用命令

### 安装外部文件

通常可以使用

sudo apt install 文件名

sudo本身是以管理员身份运行

apt 下载器 依赖管理器 一键下载所有依赖库

install 安装

### Git

git init -b main

-b的意思是--initial-branch，由于git默认初始分支是master，需要改为main，实际上git branch -m main也可以但这样就在初始化的时候一次性搞定了

git config user.name

git config user.email 这里一般不会使用真实email提交 可以使用github提供的映射email

形如 xxxxxxxxx+username@users.noreply.github.com

git clone xxx.git

git remote add upstream xxx.git

添加某仓库为上游

git pull upstream master 获取新作业

git add . 将当前目录（.）下的所有发生变化的文件放进暂存区

git add -A 将仓库所有改动都放进暂存区，-A意为all，如果这个命令是在根目录敲，那和git add . 效果应当是一致的

git status 查看提交状态

git commit -m "xxx"

提交到本地仓库，-m是留言

这两步做完后依然在本地

git push -u origin main 第一次-u，意为--set-upstream，相当于记住，后面直接git push即可

推送到远程仓库

git log --oneline -x

看commit记录，最近几条

git ls-files

输出已被git跟踪的文件路径

### Curl

下载

1、如何下载

curl -L

允许重定向的下载 常用于github等下载

2、下载后

-o output

自己命名

-O

用原来的名字

### 解压缩

tar -xvf bomb.tar

tar -zxvf bomb.tar.gz

unzip xxx.zip

### 压缩

tar -zcvf

zip xxx.zip
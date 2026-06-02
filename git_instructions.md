# Git 核心通关与问题排查指南

## 一、 初始化与远程仓库绑定

当你本地是一个纯纯的空白文件夹，或者找不到 Git 环境时：

### 1. 本地初始化

```bash
git init
git branch -M main  # 强制将默认分支规范命名为 main

```

### 2. 关联远程仓库

```bash
git remote add origin <你的GitHub仓库URL>

```

* **检查绑定状态**：`git remote -v`
* **如果是修改/覆盖现有的远程绑定**：`git remote set-url origin <你的新URL>`

---

## 二、 经典报错与解决方案

### 1. 报错：`fatal: not a valid remote name`

* **原因**：在执行 `push` 等操作时，把 **仓库名字**（如 `origin`）和 **仓库URL**（如 `https://...`）的输入顺序填反了。
* **解决**：当系统提示输入远程名称时，务必先填 **`origin`**，随后再根据提示输入 URL。

### 2. 报错：`fatal: unable to access '...': Failed to connect to github.com port 443 via 127.0.0.1...`

* **原因**：本地 Git 错配了已经关闭或失效的本地网络代理通道（127.0.0.1）。
* **解决**（彻底拔掉 Git 代理直连）：
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy

```



### 3. 报错：`remote: Your account is suspended. / error: 403`

* **原因**：电脑底层（Windows 凭据管理器/Mac 钥匙串）死死记住了曾经被封禁的**旧 GitHub 账号凭据**，导致新账号无法写入。
* **解决**：
1. 打开 Windows 搜索框输入 **“凭据管理器”** -> **“Windows 凭据”**。
2. 找到所有包含 `git:https://github.com` 或 `github.com` 的记录并**删除**。
3. 回到终端重新 `git push`，在弹出的全新登录框中通过浏览器重新授权新账号。



### 4. 报错：`error: src refspec main/master does not match any`

* **原因**：本地仓库是一片空白，**连一次正式的 Commit（提交记录）都没有**。此时主分支在底层属于“幽灵分支”，无法被推送。
* **解决**（必须先本地存盘）：
```bash
git add .
git commit -m "initial commit"
git push -u origin main

```



### 5. 报错：`error: RPC failed; curl 55 Send failure: Connection was reset`

* **原因**：仓库体积较大（包含大量附件/静态资源），国内直连 GitHub 慢，且 Git 默认的 HTTP 缓存区太小导致超时被服务器掐断。
* **解决**（放大 Git 缓存区）：
```bash
git config --global http.postBuffer 524288000  # 调整为 500MB
git config --global core.compression 0          # 降低传输压缩率提高稳定性

```



---

## 三、 代码冲突（Merge Conflict）处理流程

当执行 `git pull` 或 `git push` 提示 `! [rejected] (non-fast-forward)`，说明云端有新提交，本地需要先拉取合并。

### 1. 强行拉取云端历史

```bash
git pull origin main --allow-unrelated-histories

```

### 2. 检查哪些文件冲突了

```bash
git status
# 寻找红色的、标记为 `both added:` 或 `both modified:` 的文件路径

```

### 3. 去掉冲突标记

打开冲突文件，寻找 Git 注入的冲突轨道：

```text
<<<<<<< HEAD
这里是你本地电脑上写的最新内容（保留你需要的）
=======
这里是 GitHub 远程仓库里的内容（删掉不需要的）
>>>>>>> 一长串哈希值

```

* **解决**：人工肉眼判定内容，**必须彻底删掉 `<<<<<<<`, `=======`, `>>>>>>>` 这三行符号线**，保存文件。
* **特殊注意**：`.obsidian/` 或 `.vitepress/` 等以 `.` 开头的隐藏文件夹内的文件冲突，若在 Obsidian 内看不到，直接去系统的文件资源管理器中（开启“显示隐藏项目”）用记事本打开修改。

### 4. 告诉 Git 冲突已搞定并推送

```bash
git add .                  # 核心：这一步代表向 Git 发出“冲突已解决”的信号
git commit -m "fix: resolve all merge conflicts"
git push -u origin main

```

---

## 四、 多设备分布式同步（本地 PC ↔ 云端 Ubuntu）黄金法则

为了让两台设备共享同一个 GitHub 仓库且永远不打架，请死守以下工作流原则：

> **核心原则：先拉后写，写完就推。**

```
[本地电脑 PC] (写完 PUSH)  ──>  [GitHub 仓库]  ──>  (写前 PULL) [云端 Ubuntu]
[本地电脑 PC] (写前 PULL)  <──  [GitHub 仓库]  <──  (写完 PUSH) [云端 Ubuntu]

```

1. **动笔写笔记前**：不管在电脑还是云端，先执行 `git pull origin main`，确保拿到最新版本。
2. **写完笔记后**：立即执行 `git add .` -> `git commit` -> `git push origin main`（或依靠 Obsidian Git 插件的定时自动备份），绝不把未提交的干净代码留到第二天。
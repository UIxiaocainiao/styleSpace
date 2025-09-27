# StyleSpace

一个支持 ReactBits 动画示例、暗色风格、响应式导航（72px 高度）的 React + Vite + Tailwind 项目模板。

已集成 shadcn/ui（Tailwind 设计令牌 + 动画插件 + 示例 Button 组件）。

## 本地运行


## 代码托管到 GitHub

### 1. 初始化 Git 仓库

```bash
git init
```

### 2. 添加所有文件到暂存区

```bash
git add .
```

### 3. 提交代码

```bash
git commit -m "Initial commit: StyleSpace project setup"
```

### 4. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击 "New repository"
3. 输入仓库名称（如：`styleSpace`）
4. 选择 Public 或 Private
5. 不要勾选 "Add a README file"（因为已有）
6. 点击 "Create repository"

### 5. 连接本地仓库到 GitHub

```bash
git remote add origin https://github.com/你的用户名/styleSpace.git
```

### 6. 推送到 GitHub

```bash
git push -u origin main
```

### 后续更新代码

```bash
# 添加修改的文件
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 GitHub
git push
```

## 技术栈

- React 18 + Vite
- React Router（页面跳转）
- Tailwind CSS（暗色 UI）
- Framer Motion（动效基础，兼容 ReactBits 示例）
- shadcn/ui（设计令牌与组件范式）

## 目录结构

- `src/components/Navbar.tsx` 顶部导航，高度 72px，PC/移动自适应
- `src/pages/Home.tsx` 首页，示例动效（磁吸按钮、Marquee）
- `src/pages/Photography.tsx` 摄影页面，滚动进入与悬停动效
- `src/pages/About.tsx` 关于页面
  - 示例引入 `shadcn/ui` 的 `<Button />`

## shadcn/ui 使用

- 设计令牌与动画：
  - Tailwind 配置：`tailwind.config.cjs`
  - 全局 CSS 变量：`src/index.css`（`@layer base` 中的 `:root` 与 `.dark`）
  - 插件：`tailwindcss-animate`
- 工具函数：`src/lib/utils.ts`（`cn()` 合并类名）
- 组件示例：`src/components/ui/button.tsx`

添加更多组件（需网络）：

```bash
npx shadcn@latest add accordion avatar badge card dialog dropdown-menu input label select switch textarea toast tooltip
```

或参考组件源码手动添加到 `src/components/ui/`。

## 打包部署

### 生产环境打包

```bash
npm run build
```

打包后的文件会生成在 `dist` 目录中，可以直接部署到静态服务器。

### 预览打包结果

```bash
npm run preview
```

本地预览打包后的生产版本。

### 部署到服务器

1. 执行打包命令：
```bash
npm run build
```

2. 将 `dist` 目录中的所有文件上传到服务器
3. 配置服务器指向 `index.html` 作为入口文件

## 使用 ReactBits 代码

ReactBits 上的组件普遍基于 Tailwind + Framer Motion。本模板已内置这两者，
你可以直接将 ReactBits 的代码片段复制到 `src/components` 或页面中使用。





## 终端常用命令

### 目录操作

```bash
# 切换目录
cd <目录名>                 # 进入指定目录
cd ..                      # 返回上一级目录
cd ../..                   # 返回上两级目录
cd ~                       # 返回用户主目录
cd /                       # 返回根目录
cd -                       # 返回上一个目录

# 查看当前目录
pwd                        # 显示当前工作目录

# 列出目录内容
ls                         # 列出当前目录文件
ls -l                      # 详细列表显示
ls -a                      # 显示隐藏文件
ls -la                     # 详细列表显示包含隐藏文件
ls -h                      # 人类可读的文件大小

# 创建目录
mkdir <目录名>             # 创建目录
mkdir -p <路径>            # 创建多级目录

# 删除目录
rmdir <目录名>             # 删除空目录
rm -rf <目录名>            # 强制删除目录及其内容（谨慎使用）

# 复制和移动
cp <源文件> <目标位置>      # 复制文件
cp -r <源目录> <目标位置>   # 复制目录
mv <源文件> <目标位置>      # 移动/重命名文件
mv <源目录> <目标位置>      # 移动/重命名目录
```

### 文件操作

```bash
# 查看文件内容
cat <文件名>               # 显示文件内容
less <文件名>              # 分页查看文件内容
head <文件名>              # 显示文件前10行
tail <文件名>              # 显示文件后10行
tail -f <文件名>           # 实时查看文件变化

# 创建和编辑文件
touch <文件名>             # 创建空文件
nano <文件名>              # 使用nano编辑器
vim <文件名>               # 使用vim编辑器

# 删除文件
rm <文件名>                # 删除文件
rm -f <文件名>             # 强制删除文件
rm -rf <目录名>            # 强制删除目录（谨慎使用）

# 查找文件
find . -name "<文件名>"     # 在当前目录查找文件
find / -name "<文件名>"     # 在根目录查找文件
locate <文件名>             # 快速查找文件（需要先更新数据库）
```

### 系统信息

```bash
# 查看系统信息
whoami                     # 显示当前用户名
uname -a                   # 显示系统信息
df -h                      # 显示磁盘使用情况
free -h                    # 显示内存使用情况
ps aux                     # 显示所有进程
top                        # 实时显示进程信息

# 网络相关
ping <网址>                # 测试网络连接
curl <网址>                # 下载网页内容
wget <网址>                # 下载文件
```

## Git 常用命令

### 基础操作

```bash
# 初始化仓库
git init

# 查看状态
git status

# 添加文件到暂存区
git add .                    # 添加所有文件
git add <文件名>             # 添加指定文件

# 提交更改
git commit -m "提交信息"

# 查看提交历史
git log
git log --oneline           # 简洁显示
```

### 远程仓库操作

```bash
# 添加远程仓库
git remote add origin <仓库地址>

# 查看远程仓库
git remote -v

# 推送到远程仓库
git push origin main        # 推送到 main 分支
git push -u origin main     # 设置上游分支并推送

# 从远程仓库拉取
git pull origin main
git fetch origin            # 只获取不合并
```

### 分支操作

```bash
# 查看分支
git branch                  # 本地分支
git branch -r               # 远程分支
git branch -a               # 所有分支

# 创建分支
git branch <分支名>
git checkout -b <分支名>    # 创建并切换

# 切换分支
git checkout <分支名>
git switch <分支名>         # 新版本命令

# 合并分支
git merge <分支名>

# 删除分支
git branch -d <分支名>      # 删除本地分支
git push origin --delete <分支名>  # 删除远程分支
```

### 撤销操作

```bash
# 撤销工作区修改
git checkout -- <文件名>
git restore <文件名>        # 新版本命令

# 撤销暂存区
git reset HEAD <文件名>
git restore --staged <文件名>  # 新版本命令

# 撤销提交
git reset --soft HEAD~1     # 撤销提交，保留修改
git reset --hard HEAD~1     # 撤销提交，丢弃修改

# 修改最后一次提交
git commit --amend
```

### 标签操作

```bash
# 创建标签
git tag <标签名>
git tag -a <标签名> -m "标签说明"

# 推送标签
git push origin <标签名>
git push origin --tags      # 推送所有标签

# 删除标签
git tag -d <标签名>
git push origin --delete <标签名>
```

### 其他常用命令

```bash
# 查看差异
git diff                   # 工作区与暂存区差异
git diff --cached          # 暂存区与仓库差异
git diff HEAD              # 工作区与仓库差异

# 暂存当前修改
git stash                  # 暂存修改
git stash pop              # 恢复暂存
git stash list             # 查看暂存列表

# 查看文件历史
git log --follow <文件名>
git blame <文件名>         # 查看每行代码的作者

# 清理
git clean -fd              # 删除未跟踪的文件和目录
```

# resume

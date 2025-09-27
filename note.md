# 1. 拉取远端项目
- 打开一个命令行工具
```
cd ~
mkdir workspace
```
- 拉取远端项目
```
git clone git@github.com:UIxiaocainiao/resume.git
```
- 你本地就有一个目录叫做 resume

- 当你修改了动东西之后
```
git status # 查看仓库中的文件追踪信息
git add . # 将当前目录下的所有文件都使用 git 进行追踪
git commit -m "change somethings" # 在 git 版本管理中添加关于本次修改的信息
git push origin main # 推送到远端git仓库的 main 分支
```

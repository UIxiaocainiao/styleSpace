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





# resume

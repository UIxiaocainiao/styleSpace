# 七牛云图片API使用指南

本指南将帮助您使用API从 `https://www.pengshz.cn/images/` 文件夹加载和显示图片。

## 🚀 快速开始

### 1. 启动后端服务

```bash
# 使用测试脚本（推荐）
./start-images-test.sh

# 或手动启动
cd backend
npm install
npm run dev
```

### 2. 测试API连接

打开浏览器访问：http://localhost:3000/health

应该看到：
```json
{
  "success": true,
  "message": "API服务运行正常",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

### 3. 测试图片API

```bash
# 获取图片列表
curl "http://localhost:3000/api/images?page=1&pageSize=5"

# 按分类筛选
curl "http://localhost:3000/api/images?category=自然&page=1&pageSize=3"
```

### 4. 使用测试页面

在浏览器中打开 `test-images.html` 文件，可以可视化测试图片加载功能。

## 📚 API接口文档

### 基础信息

- **基础URL**: `http://localhost:3000/api`
- **图片域名**: `https://www.pengshz.cn/images/`
- **内容类型**: `application/json`

### 接口列表

#### 1. 获取图片列表

**请求**
```
GET /api/images?page=1&pageSize=12&category=全部
```

**参数**
- `page`: 页码，从1开始，默认1
- `pageSize`: 每页数量，默认12，最大100
- `category`: 分类筛选，可选：全部、城市、自然、人像、街头、建筑、抽象、黑白、微距、航拍

**响应**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "图片标题",
      "category": "自然",
      "image": "image1.jpg",
      "author": "摄影师",
      "likes": 120,
      "downloads": 45,
      "views": 1200,
      "tags": ["自然", "摄影"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "pageSize": 12,
  "hasMore": true
}
```

#### 2. 获取单个图片信息

**请求**
```
GET /api/images/:filename
```

**响应**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "图片标题",
    "category": "自然",
    "image": "image1.jpg",
    "author": "摄影师",
    "likes": 0,
    "downloads": 0,
    "views": 0,
    "tags": ["摄影"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🖼️ 图片URL生成

### 前端配置

在 `src/config/qiniu.ts` 中：

```typescript
export const QINIU_CONFIG = {
  domain: 'https://www.pengshz.cn',
  imagePath: 'images',
  // ... 其他配置
};
```

### 图片URL格式

- **缩略图**: `https://www.pengshz.cn/images/filename.jpg?imageView2/2/w/400/h/600/q/75`
- **原图**: `https://www.pengshz.cn/images/filename.jpg?imageView2/0/q/90`
- **中等尺寸**: `https://www.pengshz.cn/images/filename.jpg?imageView2/2/w/800/h/1200/q/85`

### 使用示例

```typescript
import { generateQiniuImageUrl, getImageUrls } from '../config/qiniu';

// 生成缩略图URL
const thumbnailUrl = generateQiniuImageUrl('image1.jpg');

// 获取不同尺寸的URL
const urls = getImageUrls('image1.jpg');
console.log(urls.thumbnail); // 缩略图
console.log(urls.medium);    // 中等尺寸
console.log(urls.original);  // 原图
```

## 🔧 前端集成

### 1. 修改Photography.tsx

前端已经自动配置为使用新的图片API：

```typescript
// 使用新的images API接口
const response = await fetch(`${QINIU_CONFIG.apiBaseUrl}/images?${params}`);
```

### 2. 图片显示

图片会自动从 `https://www.pengshz.cn/images/` 加载：

```typescript
// 图片URL会自动生成为：
// https://www.pengshz.cn/images/filename.jpg?imageView2/2/w/400/h/600/q/75
<LazyImage
  src={item.image}
  alt={item.title}
  className="w-full h-auto object-cover cursor-pointer"
/>
```

## 🧪 测试和调试

### 1. 使用测试页面

打开 `test-images.html` 文件，可以：
- 测试API连接
- 查看图片列表
- 测试分类筛选
- 测试分页功能

### 2. 使用curl测试

```bash
# 测试健康检查
curl http://localhost:3000/health

# 测试图片列表
curl "http://localhost:3000/api/images?page=1&pageSize=5"

# 测试分类筛选
curl "http://localhost:3000/api/images?category=自然&page=1&pageSize=3"
```

### 3. 浏览器开发者工具

1. 打开浏览器开发者工具 (F12)
2. 查看Network标签页
3. 观察API请求和响应
4. 检查图片加载状态

## 🚨 故障排除

### 常见问题

1. **API连接失败**
   - 检查后端服务是否运行：`curl http://localhost:3000/health`
   - 检查端口是否被占用：`netstat -tulpn | grep :3000`

2. **图片加载失败**
   - 检查七牛云配置是否正确
   - 确认图片文件存在于 `https://www.pengshz.cn/images/` 目录
   - 检查网络连接

3. **分类筛选不工作**
   - 检查分类名称是否正确
   - 查看API响应中的分类数据

4. **分页问题**
   - 检查page和pageSize参数
   - 确认total数量是否正确

### 调试步骤

1. **检查后端日志**
   ```bash
   cd backend
   npm run dev
   # 查看控制台输出
   ```

2. **检查API响应**
   ```bash
   curl -v "http://localhost:3000/api/images?page=1&pageSize=5"
   ```

3. **检查图片URL**
   - 在浏览器中直接访问图片URL
   - 确认图片可以正常显示

## 📝 注意事项

1. **图片格式**: 支持 JPG、JPEG、PNG、WebP、GIF
2. **文件大小**: 建议单张图片不超过10MB
3. **命名规范**: 建议使用英文和数字命名图片文件
4. **分类规则**: 系统会根据文件名自动判断分类
5. **缓存策略**: 图片URL包含处理参数，建议设置适当的缓存策略

## 🔄 更新和维护

### 添加新图片

1. 将图片上传到 `https://www.pengshz.cn/images/` 目录
2. 刷新页面或重新调用API
3. 图片会自动出现在列表中

### 修改分类

编辑 `backend/routes/images.js` 中的分类规则：

```javascript
const categories = {
  '城市': ['city', 'urban', 'building', 'street'],
  '自然': ['nature', 'landscape', 'mountain', 'forest', 'ocean', 'sunset'],
  // 添加新的分类规则
};
```

### 更新配置

修改 `src/config/qiniu.ts` 和 `backend/routes/images.js` 中的配置。

## 📞 技术支持

如果遇到问题，请检查：

1. 后端服务状态
2. 七牛云配置
3. 网络连接
4. 图片文件存在性
5. API响应内容

更多帮助请参考：
- [后端API文档](./backend/README.md)
- [部署指南](./DEPLOYMENT.md)
- [七牛云官方文档](https://developer.qiniu.com/)

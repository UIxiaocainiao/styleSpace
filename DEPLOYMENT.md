# 摄影作品系统部署指南

本指南将帮助您完整部署摄影作品系统，包括前端和后端服务。

## 📋 系统架构

```
前端 (React + Vite)    后端 (Node.js + Express)    七牛云存储
     ↓                           ↓                      ↓
http://localhost:5173    http://localhost:3000    https://your-domain.com
     ↓                           ↓                      ↓
   用户界面              API接口 + 数据库          图片存储
```

## 🚀 快速开始

### 1. 启动后端服务

```bash
# 方法一：使用启动脚本（推荐）
./start-backend.sh

# 方法二：手动启动
cd backend
npm install
npm run setup  # 首次运行需要配置
npm run dev
```

### 2. 启动前端服务

```bash
# 在项目根目录
npm install
npm run dev
```

### 3. 访问系统

- 前端地址：http://localhost:5173
- 后端API：http://localhost:3000/api
- 健康检查：http://localhost:3000/health

## ⚙️ 详细配置

### 后端配置

#### 1. 七牛云配置

1. **注册七牛云账号**
   - 访问 https://www.qiniu.com
   - 注册并完成实名认证

2. **创建存储空间**
   - 登录控制台
   - 进入"对象存储" -> "空间管理"
   - 创建新空间，选择"标准存储"
   - 记录空间名称

3. **获取访问密钥**
   - 进入"个人中心" -> "密钥管理"
   - 获取 AccessKey 和 SecretKey

4. **配置域名**
   - 在空间设置中绑定自定义域名
   - 或使用七牛云提供的默认域名

#### 2. 环境变量配置

编辑 `backend/.env` 文件：

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 七牛云配置
QINIU_ACCESS_KEY=your_access_key_here
QINIU_SECRET_KEY=your_secret_key_here
QINIU_BUCKET=your_bucket_name_here
QINIU_DOMAIN=https://your-domain.com

# 数据库配置
DATABASE_URL=./database/photography.db

# CORS配置
CORS_ORIGIN=http://localhost:5173

# 文件上传配置
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

### 前端配置

编辑 `src/config/qiniu.ts` 文件：

```typescript
export const QINIU_CONFIG = {
  // 替换为您的七牛云域名
  domain: 'https://your-domain.com',
  
  // 后端API地址
  apiBaseUrl: 'http://localhost:3000/api',
  
  // 其他配置...
};
```

## 🐳 Docker部署

### 1. 后端Docker部署

创建 `backend/Dockerfile`：

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 创建必要目录
RUN mkdir -p database uploads

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
```

创建 `backend/docker-compose.yml`：

```yaml
version: '3.8'

services:
  photography-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - QINIU_ACCESS_KEY=${QINIU_ACCESS_KEY}
      - QINIU_SECRET_KEY=${QINIU_SECRET_KEY}
      - QINIU_BUCKET=${QINIU_BUCKET}
      - QINIU_DOMAIN=${QINIU_DOMAIN}
      - CORS_ORIGIN=${CORS_ORIGIN}
    volumes:
      - ./database:/app/database
      - ./uploads:/app/uploads
    restart: unless-stopped
```

启动服务：

```bash
cd backend
docker-compose up -d
```

### 2. 前端Docker部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`：

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://photography-api:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

## ☁️ 云服务器部署

### 1. 服务器要求

- **操作系统**: Ubuntu 20.04+ / CentOS 7+
- **内存**: 最少1GB，推荐2GB+
- **存储**: 最少10GB可用空间
- **网络**: 公网IP，开放80、443、3000端口

### 2. 安装Node.js

```bash
# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

### 3. 安装PM2

```bash
npm install -g pm2
```

### 4. 部署后端

```bash
# 克隆代码
git clone <your-repo-url>
cd photography-backend

# 安装依赖
npm install

# 配置环境变量
cp config.example.env .env
nano .env  # 编辑配置文件

# 启动服务
pm2 start server.js --name photography-api
pm2 save
pm2 startup
```

### 5. 配置Nginx反向代理

安装Nginx：

```bash
# Ubuntu
sudo apt update
sudo apt install nginx

# CentOS
sudo yum install nginx
```

配置Nginx：

```bash
sudo nano /etc/nginx/sites-available/photography
```

添加配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /var/www/photography/dist;
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/photography /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. 配置SSL证书

使用Let's Encrypt：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🔧 生产环境优化

### 1. 数据库优化

考虑使用PostgreSQL或MySQL替代SQLite：

```bash
# 安装PostgreSQL
sudo apt install postgresql postgresql-contrib

# 创建数据库
sudo -u postgres createdb photography
sudo -u postgres createuser photography_user
```

### 2. 缓存配置

使用Redis缓存：

```bash
# 安装Redis
sudo apt install redis-server

# 配置Redis
sudo nano /etc/redis/redis.conf
```

### 3. 监控和日志

配置PM2监控：

```bash
pm2 install pm2-logrotate
pm2 monit
```

## 🧪 测试部署

### 1. 健康检查

```bash
curl http://localhost:3000/health
```

### 2. API测试

```bash
# 获取作品列表
curl "http://localhost:3000/api/photography?page=1&pageSize=5"

# 测试图片上传
curl -X POST -F "image=@test.jpg" -F "title=测试作品" -F "category=城市" -F "author=测试作者" http://localhost:3000/api/photography
```

### 3. 前端测试

访问 http://your-domain.com 检查前端是否正常加载。

## 🚨 故障排除

### 常见问题

1. **七牛云上传失败**
   - 检查AccessKey和SecretKey
   - 确认存储空间权限
   - 检查网络连接

2. **CORS错误**
   - 检查CORS_ORIGIN配置
   - 确认前端域名配置正确

3. **数据库错误**
   - 检查数据库文件权限
   - 确认磁盘空间充足

4. **端口冲突**
   - 检查端口占用：`netstat -tulpn | grep :3000`
   - 修改端口配置

### 日志查看

```bash
# PM2日志
pm2 logs photography-api

# Nginx日志
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# 系统日志
sudo journalctl -u nginx -f
```

## 📞 技术支持

如果遇到问题，请检查：

1. 服务器资源使用情况
2. 网络连接状态
3. 配置文件正确性
4. 日志错误信息

更多帮助请参考：
- [后端API文档](./backend/README.md)
- [前端配置文档](./src/config/qiniu.ts)
- [七牛云官方文档](https://developer.qiniu.com/)

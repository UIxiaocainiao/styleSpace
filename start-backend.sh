#!/bin/bash

# 摄影作品API后端服务启动脚本

echo "🎬 摄影作品API后端服务"
echo "======================"

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 进入backend目录
cd backend

# 检查package.json是否存在
if [ ! -f "package.json" ]; then
    echo "❌ package.json 不存在，请确保在正确的目录中运行此脚本"
    exit 1
fi

# 检查node_modules是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
fi

# 启动后端服务
echo "🚀 启动后端服务..."
echo "📱 API地址: http://localhost:3000/api"
echo "🖼️  图片API: http://localhost:3000/api/images"
echo "🏥 健康检查: http://localhost:3000/health"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

npm run dev

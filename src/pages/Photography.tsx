import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaDownload, FaEye, FaTimes, FaSpinner } from 'react-icons/fa';

// 本地图片配置
const LOCAL_CONFIG = {
  // 本地图片存储路径
  imagePath: '/images',
  
  // 分页配置
  pagination: {
    pageSize: 12, // 每页加载的图片数量
    preloadPages: 1 // 预加载页数
  }
};

// 懒加载图片组件
const LazyImage = ({ src, alt, className, onClick }: { 
  src: string; 
  alt: string; 
  className: string; 
  onClick?: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`} onClick={onClick}>
      {/* 加载占位符 */}
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white/60 rounded-full animate-spin"></div>
              <div className="text-white/60 text-xs font-medium">加载中</div>
            </div>
          </div>
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 text-gray-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="text-gray-500 text-xs">加载失败</div>
          </div>
        </div>
      )}

      {/* 实际图片 */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

// 图片预览模态框
const ImageModal = ({ 
  image, 
  onClose 
}: { 
  image: PhotographyItem | null; 
  onClose: () => void;
}) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          >
            <FaTimes size={24} />
          </button>
          
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{image.title}</h3>
              <div className="flex items-center gap-6 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <FaHeart className="text-red-500" />
                  {image.likes}
                </span>
                <span className="flex items-center gap-1">
                  <FaDownload className="text-blue-500" />
                  {image.downloads}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye className="text-green-500" />
                  {image.views}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {image.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="text-sm text-gray-500">
                <p>作者: {image.author}</p>
                <p>分类: {image.category}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// 数据类型定义
interface PhotographyItem {
  id: number;
  title: string;
  category: string;
  image: string;
  author: string;
  likes: number;
  downloads: number;
  views: number;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: PhotographyItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// 本地图片数据生成函数
const getMockData = (page: number = 1, pageSize: number = 12, category: string = '全部'): ApiResponse => {
  const allMockData: PhotographyItem[] = [
    {
      id: 1,
      title: "午夜都市",
      category: "城市",
      image: "/images/thumbnails/midnight-metropolis.jpg",
      author: "摄影师A",
      likes: 120,
      downloads: 45,
      views: 1200,
      tags: ["夜景", "城市", "建筑"],
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "梦幻仙境",
      category: "自然",
      image: "/images/thumbnails/ethereal-dreamscape.jpg",
      author: "摄影师B",
      likes: 89,
      downloads: 32,
      views: 890,
      tags: ["自然", "风景", "山脉"],
      createdAt: "2024-01-14T15:20:00Z",
      updatedAt: "2024-01-14T15:20:00Z"
    },
    {
      id: 3,
      title: "深情肖像",
      category: "人像",
      image: "/images/thumbnails/soulful-portrait.jpg",
      author: "摄影师C",
      likes: 156,
      downloads: 67,
      views: 1560,
      tags: ["人像", "肖像", "情感"],
      createdAt: "2024-01-13T09:15:00Z",
      updatedAt: "2024-01-13T09:15:00Z"
    },
    {
      id: 4,
      title: "都市节拍",
      category: "街头",
      image: "/images/thumbnails/urban-rhythm.jpg",
      author: "摄影师D",
      likes: 78,
      downloads: 23,
      views: 780,
      tags: ["街头", "生活", "纪实"],
      createdAt: "2024-01-12T14:45:00Z",
      updatedAt: "2024-01-12T14:45:00Z"
    },
    {
      id: 5,
      title: "建筑诗篇",
      category: "建筑",
      image: "/images/thumbnails/architectural-poetry.jpg",
      author: "摄影师E",
      likes: 134,
      downloads: 56,
      views: 1340,
      tags: ["建筑", "细节", "几何"],
      createdAt: "2024-01-11T11:30:00Z",
      updatedAt: "2024-01-11T11:30:00Z"
    },
    {
      id: 6,
      title: "抽象情感",
      category: "抽象",
      image: "/images/thumbnails/abstract-emotions.jpg",
      author: "摄影师F",
      likes: 92,
      downloads: 34,
      views: 920,
      tags: ["抽象", "艺术", "创意"],
      createdAt: "2024-01-10T16:20:00Z",
      updatedAt: "2024-01-10T16:20:00Z"
    },
    {
      id: 7,
      title: "海洋交响曲",
      category: "自然",
      image: "/images/thumbnails/ocean-symphony.jpg",
      author: "摄影师G",
      likes: 167,
      downloads: 78,
      views: 1670,
      tags: ["海洋", "自然", "蓝色"],
      createdAt: "2024-01-09T13:10:00Z",
      updatedAt: "2024-01-09T13:10:00Z"
    },
    {
      id: 8,
      title: "黑白回忆",
      category: "黑白",
      image: "/images/thumbnails/monochrome-memories.jpg",
      author: "摄影师H",
      likes: 145,
      downloads: 62,
      views: 1450,
      tags: ["黑白", "经典", "对比"],
      createdAt: "2024-01-08T08:45:00Z",
      updatedAt: "2024-01-08T08:45:00Z"
    },
    {
      id: 9,
      title: "微观奇观",
      category: "微距",
      image: "/images/thumbnails/microscopic-wonders.jpg",
      author: "摄影师I",
      likes: 98,
      downloads: 41,
      views: 980,
      tags: ["微距", "细节", "自然"],
      createdAt: "2024-01-07T12:30:00Z",
      updatedAt: "2024-01-07T12:30:00Z"
    },
    {
      id: 10,
      title: "鸟瞰梦境",
      category: "航拍",
      image: "/images/thumbnails/bird-eye-dreams.jpg",
      author: "摄影师J",
      likes: 203,
      downloads: 89,
      views: 2030,
      tags: ["航拍", "俯瞰", "壮观"],
      createdAt: "2024-01-06T17:15:00Z",
      updatedAt: "2024-01-06T17:15:00Z"
    },
    {
      id: 11,
      title: "黄金时刻魔法",
      category: "自然",
      image: "/images/thumbnails/golden-hour-magic.jpg",
      author: "摄影师K",
      likes: 178,
      downloads: 73,
      views: 1780,
      tags: ["日落", "自然", "温暖"],
      createdAt: "2024-01-05T19:00:00Z",
      updatedAt: "2024-01-05T19:00:00Z"
    },
    {
      id: 12,
      title: "城市脉搏",
      category: "城市",
      image: "/images/thumbnails/city-pulse.jpg",
      author: "摄影师L",
      likes: 112,
      downloads: 38,
      views: 1120,
      tags: ["城市", "生活", "忙碌"],
      createdAt: "2024-01-04T14:25:00Z",
      updatedAt: "2024-01-04T14:25:00Z"
    },
    {
      id: 13,
      title: "山峦低语",
      category: "自然",
      image: "/images/thumbnails/mountain-whispers.jpg",
      author: "摄影师M",
      likes: 134,
      downloads: 52,
      views: 1340,
      tags: ["山脉", "自然", "宁静"],
      createdAt: "2024-01-03T11:20:00Z",
      updatedAt: "2024-01-03T11:20:00Z"
    },
    {
      id: 14,
      title: "森林宁静",
      category: "自然",
      image: "/images/thumbnails/forest-serenity.jpg",
      author: "摄影师N",
      likes: 98,
      downloads: 35,
      views: 980,
      tags: ["森林", "自然", "宁静"],
      createdAt: "2024-01-02T16:45:00Z",
      updatedAt: "2024-01-02T16:45:00Z"
    },
    {
      id: 15,
      title: "街头故事",
      category: "街头",
      image: "/images/thumbnails/street-stories.jpg",
      author: "摄影师O",
      likes: 87,
      downloads: 28,
      views: 870,
      tags: ["街头", "生活", "故事"],
      createdAt: "2024-01-01T13:30:00Z",
      updatedAt: "2024-01-01T13:30:00Z"
    },
    {
      id: 16,
      title: "液体镜面",
      category: "抽象",
      image: "/images/thumbnails/liquid-mirrors.jpg",
      author: "摄影师P",
      likes: 156,
      downloads: 64,
      views: 1560,
      tags: ["抽象", "反射", "艺术"],
      createdAt: "2023-12-31T09:15:00Z",
      updatedAt: "2023-12-31T09:15:00Z"
    },
    {
      id: 17,
      title: "天空画布",
      category: "自然",
      image: "/images/thumbnails/sky-canvas.jpg",
      author: "摄影师Q",
      likes: 123,
      downloads: 47,
      views: 1230,
      tags: ["天空", "云彩", "自然"],
      createdAt: "2023-12-30T14:20:00Z",
      updatedAt: "2023-12-30T14:20:00Z"
    },
    {
      id: 18,
      title: "花瓣完美",
      category: "微距",
      image: "/images/thumbnails/petal-perfection.jpg",
      author: "摄影师R",
      likes: 145,
      downloads: 58,
      views: 1450,
      tags: ["花朵", "微距", "细节"],
      createdAt: "2023-12-29T10:45:00Z",
      updatedAt: "2023-12-29T10:45:00Z"
    },
    {
      id: 19,
      title: "霓虹夜曲",
      category: "城市",
      image: "/images/thumbnails/neon-nocturne.jpg",
      author: "摄影师S",
      likes: 178,
      downloads: 72,
      views: 1780,
      tags: ["霓虹", "夜景", "城市"],
      createdAt: "2023-12-28T19:30:00Z",
      updatedAt: "2023-12-28T19:30:00Z"
    }
  ];

  // 过滤分类
  let filteredData = allMockData;
  if (category && category !== '全部') {
    filteredData = allMockData.filter(item => item.category === category);
  }

  // 分页
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    success: true,
    data: paginatedData,
    total: filteredData.length,
    page,
    pageSize,
    hasMore: endIndex < filteredData.length
  };
};

// 本地图片数据获取函数
const fetchPhotographyData = async (
  page: number = 1, 
  pageSize: number = LOCAL_CONFIG.pagination.pageSize, 
  category: string = '全部'
): Promise<ApiResponse> => {
  // 直接使用模拟数据，不再调用API
  console.log('使用本地模拟数据');
  return getMockData(page, pageSize, category);
};

const categories = ["全部", "城市", "自然", "人像", "街头", "建筑", "抽象", "黑白", "微距", "航拍"];

export default function Photography() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedImage, setSelectedImage] = useState<PhotographyItem | null>(null);
  const [photographyData, setPhotographyData] = useState<PhotographyItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 加载图片数据
  const loadPhotographyData = useCallback(async (page: number = 1, category: string = '全部', append: boolean = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setError(null);
      }
      
      const response = await fetchPhotographyData(page, LOCAL_CONFIG.pagination.pageSize, category);
      
      if (append) {
        setPhotographyData(prev => [...prev, ...response.data]);
      } else {
        setPhotographyData(response.data);
      }
      
      setHasMore(response.hasMore);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // 初始加载和分类切换
  useEffect(() => {
    loadPhotographyData(1, selectedCategory, false);
  }, [selectedCategory, loadPhotographyData]);

  // 加载更多数据
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadPhotographyData(currentPage + 1, selectedCategory, true);
    }
  }, [currentPage, selectedCategory, hasMore, isLoadingMore, loadPhotographyData]);

  // 滚动加载更多
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);

  // 响应式列数
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // 将数据分配到列中
  const getColumnData = () => {
    const columnsData: PhotographyItem[][] = Array.from({ length: columns }, () => []);
    
    photographyData.forEach((item, index) => {
      const columnIndex = index % columns;
      columnsData[columnIndex]?.push(item);
    });
    
    return columnsData;
  };

  const columnData = getColumnData();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* 头部 */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            摄影作品
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            用镜头记录美好瞬间，分享视觉艺术与创意灵感
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-black font-medium'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-400 mb-4">加载失败: {error}</div>
            <button
              onClick={() => loadPhotographyData(1, selectedCategory, false)}
              className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              重试
            </button>
          </div>
        )}

        {/* 加载状态 */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <div className="text-white/60">加载中...</div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {columnData.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-4">
                  {column.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="group relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="relative">
                        <LazyImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto object-cover cursor-pointer"
                          onClick={() => setSelectedImage(item)}
                        />
                        
                        {/* 悬停遮罩 */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-4">
                            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                              <FaHeart className="text-white" />
                            </button>
                            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                              <FaDownload className="text-white" />
                            </button>
                            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                              <FaEye className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{item.author}</span>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <FaHeart className="text-red-400" />
                              {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaDownload className="text-blue-400" />
                              {item.downloads}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaEye className="text-green-400" />
                              {item.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* 加载更多 */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-12">
                {isLoadingMore ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center space-y-4"
                  >
                    {/* 主加载动画 */}
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-white/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                      <div className="absolute top-1 left-1 w-10 h-10 border-4 border-transparent border-t-white/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                    </div>
                    
                    {/* 加载文字 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/80 text-sm font-medium"
                    >
                      正在加载更多精彩作品...
                    </motion.div>
                    
                    {/* 进度点动画 */}
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-white/60 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={loadMore}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl hover:from-white/20 hover:to-white/10 transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm"
                  >
                    {/* 按钮背景光效 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* 按钮内容 */}
                    <div className="relative flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/60 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      </div>
                      <span className="text-white/90 font-medium">发现更多精彩</span>
                      <motion.div
                        className="w-4 h-4"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/60">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* 悬停时的粒子效果 */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: '50%',
                          }}
                          animate={{
                            y: [-20, -40, -60],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            repeatDelay: 3
                          }}
                        />
                      ))}
                    </div>
                  </motion.button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* 图片预览模态框 */}
      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
}
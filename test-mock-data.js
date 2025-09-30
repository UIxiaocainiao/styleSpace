// 测试模拟数据生成
const getMockData = (page = 1, pageSize = 12, category = '全部') => {
  const allMockData = [
    {
      id: 1,
      title: "城市夜景",
      category: "城市",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=600&fit=crop&q=75",
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
      title: "自然风光",
      category: "自然",
      image: "https://images.unsplash.com/photo-1506905925346-14b1e5dba7c4?w=400&h=600&fit=crop&q=75",
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
      title: "人像摄影",
      category: "人像",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&q=75",
      author: "摄影师C",
      likes: 156,
      downloads: 67,
      views: 1560,
      tags: ["人像", "肖像", "情感"],
      createdAt: "2024-01-13T09:15:00Z",
      updatedAt: "2024-01-13T09:15:00Z"
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

// 测试
console.log('测试模拟数据生成:');
console.log(JSON.stringify(getMockData(1, 3, '全部'), null, 2));

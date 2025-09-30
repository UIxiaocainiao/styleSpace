import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading';

interface PageWithLoadingProps {
  children: React.ReactNode;
}

export default function PageWithLoading({ children }: PageWithLoadingProps) {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 检查是否是页面刷新
    const isRefresh = performance.navigation?.type === 1 || 
                     (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    
    if (isRefresh) {
      // 在刷新时，将当前页面路径存储到sessionStorage
      sessionStorage.setItem('lastVisitedPage', location.pathname);
      setShowLoading(true);
      // 4秒后隐藏加载页面
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 5000); // 4秒计数 + 1秒停留

      return () => clearTimeout(timer);
    } else {
      // 如果不是刷新，也更新当前页面路径到sessionStorage
      sessionStorage.setItem('lastVisitedPage', location.pathname);
    }
  }, [location.pathname]);

  if (showLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}

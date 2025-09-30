import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Counter from '@/components/Counter';

export default function Loading() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 获取要返回的页面路径
  // 优先使用location.state.from，然后是sessionStorage中存储的路径，最后默认为首页
  const returnPath = location.state?.from || 
                    sessionStorage.getItem('lastVisitedPage') || 
                    '/home';

  useEffect(() => {
    const duration = 4000; // 4秒完成计数
    const increment = 100 / (duration / 16); // 60fps
    let currentCount = 0;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= 100) {
        setCount(100);
        clearInterval(timer);
        // 计数完成后延迟1秒跳转到原页面，让用户看到100
        setTimeout(() => {
          navigate(returnPath);
        }, 1000);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 16); // 60fps

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <Counter
          value={count}
          fontSize={100}
          textColor="#ffffff"
          fontWeight="bold"
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px'
          }}
        />
      </div>
    </div>
  );
}

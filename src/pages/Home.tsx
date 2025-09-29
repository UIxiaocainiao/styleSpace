import SplitText from '@/components/SplitText'
import LiquidEther from '@/components/LiquidEther'
import LogoLoop from '@/components/LogoLoop'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'
import MagicBento from '@/components/MagicBento'
import SplashCursor from '@/components/SplashCursor'

const handleAnimationComplete = () => {
  // Animation completed
};

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];


export default function Home() {
  return (

    <section className="relative">
      {/* 首屏内容层 */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center" >
        {/* GradientBlinds 全屏背景 */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <SplashCursor />
        </div>


        {/* 移动端上下动画效果 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-auto md:hidden">
          <SplashCursor />
        </div>


        {/* React Bits 文字前景层 */}
        <div className="relative z-10">
          {/* 桌面端显示 */}
          <div className="hidden md:block">
            <SplitText
              text="UI Design Portfolio"
              className="text-[clamp(2.4rem,8vw,6rem)] font-bold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>

          {/* 移动端显示 */}
          <div className="block md:hidden px-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-full">
                <SplitText
                  text="UI Design"
                  className="text-[clamp(2rem,10vw,3rem)] font-bold w-full"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
              </div>
              <div className="w-full mt-4">
                <SplitText
                  text="Portfolio"
                  className="text-[clamp(2rem,10vw,3rem)] font-bold w-full"
                  delay={600}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* LogoLoop 区域 - 固定到浏览器窗口底部 */}




      {/* <div className="relative w-full min-h-screen">
      </div> */}



      {/* 新增功能展示区域 - 全屏居中显示 */}
      <div className="relative flex items-center justify-center min-h-screen w-full py-8 md:py-0">
        <div className="w-full max-w-8xl mx-auto px-2 md:px-4 flex justify-center">
          <div className="w-full max-w-6xl">
            <MagicBento
              textAutoHide={true}
              enableStars={false}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={400}
              particleCount={16}
              glowColor="132, 0, 255"
            />
          </div>
        </div>
      </div>
      
       {/* LogoLoop 区域 */}
         <div className="h-32 md:h-48 relative overflow-hidden bg-gradient-to-t from-black/80 to-transparent">
           <LogoLoop
             logos={techLogos}
             speed={120}
             direction="left"
             logoHeight={48}
             gap={32}
             pauseOnHover
             scaleOnHover
             fadeOut
             fadeOutColor="#ffffff"
             ariaLabel="Technology partners"
           />
         </div>
    </section>

  )
}


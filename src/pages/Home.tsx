import SplitText from '@/components/SplitText'
import LiquidEther from '@/components/LiquidEther'
import LogoLoop from '@/components/LogoLoop'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'
import MagicBento from '@/components/MagicBento'

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
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center">
        {/* GradientBlinds 全屏背景 */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <LiquidEther
            colors={['#0066FF', '#00BFFF', '#1E90FF', '#40A0FF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>


        {/* 移动端上下动画效果 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-auto md:hidden">
          <LiquidEther
            colors={['#0066FF', '#00BFFF', '#1E90FF', '#40A0FF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>


        {/* React Bits 文字前景层 */}
        <div className="relative z-10">
          {/* 桌面端显示 */}
          <div className="hidden md:block">
            <SplitText
              text="Hello, My Friends!"
              className="text-[clamp(2rem,10vw,8rem)] font-bold text-center"
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
          <div className="block md:hidden">
            <div className="flex flex-col items-center text-center">
              <div className="w-full">
                <SplitText
                  text="Hello"
                  className="text-[clamp(2rem,10vw,6rem)] font-bold w-full"
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
              <div className="w-full mt-2">
                <SplitText
                  text="My Friends!"
                  className="text-[clamp(2rem,10vw,6rem)] font-bold w-full"
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
            </div>
          </div>
        </div>
      </div>
      {/* LogoLoop 区域 */}
      <div className="relative w-full">
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={72}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </div>


      {/* 新增功能展示区域 - 全屏居中显示 */}
      <div className="relative flex items-center justify-center min-h-screen w-full">
        <div className="w-full max-w-8xl mx-auto px-4">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </div>
    </section>

  )
}


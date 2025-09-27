import { motion } from 'framer-motion'
import MagneticButton from '../components/animations/MagneticButton'
import Marquee from '../components/animations/Marquee'
import BlurText from '@/components/animations/BlurText'
import GradientText from '@/components/GradientText'
import GlitchText from '@/components/GlitchText'
import { Button } from '@/components/ui/button'
import FlowingMenu from '@/components/FlowingMenu'
import GradientBlinds from '@/components/GradientBlinds'
import SplitText from '@/components/SplitText'
import LiquidEther from '@/components/LiquidEther'

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const demoItems = [
  { link: '/', text: '首页', image: 'https://picsum.photos/600/400?random=1' },
  { link: '/photography', text: '摄影', image: 'https://picsum.photos/600/400?random=2' },
  { link: '/blur-text', text: '文字模糊', image: 'https://picsum.photos/600/400?random=3' },
  { link: '/about', text: '关于', image: 'https://picsum.photos/600/400?random=4' }
];



export default function Home() {
  return (

    <section className="relative">
      {/* 首屏内容层 */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center">
        {/* GradientBlinds 全屏背景 */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <LiquidEther
            colors={['#0066FF', '#00BFFF', '#1E90FF']}
            mouseForce={10}
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
            autoResumeDelay={1000}
            autoRampDuration={0.6}
          />
        </div>

        {/* React Bits 文字前景层 */}
        <div className="relative z-10">
          <SplitText
            text="Hello, Friends!"
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
      </div>

      {/* FlowingMenu 独立区域 */}
      <div className="relative w-full">
        <div style={{ height: '600px', position: 'relative' }}>
          <FlowingMenu items={demoItems} />
        </div>
      </div>

      {/* Marquee 区域 */}
      <div className="relative border-y border-white/10 bg-white/[0.02]">
        <Marquee speed={22} className="py-4">
          <Tag>Framer Motion</Tag>
          <Tag>ReactBits</Tag>
          <Tag>Tailwind CSS</Tag>
          <Tag>Dark UI</Tag>
          <Tag>Responsive</Tag>
          <Tag>Animations</Tag>
        </Marquee>
      </div>
    </section>

  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-base text-neutral-300">
      {children}
    </span>
  )
}

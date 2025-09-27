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
import LogoLoop from '@/components/LogoLoop'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import RippleGrid from '@/components/RippleGrid';
import LightRays from '@/components/LightRays';





const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const demoItems = [
  { link: '/', text: '首页', image: 'https://picsum.photos/600/400?random=1' },
  { link: '/photography', text: '摄影', image: 'https://picsum.photos/600/400?random=2' },
  { link: '/blur-text', text: '文字模糊', image: 'https://picsum.photos/600/400?random=3' },
  { link: '/about', text: '关于', image: 'https://picsum.photos/600/400?random=4' }
];
const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

export default function Home() {
  return (

    <section className="relative">
      {/* 首屏内容层 */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center">
        {/* GradientBlinds 全屏背景 */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          {/* <LiquidEther
            colors={['#00AAFF', '#00D4FF', '#40A0FF', '#80C0FF']}
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
          /> */}
          {/* <RippleGrid
             enableRainbow={false}
             gridColor="#815519"
             rippleIntensity={0.05}
             gridSize={18}
             gridThickness={15}
             mouseInteraction={true}
             mouseInteractionRadius={1.2}
             opacity={0.8}
           /> */}
          <LightRays
            raysOrigin="left"
            raysColor="#9073f7"
            raysSpeed={1.5}
            lightSpread={3}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-auto">

          <LightRays
            raysOrigin="right"
            raysColor="#9073f7"
            raysSpeed={1.5}
            lightSpread={3}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* React Bits 文字前景层 */}
        <div className="relative z-10">
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
      </div>
      {/* LogoLoop 区域 */}
      <div className="relative w-full">
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </div>


      {/* 新增功能展示区域 */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <GradientText
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                创意无限
              </GradientText>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              探索最新的动画技术和交互体验，打造令人印象深刻的用户界面
            </p>
          </motion.div>

          {/* 功能卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "流畅动画",
                description: "基于 Framer Motion 的流畅动画效果",
                icon: "🎨",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "响应式设计",
                description: "完美适配各种设备和屏幕尺寸",
                icon: "📱",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "现代UI",
                description: "采用最新的设计趋势和交互模式",
                icon: "✨",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-8 hover:bg-white/[0.05] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* 悬停效果背景 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>

          {/* 交互按钮区域 */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <MagneticButton>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
              >
                开始探索
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
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

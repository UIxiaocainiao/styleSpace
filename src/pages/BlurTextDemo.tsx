import BlurText from '@/components/animations/BlurText'
import { motion } from 'framer-motion'

export default function BlurTextDemo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-semibold"
      >
        文字模糊入场示例
      </motion.h1>

      <div className="mt-10 space-y-10">
        <BlurText
          text="用动效点亮你的创意"
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
          delay={0.05}
        />

        <p className="text-neutral-400 max-w-2xl">
          该组件将字符串拆分为单个字符，使用 Framer Motion 逐字淡入并减少模糊，适合标题或强调文案的出场动效。
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-3 text-lg font-medium">用法</h2>
          <pre className="overflow-x-auto text-sm text-neutral-300"><code>{`import BlurText from '@/components/animations/BlurText'

<BlurText
  text="用动效点亮你的创意"
  className="text-5xl font-semibold"
  delay={0.05}
/>`}</code></pre>
        </div>
      </div>
    </section>
  )
}


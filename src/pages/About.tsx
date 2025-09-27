import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl font-semibold"
      >
        关于 StyleSpace
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-4 text-neutral-400"
      >
        本项目现已集成 shadcn/ui 的样式系统与组件规范。你可以通过 `@/components/ui` 引入常用组件。
      </motion.p>
      <div className="mt-6 flex items-center gap-3">
        <Button>Shadcn 按钮</Button>
        <Button variant="secondary">次级按钮</Button>
        <Button variant="outline">描边按钮</Button>
      </div>
    </section>
  )
}

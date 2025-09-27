import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  href?: string
}

export default function MagneticButton({ children, href = '#' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const strength = 24 // px

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    const dist = Math.hypot(relX, relY)
    const maxDist = Math.hypot(rect.width, rect.height)
    const pull = Math.min(dist / (maxDist / 2), 1)
    x.set((relX / (rect.width / 2)) * strength * pull)
    y.set((relY / (rect.height / 2)) * strength * pull)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const Button = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="group relative inline-flex select-none items-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  )

  const isExternal = href.startsWith('http')
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {Button}
      </a>
    )
  }
  return <Link to={href}>{Button}</Link>
}


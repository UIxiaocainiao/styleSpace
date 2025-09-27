type Props = {
  children: React.ReactNode
  speed?: number // px/s (approx)
  className?: string
}

export default function Marquee({ children, speed = 18, className }: Props) {
  // Convert speed (px/s) into animation duration for 200% width track
  // Tailwind keyframes defined in src/index.css (@keyframes marquee)
  const duration = Math.max(10, Math.min(60, 1000 / speed))
  const style: React.CSSProperties = {
    animation: `marquee ${duration}s linear infinite`,
  }

  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div className="inline-flex whitespace-nowrap will-change-transform" style={style}>
        <div className="flex items-center">
          {children}
          {children}
        </div>
      </div>
    </div>
  )
}

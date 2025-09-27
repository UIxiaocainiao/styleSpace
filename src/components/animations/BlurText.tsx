import { motion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  delay?: number // seconds between letters
  once?: boolean // animate once when in view
}

export default function BlurText({ text, className = '', delay = 0.04, once = true }: Props) {
  const letters = Array.from(text)
  return (
    <div className={className} aria-label={text} role="heading">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once, margin: '-20% 0% -10% 0%' }}
          transition={{ duration: 0.5, delay: i * delay, ease: 'easeOut' }}
          className="inline-block will-change-transform"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}


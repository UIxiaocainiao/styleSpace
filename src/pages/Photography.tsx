import { motion } from 'framer-motion'
import MagicBento from '@/components/MagicBento'

type Photo = { src: string; title: string; description: string }

const images = [
  {
    src: 'https://images.pexels.com/photos/32878623/pexels-photo-32878623.jpeg',
    title: '城市夜景',
    description: '繁华都市的夜晚灯火'
  },
  {
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: '自然风光',
    description: '宁静的自然景色'
  },
  {
    src: 'https://images.pexels.com/photos/32647920/pexels-photo-32647920.jpeg',
    title: '人文纪实',
    description: '生活中的美好瞬间'
  },
  {
    src: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: '建筑美学',
    description: '现代建筑的线条之美'
  },
  {
    src: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: '街头摄影',
    description: '城市街头的日常'
  },
  {
    src: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: '艺术创作',
    description: '创意与灵感的碰撞'
  },
] as const satisfies readonly [Photo, Photo, Photo, Photo, Photo, Photo]

export default function Photography() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">摄影作品</h2>
        <p className="text-sm text-neutral-400">悬停查看动效，滚动进场动画</p>
      </div>

      {/* Bento Box 网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {/* 大卡片 - 占据 2x2 空间 */}
        <motion.figure
          key={images[0].src}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg hover:shadow-2xl transition-all duration-300 md:col-span-2 md:row-span-2"
        >
          <motion.img
            src={images[0].src}
            alt={images[0].title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2">{images[0].title}</h3>
            <p className="text-sm text-white/90 leading-relaxed">{images[0].description}</p>
          </figcaption>
        </motion.figure>

        {/* 中等卡片 - 占据 1x1 空间 */}
        <motion.figure
          key={images[1].src}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <motion.img
            src={images[1].src}
            alt={images[1].title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1">{images[1].title}</h3>
            <p className="text-xs text-white/80">{images[1].description}</p>
          </figcaption>
        </motion.figure>

        {/* 宽卡片 - 占据 2x1 空间 */}
        <motion.figure
          key={images[2].src}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg hover:shadow-2xl transition-all duration-300 md:col-span-2"
        >
          <motion.img
            src={images[2].src}
            alt={images[2].title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1">{images[2].title}</h3>
            <p className="text-sm text-white/80">{images[2].description}</p>
          </figcaption>
        </motion.figure>

        {/* 小卡片 - 占据 1x1 空间 */}
        <motion.figure
          key={images[3].src}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <motion.img
            src={images[3].src}
            alt={images[3].title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-sm font-semibold mb-1">{images[3].title}</h3>
            <p className="text-xs text-white/80">{images[3].description}</p>
          </figcaption>
        </motion.figure>

        {/* 高卡片 - 占据 1x2 空间 */}
        <motion.figure
          key={images[4].src}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg hover:shadow-2xl transition-all duration-300 md:row-span-2"
        >
          <motion.img
            src={images[4].src}
            alt={images[4].title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1">{images[4].title}</h3>
            <p className="text-sm text-white/80">{images[4].description}</p>
          </figcaption>
        </motion.figure>

        {/* 最后一个卡片 - 占据 1x1 空间 */}
        <motion.figure
          key={images[5].src}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <motion.img
            src={images[5].src}
            alt={images[5].title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-sm font-semibold mb-1">{images[5].title}</h3>
            <p className="text-xs text-white/80">{images[5].description}</p>
          </figcaption>
        </motion.figure>
      </div>

      <div className="mt-10 space-y-10">
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


    </section>
  )
}


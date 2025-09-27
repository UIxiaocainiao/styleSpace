import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="mt-2 text-neutral-400">你访问的页面不存在。</p>
      <Link to="/" className="mt-6 inline-block rounded-md bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition">
        返回首页
      </Link>
    </div>
  )
}


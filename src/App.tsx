import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Photography from './pages/Photography'
import About from './pages/About'
// import BlurTextDemo from './pages/BlurTextDemo'
import NotFound from './pages/NotFound'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <Navbar />
      <ScrollToTop />
      <main className="pt-[0px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photography />} />
          {/* <Route path="/blur-text" element={<BlurTextDemo />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

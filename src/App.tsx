import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import PageWithLoading from './components/PageWithLoading'
import Home from './pages/Home'
import Photography from './pages/Photography'
import About from './pages/About'
import Loading from './pages/Loading'
// import BlurTextDemo from './pages/BlurTextDemo'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<Navigate to="/loading" replace />} />
        <Route path="/home" element={
          <PageWithLoading>
            <Navbar />
            <ScrollToTop />
            <main className="pt-[0px]">
              <Home />
            </main>
          </PageWithLoading>
        } />
        <Route path="/photography" element={
          <PageWithLoading>
            <Navbar />
            <ScrollToTop />
            <main className="pt-[0px]">
              <Photography />
            </main>
          </PageWithLoading>
        } />
        <Route path="/about" element={
          <PageWithLoading>
            <Navbar />
            <ScrollToTop />
            <main className="pt-[0px]">
              <About />
            </main>
          </PageWithLoading>
        } />
        <Route path="*" element={
          <PageWithLoading>
            <Navbar />
            <ScrollToTop />
            <main className="pt-[0px]">
              <NotFound />
            </main>
          </PageWithLoading>
        } />
      </Routes>
    </div>
  )
}

export default App

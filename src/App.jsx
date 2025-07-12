import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

// Layout Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import DreamBuilder from './pages/DreamBuilder'
import DreamResult from './pages/DreamResult'
import DreamPlayer from './pages/DreamPlayer'
import DreamJournal from './pages/DreamJournal'
import JournalTimeline from './pages/JournalTimeline'
import VideoSettings from './pages/VideoSettings'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Temporarily force light mode for better UI
    setIsDarkMode(false)
    document.documentElement.classList.remove('dark')

    // Auto light/dark mode based on time (disabled for now)
    // const updateTheme = () => {
    //   const hour = new Date().getHours()
    //   const shouldBeDark = hour < 6 || hour >= 20 // 8pm to 6am is dark mode
    //   setIsDarkMode(shouldBeDark)
    //
    //   if (shouldBeDark) {
    //     document.documentElement.classList.add('dark')
    //   } else {
    //     document.documentElement.classList.remove('dark')
    //   }
    // }

    // updateTheme()

    // Update every hour
    // const interval = setInterval(updateTheme, 60 * 60 * 1000)

    // return () => clearInterval(interval)
  }, [])
  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-sky-50 via-white to-rose-50'
      }`}>
        <Navbar isDarkMode={isDarkMode} />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/dream-builder" element={<DreamBuilder isDarkMode={isDarkMode} />} />
            <Route path="/dream-result" element={<DreamResult isDarkMode={isDarkMode} />} />
            <Route path="/dream-player" element={<DreamPlayer isDarkMode={isDarkMode} />} />
            <Route path="/dream-journal" element={<DreamJournal isDarkMode={isDarkMode} />} />
            <Route path="/journal-timeline" element={<JournalTimeline isDarkMode={isDarkMode} />} />
            <Route path="/video-settings" element={<VideoSettings isDarkMode={isDarkMode} />} />
          </Routes>
        </motion.main>

        {/* Background decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-float ${
            isDarkMode ? 'bg-blue-400/20' : 'bg-sky-300/30'
          }`}></div>
          <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float ${
            isDarkMode ? 'bg-purple-400/20' : 'bg-rose-300/30'
          }`} style={{ animationDelay: '2s' }}></div>
          <div className={`absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl animate-float ${
            isDarkMode ? 'bg-pink-400/20' : 'bg-violet-300/30'
          }`} style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Time-based theme indicator */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-3 py-1 rounded-full text-xs ${
            isDarkMode
              ? 'bg-indigo-900/80 text-indigo-200'
              : 'bg-sky-100/80 text-sky-700'
          }`}>
            {isDarkMode ? '🌙 Dream Mode' : '☀️ Day Mode'}
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App

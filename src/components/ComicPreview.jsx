import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ComicBackground from './ComicBackground'

const ComicPreview = ({ dreamData }) => {
  const [previewScenes, setPreviewScenes] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!dreamData) return

    // Create a quick preview of comic scenes
    const scenes = [
      {
        type: 'setting',
        title: `Welcome to ${dreamData.setting}`,
        background: {
          gradient: getQuickGradient(dreamData.setting),
          elements: ['floating-leaves', 'fireflies'],
          colors: ['#4a90e2', '#7b68ee', '#9370db']
        },
        effects: ['sparkle-burst', 'gentle-glow'],
        duration: 4000
      },
      {
        type: 'magic',
        title: `You discover ${dreamData.magicalElement}`,
        background: {
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
          elements: ['floating-platforms', 'wave-motion'],
          colors: ['#667eea', '#764ba2', '#f093fb']
        },
        effects: ['magic-sparkle', 'energy-pulse'],
        duration: 4000
      }
    ]

    setPreviewScenes(scenes)

    // Auto-advance time for preview
    const interval = setInterval(() => {
      setCurrentTime(prev => (prev + 100) % 8000)
    }, 100)

    return () => clearInterval(interval)
  }, [dreamData])

  const getQuickGradient = (setting) => {
    const gradients = {
      'Enchanted Forest': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)',
      'Floating City': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
      'Crystal Cave': 'linear-gradient(135deg, #2c1810 0%, #8b4513 50%, #2c1810 100%)',
      'Starlit Ocean': 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      'Ancient Library': 'linear-gradient(135deg, #3c1810 0%, #8b4513 50%, #3c1810 100%)',
      'Cloud Kingdom': 'linear-gradient(135deg, #e0f6ff 0%, #74b9ff 50%, #0984e3 100%)'
    }
    return gradients[setting] || gradients['Enchanted Forest']
  }

  if (!dreamData || previewScenes.length === 0) {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-sky-100 to-rose-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Comic preview will appear here...</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-white/20">
      <ComicBackground 
        scenes={previewScenes}
        isPlaying={isPlaying}
        currentTime={currentTime}
      />
      
      {/* Preview Controls */}
      <div className="absolute bottom-2 right-2 z-30">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1 bg-black/50 text-white text-xs rounded-full hover:bg-black/70 transition-colors"
        >
          {isPlaying ? 'Pause' : 'Play'} Preview
        </button>
      </div>
      
      {/* Preview Label */}
      <div className="absolute top-2 left-2 z-30">
        <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
          🎬 Comic Preview
        </span>
      </div>
    </div>
  )
}

export default ComicPreview

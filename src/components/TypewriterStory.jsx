import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TypewriterStory = ({ story, speed = 30, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!story || isPaused) return

    if (currentIndex < story.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + story[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [story, currentIndex, speed, isComplete, isPaused, onComplete])

  const handleSkip = () => {
    setDisplayedText(story)
    setCurrentIndex(story.length)
    setIsComplete(true)
    onComplete?.()
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const formatStoryText = (text) => {
    // Split by common story markers and format
    return text.split('\n').map((line, index) => {
      // Check if line is a title (starts with Title: or is in quotes)
      if (line.includes('Title:') || (line.startsWith('"') && line.endsWith('"'))) {
        return (
          <h3 key={index} className="text-2xl font-serif font-bold text-center mb-4 text-sky-700">
            {line.replace('Title:', '').replace(/"/g, '').trim()}
          </h3>
        )
      }
      
      // Check if line is a chapter heading (starts with ** or Chapter)
      if (line.includes('**') || line.includes('Chapter')) {
        return (
          <h4 key={index} className="text-lg font-serif font-semibold mt-6 mb-3 text-rose-600">
            {line.replace(/\*\*/g, '').trim()}
          </h4>
        )
      }
      
      // Regular paragraph
      if (line.trim()) {
        return (
          <p key={index} className="mb-4 leading-relaxed text-gray-700">
            {line.trim()}
          </p>
        )
      }
      
      return <br key={index} />
    })
  }

  return (
    <div className="relative">
      {/* Story Content */}
      <div className="prose prose-lg max-w-none">
        <div className="font-serif text-gray-700 leading-relaxed">
          {formatStoryText(displayedText)}
          
          {/* Typing Cursor */}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-6 bg-sky-500 ml-1"
            />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mt-6">
        {!isComplete && (
          <>
            <button
              onClick={togglePause}
              className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors text-sm"
            >
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
            
            <button
              onClick={handleSkip}
              className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors text-sm"
            >
              ⏭️ Skip to End
            </button>
          </>
        )}
        
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
              ✨ Story Complete
            </span>
          </motion.div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <motion.div
          className="bg-gradient-to-r from-sky-400 to-rose-400 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / story.length) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <div className="text-center mt-2 text-xs text-gray-500">
        {Math.round((currentIndex / story.length) * 100)}% complete
      </div>
    </div>
  )
}

export default TypewriterStory

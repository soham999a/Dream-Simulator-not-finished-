import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ComicBackground = ({ scenes, isPlaying, currentTime }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [sceneStartTime, setSceneStartTime] = useState(0)

  useEffect(() => {
    if (!scenes || scenes.length === 0) return

    // Calculate which scene should be active based on current time
    let totalTime = 0
    let newSceneIndex = 0

    for (let i = 0; i < scenes.length; i++) {
      if (currentTime >= totalTime && currentTime < totalTime + scenes[i].duration) {
        newSceneIndex = i
        setSceneStartTime(totalTime)
        break
      }
      totalTime += scenes[i].duration
    }

    if (newSceneIndex !== currentSceneIndex) {
      setCurrentSceneIndex(newSceneIndex)
    }
  }, [currentTime, scenes, currentSceneIndex])

  if (!scenes || scenes.length === 0) {
    return <DefaultBackground />
  }

  const currentScene = scenes[currentSceneIndex]
  const sceneProgress = Math.min((currentTime - sceneStartTime) / currentScene.duration, 1)

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSceneIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: currentScene.background.gradient,
          }}
        >
          {/* Dynamic Elements */}
          <SceneElements 
            elements={currentScene.background.elements}
            effects={currentScene.effects}
            colors={currentScene.background.colors}
            progress={sceneProgress}
            isPlaying={isPlaying}
          />
          
          {/* Scene Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center"
          >
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white text-shadow-lg mb-2">
              {currentScene.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
          </motion.div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-rose-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${sceneProgress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const SceneElements = ({ elements, effects, colors, progress, isPlaying }) => {
  return (
    <>
      {elements.map((element, index) => (
        <ElementRenderer
          key={`${element}-${index}`}
          type={element}
          colors={colors}
          progress={progress}
          isPlaying={isPlaying}
          delay={index * 0.2}
        />
      ))}
      
      {effects.map((effect, index) => (
        <EffectRenderer
          key={`${effect}-${index}`}
          type={effect}
          colors={colors}
          progress={progress}
          isPlaying={isPlaying}
          delay={index * 0.3}
        />
      ))}
    </>
  )
}

const ElementRenderer = ({ type, colors, progress, isPlaying, delay }) => {
  const getElementStyle = () => {
    switch (type) {
      case 'floating-leaves':
        return (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full opacity-60"
                style={{ 
                  background: colors[i % colors.length],
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
                animate={isPlaying ? {
                  y: [0, -20, 0],
                  x: [0, 10, -5, 0],
                  rotate: [0, 180, 360]
                } : {}}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: delay + i * 0.5
                }}
              />
            ))}
          </div>
        )
      
      case 'fireflies':
        return (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-yellow-300 opacity-80"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: '0 0 10px #fef08a'
                }}
                animate={isPlaying ? {
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.2, 0.5],
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25]
                } : {}}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: delay + Math.random() * 2
                }}
              />
            ))}
          </div>
        )
      
      case 'wave-motion':
        return (
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 left-0 right-0 h-16 opacity-40"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors[0]}, transparent)`,
                  borderRadius: '50% 50% 0 0'
                }}
                animate={isPlaying ? {
                  x: [-100, 100],
                  scaleX: [1, 1.2, 1]
                } : {}}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  delay: delay + i * 0.8
                }}
              />
            ))}
          </div>
        )
      
      case 'floating-platforms':
        return (
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-lg opacity-50"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${20 + i * 5}px`,
                  background: colors[i % colors.length],
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`
                }}
                animate={isPlaying ? {
                  y: [0, -15, 0],
                  rotateY: [0, 5, -5, 0]
                } : {}}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: delay + i * 0.3
                }}
              />
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return getElementStyle()
}

const EffectRenderer = ({ type, colors, progress, isPlaying, delay }) => {
  const getEffectStyle = () => {
    switch (type) {
      case 'sparkle-burst':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={isPlaying ? {
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: delay + Math.random() * 2
                }}
              />
            ))}
          </div>
        )
      
      case 'energy-pulse':
        return (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={isPlaying ? {
              background: [
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
              ]
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: delay
            }}
          />
        )
      
      case 'magic-sparkle':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={isPlaying ? {
                  rotate: [0, 360],
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 1, 0.3]
                } : {}}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: delay + Math.random() * 3
                }}
              >
                <div className="w-2 h-2 bg-yellow-300 transform rotate-45" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
              </motion.div>
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return getEffectStyle()
}

const DefaultBackground = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
    <div className="absolute inset-0 bg-black/30" />
  </div>
)

export default ComicBackground

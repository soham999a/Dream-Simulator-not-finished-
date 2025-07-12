import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Moon } from 'lucide-react'
import { useDreamStore } from '../utils/store'
import { generateSpeech, generateComicBackgrounds } from '../utils/api'
import ComicBackground from '../components/ComicBackground'
import CinematicBackground from '../components/CinematicBackground'

const DreamPlayer = () => {
  const navigate = useNavigate()
  const { generatedStory, generatedImages, audioUrl, setAudioUrl, dreamData } = useDreamStore()

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [comicScenes, setComicScenes] = useState([])
  const [isGeneratingScenes, setIsGeneratingScenes] = useState(false)

  const audioRef = useRef(null)
  const ambientRef = useRef(null)

  useEffect(() => {
    if (!generatedStory) {
      navigate('/dream-builder')
      return
    }

    // Generate comic scenes if not already generated
    if (comicScenes.length === 0 && !isGeneratingScenes) {
      generateScenes()
    }

    // Generate audio if not already generated
    if (!audioUrl && !isGeneratingAudio) {
      generateAudio()
    }

    // Setup ambient sound
    if (ambientRef.current) {
      ambientRef.current.volume = 0.3
      ambientRef.current.loop = true
    }

    // Image slideshow
    if (generatedImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % generatedImages.length)
      }, 8000) // Change image every 8 seconds

      return () => clearInterval(interval)
    }
  }, [generatedStory, audioUrl, generatedImages, comicScenes])

  const generateScenes = async () => {
    if (!dreamData || !generatedStory) return

    setIsGeneratingScenes(true)
    try {
      const scenes = await generateComicBackgrounds(dreamData, generatedStory)
      setComicScenes(scenes)
      console.log('🎬 Comic scenes generated:', scenes)
    } catch (error) {
      console.error('Scene generation failed:', error)
    } finally {
      setIsGeneratingScenes(false)
    }
  }

  const generateAudio = async () => {
    if (!generatedStory) return

    setIsGeneratingAudio(true)
    try {
      const audio = await generateSpeech(generatedStory)
      setAudioUrl(audio)

      // If audio is null, it means we should use browser TTS
      if (audio === null) {
        console.log('💡 Using browser speech synthesis for narration')
      }
    } catch (error) {
      console.error('Audio generation failed:', error)
      // Set audioUrl to null to indicate browser TTS should be used
      setAudioUrl(null)
    } finally {
      setIsGeneratingAudio(false)
    }
  }

  const togglePlay = () => {
    // If we have an audio URL, use the audio element
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        ambientRef.current?.pause()
      } else {
        audioRef.current.play()
        ambientRef.current?.play()
      }
      setIsPlaying(!isPlaying)
    }
    // Otherwise, use browser speech synthesis
    else if (generatedStory) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        ambientRef.current?.pause()
        setIsPlaying(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(generatedStory.substring(0, 1000))
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 0.8

        utterance.onend = () => setIsPlaying(false)
        utterance.onerror = () => setIsPlaying(false)

        window.speechSynthesis.speak(utterance)
        ambientRef.current?.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleAudioError = (e) => {
    console.error('❌ Audio playback error:', e)
    console.log('🔄 Falling back to browser TTS...')

    // Clear the problematic audio URL
    setAudioUrl(null)

    // Use browser TTS as fallback
    if (generatedStory && !isPlaying) {
      const utterance = new SpeechSynthesisUtterance(generatedStory.substring(0, 1000))
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    if (!audioRef.current) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (isGeneratingAudio || isGeneratingScenes) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-sky-400 to-rose-400 rounded-full flex items-center justify-center"
          >
            <Moon className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
            Preparing Your Dream Experience...
          </h2>
          <p className="text-gray-600">
            {isGeneratingScenes ? 'Creating your comic-style dream world...' : 'Converting your story to beautiful narration'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 text-white relative overflow-hidden">
      {/* Cinematic Video Background */}
      <CinematicBackground
        dreamData={dreamData}
        className="absolute inset-0 z-[-2]"
      />

      {/* Dynamic Comic Background Overlay */}
      <ComicBackground
        scenes={comicScenes}
        isPlaying={isPlaying}
        currentTime={currentTime * 1000} // Convert to milliseconds
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Header */}
        <div className="p-6 text-center">
          <h1 className="text-3xl font-serif font-bold mb-2">Dream Mode</h1>
          <p className="text-white/80">Close your eyes and let the story guide you</p>
        </div>

        {/* Main Player Area */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* Story Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Your Personal Dream Story
              </h2>
            </div>

            {/* Audio Player */}
            <div className="glass-effect rounded-2xl p-6 mb-6">
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 to-rose-400 rounded-full transition-all duration-200"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              {/* Time Display */}
              <div className="flex justify-between text-sm text-white/70 mb-4">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <div className="relative">
                  {/* Breathing Animation Rings */}
                  {isPlaying && (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-full border-2 border-white/30"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0, 0.2]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        className="absolute inset-0 rounded-full border-2 border-white/20"
                      />
                    </>
                  )}

                  <motion.button
                    onClick={togglePlay}
                    disabled={!audioUrl && !generatedStory}
                    animate={isPlaying ? {
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative w-16 h-16 rounded-full bg-gradient-to-r from-sky-400 to-rose-400 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </motion.button>
                </div>

                <button
                  onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center justify-center space-x-3 mt-4">
                <button onClick={toggleMute} className="p-1 hover:bg-white/10 rounded">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-sky-400"
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center text-white/70">
              <p className="mb-2">🎧 Use headphones for the best experience</p>
              <p className="mb-2">✨ Let the story guide you into peaceful dreams</p>
              {!audioUrl && generatedStory && (
                <p className="text-sm text-white/60">💡 Using browser voice synthesis for narration</p>
              )}
              {audioUrl && (
                <p className="text-sm text-white/60">🎵 Using premium AI voice narration</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Elements */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleAudioError}
          onEnded={() => setIsPlaying(false)}
          crossOrigin="anonymous"
        />
      )}
      
      {/* Ambient Sound */}
      <audio
        ref={ambientRef}
        src="/ambient-dream.mp3" // You would add this to public folder
        loop
      />
    </div>
  )
}

export default DreamPlayer

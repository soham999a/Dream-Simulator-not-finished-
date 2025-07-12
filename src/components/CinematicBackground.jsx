import React, { useState, useRef, useEffect } from 'react'
import { getDreamVideoBackground } from '../utils/api'

const CinematicBackground = ({ dreamData, className = "" }) => {
  const [videoData, setVideoData] = useState(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [useStaticFallback, setUseStaticFallback] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (dreamData) {
      const backgroundData = getDreamVideoBackground(dreamData)
      setVideoData(backgroundData)
      console.log('🎬 Cinematic background data:', backgroundData)
    }
  }, [dreamData])

  const handleVideoLoad = () => {
    console.log('✅ Video loaded successfully')
    setIsVideoLoaded(true)
    setUseStaticFallback(false)
  }

  const handleVideoError = (e) => {
    console.log('📹 Video not available, using static background with Ken Burns effect')
    setUseStaticFallback(true)
    setIsVideoLoaded(false)
  }

  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Video autoplay failed:', err)
        setUseStaticFallback(true)
      })
    }
  }

  if (!videoData) {
    return null
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Background */}
      {!useStaticFallback && videoData.primaryVideo && videoData.primaryVideo.src && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={handleVideoCanPlay}
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-70 cinematic-video"
        >
          <source src={videoData.primaryVideo.src} type="video/mp4" />
          {/* Fallback video source */}
          {videoData.fallbackVideo && videoData.fallbackVideo.src && (
            <source src={videoData.fallbackVideo.src} type="video/mp4" />
          )}
        </video>
      )}

      {/* Static Fallback with Ken Burns Effect */}
      {(useStaticFallback || !videoData.primaryVideo || !videoData.primaryVideo.src) && videoData.staticFallback && (
        <div
          className="absolute top-0 left-0 w-full h-full z-[-1] ken-burns-effect"
          style={{
            background: videoData.staticFallback.gradient,
            animationDuration: videoData.staticFallback.duration
          }}
        >
          {/* Animated overlay elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="floating-particles"></div>
            <div className="dream-mist"></div>
          </div>
        </div>
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-[-1]"></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-[-1]"></div>

      {/* Video status indicator (dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {isVideoLoaded ? '🎬 Video' : useStaticFallback ? '🎨 Static' : '⏳ Loading...'}
        </div>
      )}
    </div>
  )
}

export default CinematicBackground

import React, { useState, useRef } from 'react'
import { Upload, X, Play, Check } from 'lucide-react'

const VideoUploader = ({ onVideoUpload, currentTheme, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find(file => file.type.startsWith('video/'))
    
    if (videoFile) {
      processVideo(videoFile)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('video/')) {
      processVideo(file)
    }
  }

  const processVideo = async (file) => {
    setIsProcessing(true)
    
    try {
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('Video file too large. Please use a file smaller than 50MB.')
        return
      }

      // Create object URL for preview
      const videoUrl = URL.createObjectURL(file)
      
      // Store in localStorage for persistence
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Video = e.target.result
        localStorage.setItem(`dream-video-${currentTheme}`, base64Video)
        
        setUploadedVideo({
          url: videoUrl,
          name: file.name,
          size: file.size,
          type: file.type
        })
        
        // Notify parent component
        if (onVideoUpload) {
          onVideoUpload({
            url: videoUrl,
            theme: currentTheme,
            file: file
          })
        }
        
        console.log('✅ Video uploaded successfully for theme:', currentTheme)
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('❌ Video upload failed:', error)
      alert('Failed to upload video. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const removeVideo = () => {
    if (uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo.url)
      localStorage.removeItem(`dream-video-${currentTheme}`)
      setUploadedVideo(null)
      
      if (onVideoUpload) {
        onVideoUpload(null)
      }
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">
        🎬 Custom Video Background
      </h3>
      
      {!uploadedVideo ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-sky-400 bg-sky-400/10' 
              : 'border-white/30 hover:border-white/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {isProcessing ? (
            <div className="text-white">
              <div className="animate-spin w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Processing video...</p>
            </div>
          ) : (
            <div className="text-white/70">
              <Upload className="w-12 h-12 mx-auto mb-4 text-white/50" />
              <p className="text-lg mb-2">Drop your video here or click to browse</p>
              <p className="text-sm">
                Supports MP4, WebM, MOV • Max 50MB
              </p>
              <p className="text-xs mt-2 text-white/50">
                Theme: {currentTheme}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Video Preview */}
          <div className="relative rounded-lg overflow-hidden">
            <video
              src={uploadedVideo.url}
              className="w-full h-32 object-cover"
              muted
              loop
              autoPlay
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Play className="w-8 h-8 text-white/80" />
            </div>
          </div>
          
          {/* Video Info */}
          <div className="flex items-center justify-between text-white/80 text-sm">
            <div>
              <p className="font-medium">{uploadedVideo.name}</p>
              <p className="text-white/60">{formatFileSize(uploadedVideo.size)}</p>
            </div>
            <button
              onClick={removeVideo}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-red-400" />
            </button>
          </div>
          
          {/* Success Message */}
          <div className="flex items-center text-green-400 text-sm">
            <Check className="w-4 h-4 mr-2" />
            Video uploaded successfully!
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-white/50">
        💡 Tip: Use soft, dreamy videos with gentle motion for best results
      </div>
    </div>
  )
}

export default VideoUploader

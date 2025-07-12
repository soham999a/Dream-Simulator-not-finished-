import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Video, Trash2, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import VideoUploader from '../components/VideoUploader'
import { getDreamVideoBackground } from '../utils/api'

const VideoSettings = () => {
  const navigate = useNavigate()
  const [videoThemes, setVideoThemes] = useState([])
  const [selectedTheme, setSelectedTheme] = useState(null)

  const dreamThemes = [
    { setting: 'Enchanted Forest', emotion: 'Wonder', theme: 'forest-magical' },
    { setting: 'Enchanted Forest', emotion: 'Peace', theme: 'forest-serene' },
    { setting: 'Floating City', emotion: 'Wonder', theme: 'clouds-ethereal' },
    { setting: 'Floating City', emotion: 'Adventure', theme: 'sky-dynamic' },
    { setting: 'Crystal Cave', emotion: 'Mystery', theme: 'cave-crystals' },
    { setting: 'Crystal Cave', emotion: 'Wonder', theme: 'cave-glowing' },
    { setting: 'Starlit Ocean', emotion: 'Peace', theme: 'ocean-calm' },
    { setting: 'Starlit Ocean', emotion: 'Wonder', theme: 'ocean-starlit' },
    { setting: 'Ancient Library', emotion: 'Curiosity', theme: 'library-mystical' },
    { setting: 'Cloud Kingdom', emotion: 'Wonder', theme: 'sky-kingdom' }
  ]

  useEffect(() => {
    loadVideoThemes()
  }, [])

  const loadVideoThemes = () => {
    const themes = dreamThemes.map(theme => {
      const storedVideo = localStorage.getItem(`dream-video-${theme.theme}`)
      return {
        ...theme,
        hasCustomVideo: !!storedVideo,
        videoData: storedVideo ? { url: storedVideo, type: 'custom' } : null
      }
    })
    setVideoThemes(themes)
  }

  const handleVideoUpload = (videoData, theme) => {
    if (videoData) {
      console.log('✅ Video uploaded for theme:', theme)
    } else {
      console.log('🗑️ Video removed for theme:', theme)
    }
    loadVideoThemes() // Refresh the list
  }

  const removeVideo = (theme) => {
    localStorage.removeItem(`dream-video-${theme}`)
    loadVideoThemes()
  }

  const downloadPublicVideos = async () => {
    console.log('📥 Starting bulk download of public videos...')
    // This would implement bulk download functionality
    alert('Public video download feature coming soon!')
  }

  return (
    <div className="min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">
              🎬 Video Background Settings
            </h1>
            <p className="text-white/70">
              Customize cinematic backgrounds for your dream experiences
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <Video className="w-8 h-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Custom Videos
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Upload your own videos for personalized dream backgrounds
            </p>
            <div className="text-white/60 text-xs">
              {videoThemes.filter(t => t.hasCustomVideo).length} of {videoThemes.length} themes customized
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <Download className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Enhanced Backgrounds
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Beautiful animated gradients with Ken Burns effects as fallbacks
            </p>
            <div className="text-green-400 text-sm">
              ✨ Always available, no internet required
            </div>
          </motion.div>
        </div>

        {/* Video Theme Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {videoThemes.map((theme, index) => (
            <motion.div
              key={theme.theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              {/* Theme Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {theme.setting}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {theme.emotion} • {theme.theme}
                  </p>
                </div>
                {theme.hasCustomVideo && (
                  <button
                    onClick={() => removeVideo(theme.theme)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>

              {/* Video Preview */}
              <div className="mb-4">
                {theme.hasCustomVideo ? (
                  <div className="relative rounded-lg overflow-hidden bg-black/20 h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white/70">
                        <Video className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Custom Video Uploaded</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 h-32 ken-burns-effect">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white/70">
                        <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                          ✨
                        </div>
                        <p className="text-sm">Enhanced Static Background</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 floating-particles opacity-30"></div>
                  </div>
                )}
              </div>

              {/* Upload Section */}
              {selectedTheme === theme.theme ? (
                <VideoUploader
                  currentTheme={theme.theme}
                  onVideoUpload={(videoData) => handleVideoUpload(videoData, theme.theme)}
                  className="mb-4"
                />
              ) : (
                <button
                  onClick={() => setSelectedTheme(theme.theme)}
                  className="w-full py-3 px-4 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 rounded-lg transition-colors text-sm"
                >
                  {theme.hasCustomVideo ? 'Replace Video' : 'Upload Custom Video'}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            💡 Video Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70 text-sm">
            <div>
              <h4 className="font-medium text-white mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Use videos with gentle, slow motion</li>
                <li>• Avoid bright flashing or rapid changes</li>
                <li>• Keep file size under 50MB</li>
                <li>• MP4 format works best</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Recommended Sources:</h4>
              <ul className="space-y-1">
                <li>• Pixabay (free, royalty-free)</li>
                <li>• Pexels (free, high quality)</li>
                <li>• RunwayML (AI-generated)</li>
                <li>• Your own recordings</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VideoSettings

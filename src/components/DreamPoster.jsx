import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2 } from 'lucide-react'

const DreamPoster = ({ dreamData, storyTitle, generatedImages }) => {
  const posterRef = useRef(null)

  const extractTitle = (story) => {
    // Try to extract title from story
    const titleMatch = story?.match(/Title:\s*"?([^"\n]+)"?/i) || story?.match(/"([^"]+)"/);
    return titleMatch ? titleMatch[1] : `Dream of ${dreamData.setting}`
  }

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const downloadPoster = async () => {
    try {
      // For now, we'll use a simple approach without html2canvas
      // In a real implementation, you'd install html2canvas: npm install html2canvas
      
      // Create a simple download using canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      canvas.width = 800
      canvas.height = 1200
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#667eea')
      gradient.addColorStop(0.5, '#764ba2')
      gradient.addColorStop(1, '#f093fb')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Title
      ctx.fillStyle = 'white'
      ctx.font = 'bold 48px serif'
      ctx.textAlign = 'center'
      ctx.fillText(extractTitle(storyTitle), canvas.width / 2, 150)
      
      // Dream details
      ctx.font = '24px sans-serif'
      ctx.fillText(`Setting: ${dreamData.setting}`, canvas.width / 2, 250)
      ctx.fillText(`Emotion: ${dreamData.emotion}`, canvas.width / 2, 290)
      ctx.fillText(`Magic: ${dreamData.magicalElement}`, canvas.width / 2, 330)
      
      // Date
      ctx.font = '18px sans-serif'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillText(formatDate(), canvas.width / 2, canvas.height - 50)
      
      // Download
      const link = document.createElement('a')
      link.download = `dream-poster-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
      
      console.log('✅ Dream poster downloaded!')
    } catch (error) {
      console.error('Error downloading poster:', error)
      alert('Download failed. Please try again.')
    }
  }

  const sharePoster = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: extractTitle(storyTitle),
          text: `Check out my AI-generated dream: "${extractTitle(storyTitle)}"`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `Check out my AI-generated dream: "${extractTitle(storyTitle)}" - Created with DreamWeaver AI`
      navigator.clipboard.writeText(shareText)
      alert('Share text copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      {/* Poster Preview */}
      <div 
        ref={posterRef}
        className="relative w-full max-w-md mx-auto aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }}
      >
        {/* Background Image */}
        {generatedImages && generatedImages[0] && (
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${generatedImages[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 text-white text-center">
          {/* Header */}
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-serif font-bold mb-6 text-shadow-lg"
            >
              {extractTitle(storyTitle)}
            </motion.h1>
            
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full opacity-60"></span>
                <span>{dreamData.setting}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full opacity-60"></span>
                <span>{dreamData.emotion}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full opacity-60"></span>
                <span>{dreamData.magicalElement}</span>
              </div>
            </div>
          </div>
          
          {/* Middle decorative element */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/70"></div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div>
            <div className="text-xs opacity-80 mb-2">
              {formatDate()}
            </div>
            <div className="text-xs opacity-60">
              Created with DreamWeaver AI
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={downloadPoster}
          className="dream-button-primary flex items-center text-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Poster
        </button>
        
        <button
          onClick={sharePoster}
          className="dream-button-secondary flex items-center text-sm"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Dream
        </button>
      </div>
    </div>
  )
}

export default DreamPoster

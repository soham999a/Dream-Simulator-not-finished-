import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, BookOpen, RefreshCw, Share2, Download } from 'lucide-react'
import { useDreamStore } from '../utils/store'
import { generateDreamStory, generateComicBackgrounds } from '../utils/api'
import ComicPreview from '../components/ComicPreview'
import TypewriterStory from '../components/TypewriterStory'
import DreamPoster from '../components/DreamPoster'

const DreamResult = () => {
  const navigate = useNavigate()
  const { 
    dreamData, 
    generatedStory, 
    generatedImages, 
    isGenerating, 
    setGeneratedStory, 
    setGeneratedImages, 
    setIsGenerating 
  } = useDreamStore()
  
  const [error, setError] = useState(null)

  useEffect(() => {
    // Redirect if no dream data
    if (!dreamData.setting || !dreamData.emotion) {
      navigate('/dream-builder')
      return
    }

    // Generate content if not already generated
    if (!generatedStory && !isGenerating) {
      generateContent()
    }
  }, [dreamData, generatedStory, isGenerating])

  const generateContent = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Generate story
      const story = await generateDreamStory(dreamData)
      setGeneratedStory(story)

      // Generate comic backgrounds (run in parallel but don't block story display)
      generateComicBackgrounds(dreamData, story)
        .then(scenes => {
          console.log('🎬 Comic scenes ready for Dream Player:', scenes)
          // Store scenes in the dream store for the player
          // For now, we'll just log them - they'll be generated fresh in the player
        })
        .catch(err => console.error('Comic scene generation failed:', err))

      // Add some preview images for the result page
      const previewImages = [
        `https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop&crop=center`,
        `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center`,
        `https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop&crop=center`
      ]
      setGeneratedImages(previewImages)

    } catch (err) {
      setError('Failed to generate your dream story. Please try again.')
      console.error('Story generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    setGeneratedStory(null)
    setGeneratedImages([])
    generateContent()
  }

  if (isGenerating) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={handleRegenerate} />
  }

  return (
    <div className="min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
            Your Dream Story
          </h1>
          <p className="text-gray-600">
            Based on: {dreamData.setting} • {dreamData.emotion} • {dreamData.magicalElement}
          </p>
        </motion.div>

        {/* Story Display with Typewriter Effect */}
        {generatedStory && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="dream-card mb-8"
          >
            <TypewriterStory
              story={generatedStory}
              speed={25}
              onComplete={() => console.log('✨ Story typing complete!')}
            />
          </motion.div>
        )}

        {/* Comic Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-4 text-center">
            Your Dream World Preview
          </h2>
          <div className="dream-card">
            <ComicPreview dreamData={dreamData} />
            <p className="text-center text-gray-600 mt-4 text-sm">
              ✨ This is a preview of your dynamic comic-style background that will play during Dream Mode
            </p>
          </div>
        </motion.div>

        {/* Dream Poster */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-4 text-center">
            Your Dream Poster
          </h2>
          <div className="dream-card">
            <DreamPoster
              dreamData={dreamData}
              storyTitle={generatedStory}
              generatedImages={generatedImages}
            />
          </div>
        </motion.div>

        {/* Dream Images */}
        {generatedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-4 text-center">
              Dream Inspiration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedImages.map((image, index) => (
                <div key={index} className="dream-card p-2">
                  <img
                    src={image}
                    alt={`Dream visual ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/dream-player" className="dream-button-primary flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Enter Dream Mode
          </Link>

          <Link to="/dream-journal" className="dream-button-secondary flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Save to Journal
          </Link>

          <button
            onClick={handleRegenerate}
            className="dream-button-secondary flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </button>
        </motion.div>
      </div>
    </div>
  )
}

const LoadingScreen = () => (
  <div className="min-h-screen pt-16 flex items-center justify-center px-4">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-4 border-4 border-sky-200 border-t-sky-500 rounded-full"
      />
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
        Weaving Your Dream...
      </h2>
      <p className="text-gray-600">
        Our AI is crafting your personalized dream story
      </p>
    </div>
  </div>
)

const ErrorScreen = ({ error, onRetry }) => (
  <div className="min-h-screen pt-16 flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="flex gap-4 justify-center">
        <button onClick={onRetry} className="dream-button-primary">
          Try Again
        </button>
        <Link to="/dream-builder" className="dream-button-secondary">
          Back to Builder
        </Link>
      </div>
    </div>
  </div>
)

export default DreamResult

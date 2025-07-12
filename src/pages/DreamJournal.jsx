import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Sparkles, Save, ArrowLeft } from 'lucide-react'
import { useDreamStore, useJournalStore } from '../utils/store'
import { processJournalEntry } from '../utils/api'

const DreamJournal = () => {
  const navigate = useNavigate()
  const { generatedStory, generatedImages } = useDreamStore()
  const { addEntry } = useJournalStore()
  
  const [userReflection, setUserReflection] = useState('')
  const [processedEntry, setProcessedEntry] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [step, setStep] = useState(1) // 1: reflection input, 2: processed result

  const handleProcessReflection = async () => {
    if (!userReflection.trim()) return

    setIsProcessing(true)
    try {
      const processed = await processJournalEntry(userReflection)
      setProcessedEntry(processed)
      setStep(2)
    } catch (error) {
      console.error('Failed to process journal entry:', error)
      // Fallback to user's original reflection
      setProcessedEntry(userReflection)
      setStep(2)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSaveEntry = () => {
    const entry = {
      userReflection,
      processedEntry,
      originalStory: generatedStory,
      images: generatedImages,
      dreamData: useDreamStore.getState().dreamData,
    }

    addEntry(entry)
    setIsSaved(true)
    
    // Navigate to timeline after a brief delay
    setTimeout(() => {
      navigate('/journal-timeline')
    }, 2000)
  }

  const handleStartOver = () => {
    setUserReflection('')
    setProcessedEntry('')
    setStep(1)
    setIsSaved(false)
  }

  if (isSaved) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Save className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
            Dream Saved!
          </h2>
          <p className="text-gray-600 mb-4">
            Your dream reflection has been added to your journal.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your journal timeline...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-sky-500 mr-3" />
            <h1 className="text-3xl font-serif font-bold text-gray-800">
              Dream Journal
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {step === 1 
              ? "Reflect on your dream experience. What do you remember? How did it make you feel?"
              : "Here's your beautifully crafted dream journal entry"
            }
          </p>
        </motion.div>

        {step === 1 ? (
          /* Step 1: User Reflection Input */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="dream-card"
          >
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                What do you remember from your dream?
              </label>
              <textarea
                value={userReflection}
                onChange={(e) => setUserReflection(e.target.value)}
                placeholder="Describe what you remember... the feelings, images, sensations, or any moments that stood out to you. Even fragments are valuable."
                className="dream-input h-40 resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Share your authentic experience - there's no right or wrong way to dream.
                </p>
                <span className="text-sm text-gray-400">
                  {userReflection.length}/500
                </span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="dream-button-secondary flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              
              <button
                onClick={handleProcessReflection}
                disabled={!userReflection.trim() || isProcessing}
                className={`dream-button-primary flex items-center ${
                  (!userReflection.trim() || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Journal Entry
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Step 2: Processed Journal Entry */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Original Reflection */}
            <div className="dream-card">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Original Reflection</h3>
              <p className="text-gray-600 italic leading-relaxed">
                "{userReflection}"
              </p>
            </div>

            {/* Processed Entry */}
            <div className="dream-card">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Dream Journal Entry</h3>
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed font-serif whitespace-pre-wrap">
                  {processedEntry}
                </div>
              </div>
            </div>

            {/* Dream Images Preview */}
            {generatedImages.length > 0 && (
              <div className="dream-card">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Dream Visuals</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {generatedImages.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Dream visual ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleStartOver}
                className="dream-button-secondary"
              >
                Edit Reflection
              </button>
              
              <button
                onClick={handleSaveEntry}
                className="dream-button-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save to Journal
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DreamJournal

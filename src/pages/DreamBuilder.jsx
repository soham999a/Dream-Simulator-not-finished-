import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, Shuffle } from 'lucide-react'
import { useDreamStore } from '../utils/store'
import CinematicBackground from '../components/CinematicBackground'

const DreamBuilder = () => {
  const navigate = useNavigate()
  const { dreamData, updateDreamData, currentStep, setCurrentStep } = useDreamStore()
  
  const totalSteps = 4

  const settingOptions = [
    'Enchanted Forest', 'Floating City', 'Crystal Cave', 'Starlit Ocean',
    'Ancient Library', 'Cloud Kingdom', 'Mystical Garden', 'Time Portal',
    'Golden Desert', 'Underwater Palace', 'Mountain Peak', 'Dream Realm'
  ]

  const emotionOptions = [
    'Wonder', 'Nostalgia', 'Adventure', 'Peace', 'Mystery', 'Joy',
    'Curiosity', 'Love', 'Freedom', 'Magic', 'Serenity', 'Discovery'
  ]

  const magicalElements = [
    'Time Portal', 'Memory Crystal', 'Wish Fountain', 'Flying Books',
    'Talking Animals', 'Glowing Flowers', 'Magic Mirror', 'Star Map',
    'Dream Catcher', 'Healing Light', 'Music Box', 'Rainbow Bridge'
  ]

  const randomCharacters = [
    'a wise talking owl and mystical forest spirits',
    'a friendly dragon and ancient tree guardians',
    'talking phoenix and robot child',
    'ethereal mermaids and singing crystals',
    'time-traveling cats and cosmic butterflies',
    'gentle giants and laughing stars',
    'magical librarian and floating books',
    'dream weaver and silver unicorn',
    'crystal fairy and rainbow serpent',
    'moon rabbit and starlight dancers'
  ]

  const generateRandomDream = () => {
    const randomSetting = settingOptions[Math.floor(Math.random() * settingOptions.length)]
    const randomEmotion = emotionOptions[Math.floor(Math.random() * emotionOptions.length)]
    const randomCharacter = randomCharacters[Math.floor(Math.random() * randomCharacters.length)]
    const randomElement = magicalElements[Math.floor(Math.random() * magicalElements.length)]

    updateDreamData('setting', randomSetting)
    updateDreamData('emotion', randomEmotion)
    updateDreamData('characters', randomCharacter)
    updateDreamData('magicalElement', randomElement)

    // Auto-advance to final step
    setCurrentStep(4)
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/dream-result')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return dreamData.setting.length > 0
      case 2: return dreamData.emotion.length > 0
      case 3: return dreamData.characters.length > 0
      case 4: return dreamData.magicalElement.length > 0
      default: return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContainer
            title="Choose Your Dream Setting"
            subtitle="Where would you like your dream to take place?"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {settingOptions.map((setting) => (
                <button
                  key={setting}
                  onClick={() => updateDreamData('setting', setting)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    dreamData.setting === setting
                      ? 'border-sky-400 bg-sky-50 text-sky-700'
                      : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
                >
                  {setting}
                </button>
              ))}
            </div>
          </StepContainer>
        )

      case 2:
        return (
          <StepContainer
            title="Select Your Dream Emotion"
            subtitle="What feeling should guide your dream journey?"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {emotionOptions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => updateDreamData('emotion', emotion)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    dreamData.emotion === emotion
                      ? 'border-rose-400 bg-rose-50 text-rose-700'
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </StepContainer>
        )

      case 3:
        return (
          <StepContainer
            title="Describe Your Dream Characters"
            subtitle="Who or what will you encounter in your dream?"
          >
            <textarea
              value={dreamData.characters}
              onChange={(e) => updateDreamData('characters', e.target.value)}
              placeholder="Describe the characters, beings, or entities you'd like to meet... (e.g., a wise owl, friendly spirits, ancient guardians)"
              className="dream-input h-32 resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Be creative! Describe mystical beings, animals, people, or magical entities.
            </p>
          </StepContainer>
        )

      case 4:
        return (
          <StepContainer
            title="Choose Your Magical Element"
            subtitle="What magical discovery will make your dream special?"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {magicalElements.map((element) => (
                <button
                  key={element}
                  onClick={() => updateDreamData('magicalElement', element)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    dreamData.magicalElement === element
                      ? 'border-dream-400 bg-dream-50 text-dream-700'
                      : 'border-gray-200 hover:border-dream-300 hover:bg-dream-50/50'
                  }`}
                >
                  {element}
                </button>
              ))}
            </div>
          </StepContainer>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cinematic Background Preview */}
      {dreamData.setting && dreamData.emotion && (
        <CinematicBackground
          dreamData={dreamData}
          className="absolute inset-0 z-[-1] opacity-40"
        />
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-serif font-bold text-gray-800">Dream Builder</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={generateRandomDream}
                className="dream-button-secondary text-sm flex items-center"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Surprise Me!
              </button>
              <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-sky-400 to-rose-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`dream-button-secondary flex items-center ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`dream-button-primary flex items-center ${
              !isStepValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentStep === totalSteps ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Dream
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const StepContainer = ({ title, subtitle, children }) => (
  <div className="dream-card">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
    {children}
  </div>
)

export default DreamBuilder

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Play, Pause } from 'lucide-react'

const VoiceSelector = ({ selectedVoice, onVoiceChange, onPreview }) => {
  const [previewingVoice, setPreviewingVoice] = useState(null)

  const voices = [
    {
      id: '21m00Tcm4TlvDq8ikWAM', // ElevenLabs default
      name: 'Calm Female',
      description: 'Soothing and gentle, perfect for bedtime stories',
      type: 'elevenlabs',
      preview: 'Welcome to your dream world, where magic awaits...'
    },
    {
      id: 'pNInz6obpgDQGcFmaJgB', // ElevenLabs Adam
      name: 'Soft Male',
      description: 'Warm and comforting masculine voice',
      type: 'elevenlabs',
      preview: 'Let me guide you through this enchanted journey...'
    },
    {
      id: 'EXAVITQu4vr4xnSDxMaL', // ElevenLabs Bella
      name: 'Ethereal AI',
      description: 'Mystical and otherworldly narration',
      type: 'elevenlabs',
      preview: 'In the realm of dreams, anything is possible...'
    },
    {
      id: 'browser-female',
      name: 'Browser Female',
      description: 'Built-in browser voice (free fallback)',
      type: 'browser',
      preview: 'Your dreams come to life with beautiful stories...'
    },
    {
      id: 'browser-male',
      name: 'Browser Male',
      description: 'Built-in browser voice (free fallback)',
      type: 'browser',
      preview: 'Experience the magic of personalized dreams...'
    }
  ]

  const handleVoiceSelect = (voice) => {
    onVoiceChange(voice)
  }

  const handlePreview = async (voice) => {
    if (previewingVoice === voice.id) {
      // Stop preview
      window.speechSynthesis.cancel()
      setPreviewingVoice(null)
      return
    }

    setPreviewingVoice(voice.id)
    
    if (voice.type === 'browser') {
      // Use browser speech synthesis for preview
      const utterance = new SpeechSynthesisUtterance(voice.preview)
      
      // Try to find a voice that matches the gender
      const browserVoices = window.speechSynthesis.getVoices()
      if (voice.id === 'browser-female') {
        const femaleVoice = browserVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('susan'))
        if (femaleVoice) utterance.voice = femaleVoice
      } else if (voice.id === 'browser-male') {
        const maleVoice = browserVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('mark'))
        if (maleVoice) utterance.voice = maleVoice
      }
      
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onend = () => setPreviewingVoice(null)
      utterance.onerror = () => setPreviewingVoice(null)
      
      window.speechSynthesis.speak(utterance)
    } else {
      // For ElevenLabs voices, we could implement a preview here
      // For now, just show a message
      console.log(`🎵 Preview for ${voice.name}: ${voice.preview}`)
      setTimeout(() => setPreviewingVoice(null), 3000)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif font-semibold text-gray-800 mb-4">
        Choose Your Dream Narrator
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {voices.map((voice) => (
          <motion.div
            key={voice.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedVoice?.id === voice.id
                ? 'border-sky-400 bg-sky-50 shadow-md'
                : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50/50'
            }`}
            onClick={() => handleVoiceSelect(voice)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-800">{voice.name}</h4>
                  {voice.type === 'elevenlabs' && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Premium
                    </span>
                  )}
                  {voice.type === 'browser' && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                      Free
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{voice.description}</p>
                <p className="text-xs text-gray-500 italic">"{voice.preview}"</p>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePreview(voice)
                }}
                className="ml-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Preview voice"
              >
                {previewingVoice === voice.id ? (
                  <Pause className="w-4 h-4 text-gray-600" />
                ) : (
                  <Play className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
            
            {selectedVoice?.id === voice.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 flex items-center gap-2 text-sky-600"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-medium">Selected</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        💡 Premium voices use ElevenLabs API. Free voices use your browser's built-in speech.
      </div>
    </div>
  )
}

export default VoiceSelector

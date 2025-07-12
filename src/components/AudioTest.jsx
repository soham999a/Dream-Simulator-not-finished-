import React, { useState } from 'react'
import { generateSpeech } from '../utils/api'

const AudioTest = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [error, setError] = useState(null)

  const testAudio = async () => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const testText = "Hello! This is a test of the ElevenLabs audio generation. If you can hear this, the audio system is working perfectly!"
      console.log('🧪 Testing audio generation...')
      
      const url = await generateSpeech(testText)
      setAudioUrl(url)
      console.log('✅ Audio test successful!')
    } catch (err) {
      console.error('❌ Audio test failed:', err)
      setError(err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play().catch(err => {
        console.error('Playback error:', err)
        setError('Playback failed - trying browser TTS...')
        
        // Fallback to browser TTS
        const utterance = new SpeechSynthesisUtterance("Hello! This is a test using browser speech synthesis.")
        window.speechSynthesis.speak(utterance)
      })
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">🎵 Audio System Test</h3>
      
      <div className="space-y-3">
        <button
          onClick={testAudio}
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isGenerating ? '🔄 Generating...' : '🧪 Test ElevenLabs Audio'}
        </button>
        
        {audioUrl && (
          <button
            onClick={playAudio}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
          >
            ▶️ Play Test Audio
          </button>
        )}
        
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            ❌ {error}
          </div>
        )}
        
        {audioUrl && (
          <div className="p-3 bg-green-100 text-green-700 rounded">
            ✅ Audio generated successfully! URL: {audioUrl.substring(0, 50)}...
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioTest

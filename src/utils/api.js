// API Configuration
const API_CONFIG = {
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'llama3-8b-8192',
  },
  replicate: {
    baseUrl: 'https://api.replicate.com/v1',
  },
  elevenlabs: {
    baseUrl: 'https://api.elevenlabs.io/v1',
    voiceId: '21m00Tcm4TlvDq8ikWAM', // Default voice
  }
}

// Groq API - Story Generation
export const generateDreamStory = async (dreamData) => {
  const { setting, emotion, characters, magicalElement } = dreamData

  // Add randomness to avoid repetitive stories
  const randomElements = [
    'shimmering mist', 'golden light', 'silver threads', 'crystal formations', 'floating petals',
    'whispered secrets', 'ancient melodies', 'dancing shadows', 'starlight paths', 'rainbow bridges'
  ]
  const randomElement = randomElements[Math.floor(Math.random() * randomElements.length)]
  const timestamp = Date.now()

  const prompt = `You are a vivid and imaginative storyteller creating a unique dream story #${timestamp}.

Write a rich, dream-like bedtime story where the main character (the user) finds themselves in a surreal ${setting} filled with a deep feeling of ${emotion}. They encounter ${characters}, and soon discover ${magicalElement}. The atmosphere is enhanced by ${randomElement} that adds to the mystical ambiance.

The tone should feel whimsical, poetic, and immersive — like a lucid dream mixed with a fantasy fairytale. Use detailed sensory language to describe the sights, sounds, and feelings. The story should have a gentle flow, mystical vibes, and emotional depth.

Structure the story with a short title and clear sections, like:

Title: "The Whispering Grove"

- **Chapter 1: Arrival in the ${setting}**
- **Chapter 2: The Encounter with ${characters}**
- **Chapter 3: The Discovery of ${magicalElement}**
- **Chapter 4: What It Meant**

End the story with a soft, emotional reflection — like a message from the subconscious. Keep the language elegant, slightly surreal, and comforting.

Write in second person ("you") so the user feels like they're *inside* the dream.

Make this story unique and different from any previous stories. Include unexpected details and creative imagery.

Length: ~500–700 words`

  try {
    console.log('🌙 Generating dream story with Groq API...')

    const response = await fetch(`${API_CONFIG.groq.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: API_CONFIG.groq.model,
        temperature: 0.8,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error response:', errorText)
      throw new Error(`Groq API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('✅ Story generated successfully!')
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error generating story:', error)
    throw new Error(`Failed to generate story: ${error.message}`)
  }
}

// Dynamic Comic-Style Background Generator
export const generateComicBackgrounds = async (dreamData, storyContent) => {
  const { setting, emotion, magicalElement, characters } = dreamData

  console.log('🎨 Generating comic-style backgrounds...')

  // Create dynamic background scenes based on user prompts
  const backgroundScenes = generateBackgroundScenes(setting, emotion, magicalElement, characters)

  // Simulate API delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, 1500))

  console.log('✅ Generated dynamic comic backgrounds successfully!')

  return backgroundScenes
}

// Generate background scenes based on user inputs
const generateBackgroundScenes = (setting, emotion, magicalElement, characters) => {
  const scenes = []

  // Scene 1: Setting Introduction
  scenes.push({
    type: 'setting',
    title: `Welcome to ${setting}`,
    background: getSettingBackground(setting),
    effects: getEmotionEffects(emotion),
    duration: 8000
  })

  // Scene 2: Character Introduction
  scenes.push({
    type: 'characters',
    title: `You encounter ${characters}`,
    background: getCharacterBackground(setting, characters),
    effects: [...getEmotionEffects(emotion), 'character-glow'],
    duration: 10000
  })

  // Scene 3: Magical Element Discovery
  scenes.push({
    type: 'magic',
    title: `You discover ${magicalElement}`,
    background: getMagicalBackground(setting, magicalElement),
    effects: [...getEmotionEffects(emotion), 'magic-sparkle', 'energy-pulse'],
    duration: 12000
  })

  // Scene 4: Dream Conclusion
  scenes.push({
    type: 'conclusion',
    title: 'Your dream reaches its peak...',
    background: getConclusionBackground(setting, emotion),
    effects: ['dream-fade', 'peaceful-glow'],
    duration: 8000
  })

  return scenes
}

// Background generators based on settings
const getSettingBackground = (setting) => {
  const backgrounds = {
    'Enchanted Forest': {
      gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)',
      elements: ['floating-leaves', 'tree-silhouettes', 'fireflies'],
      colors: ['#2d5016', '#4a7c59', '#6b8e23']
    },
    'Floating City': {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
      elements: ['floating-platforms', 'cloud-wisps', 'sky-buildings'],
      colors: ['#4a90e2', '#7b68ee', '#9370db']
    },
    'Crystal Cave': {
      gradient: 'linear-gradient(135deg, #2c1810 0%, #8b4513 50%, #2c1810 100%)',
      elements: ['crystal-formations', 'cave-glow', 'mineral-sparkles'],
      colors: ['#4b0082', '#8a2be2', '#9400d3']
    },
    'Starlit Ocean': {
      gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      elements: ['wave-motion', 'star-reflections', 'moon-glow'],
      colors: ['#1e3c72', '#2a5298', '#4a90e2']
    },
    'Ancient Library': {
      gradient: 'linear-gradient(135deg, #3c1810 0%, #8b4513 50%, #3c1810 100%)',
      elements: ['floating-books', 'ancient-scrolls', 'mystical-light'],
      colors: ['#8b4513', '#cd853f', '#daa520']
    },
    'Cloud Kingdom': {
      gradient: 'linear-gradient(135deg, #e0f6ff 0%, #74b9ff 50%, #0984e3 100%)',
      elements: ['cloud-formations', 'sky-castles', 'rainbow-bridges'],
      colors: ['#74b9ff', '#0984e3', '#6c5ce7']
    }
  }

  return backgrounds[setting] || backgrounds['Enchanted Forest']
}

// Emotion-based effects
const getEmotionEffects = (emotion) => {
  const effects = {
    'Wonder': ['sparkle-burst', 'gentle-glow'],
    'Nostalgia': ['sepia-tint', 'soft-blur'],
    'Adventure': ['energy-pulse', 'dynamic-movement'],
    'Peace': ['calm-waves', 'gentle-sway'],
    'Mystery': ['shadow-play', 'fog-drift'],
    'Joy': ['rainbow-sparkles', 'bouncy-animation'],
    'Curiosity': ['search-light', 'discovery-glow'],
    'Love': ['heart-particles', 'warm-glow'],
    'Freedom': ['wind-effects', 'soaring-elements'],
    'Magic': ['spell-circles', 'energy-streams']
  }

  return effects[emotion] || ['gentle-glow']
}

const getCharacterBackground = (setting, characters) => {
  const base = getSettingBackground(setting)
  return {
    ...base,
    elements: [...base.elements, 'character-silhouettes', 'interaction-glow']
  }
}

const getMagicalBackground = (setting, magicalElement) => {
  const base = getSettingBackground(setting)
  return {
    ...base,
    elements: [...base.elements, 'magic-aura', 'power-emanation'],
    intensity: 'high'
  }
}

const getConclusionBackground = (setting, emotion) => {
  const base = getSettingBackground(setting)
  return {
    ...base,
    elements: [...base.elements, 'conclusion-glow'],
    fade: true
  }
}

// Cinematic Dream Video Background Generator
export const getDreamVideoBackground = (dreamData) => {
  const { setting, emotion } = dreamData

  console.log('🎬 Selecting cinematic background for:', setting, emotion)

  // Map settings and emotions to video themes
  const videoMappings = {
    'Enchanted Forest': {
      'Wonder': 'forest-magical',
      'Peace': 'forest-serene',
      'Adventure': 'forest-mystical',
      'Mystery': 'forest-dark',
      'default': 'forest-dreamy'
    },
    'Floating City': {
      'Wonder': 'clouds-ethereal',
      'Adventure': 'sky-dynamic',
      'Peace': 'clouds-peaceful',
      'Freedom': 'sky-soaring',
      'default': 'clouds-floating'
    },
    'Crystal Cave': {
      'Mystery': 'cave-crystals',
      'Wonder': 'cave-glowing',
      'Magic': 'cave-magical',
      'Peace': 'cave-serene',
      'default': 'cave-ambient'
    },
    'Starlit Ocean': {
      'Peace': 'ocean-calm',
      'Wonder': 'ocean-starlit',
      'Mystery': 'ocean-deep',
      'Love': 'ocean-romantic',
      'default': 'ocean-waves'
    },
    'Ancient Library': {
      'Curiosity': 'library-mystical',
      'Wonder': 'library-magical',
      'Nostalgia': 'library-vintage',
      'Peace': 'library-quiet',
      'default': 'library-ancient'
    },
    'Cloud Kingdom': {
      'Wonder': 'sky-kingdom',
      'Freedom': 'clouds-soaring',
      'Joy': 'sky-bright',
      'Peace': 'clouds-soft',
      'default': 'sky-dreamy'
    }
  }

  const settingVideos = videoMappings[setting] || videoMappings['Enchanted Forest']
  const videoTheme = settingVideos[emotion] || settingVideos.default

  return {
    theme: videoTheme,
    primaryVideo: getVideoSource(videoTheme, 'primary'),
    fallbackVideo: getVideoSource(videoTheme, 'fallback'),
    staticFallback: getStaticFallback(setting, emotion)
  }
}

// Get video sources (user uploads or public videos)
const getVideoSource = (theme, type) => {
  // Check for user-uploaded videos first
  const userVideo = localStorage.getItem(`dream-video-${theme}`)
  if (userVideo && type === 'primary') {
    return {
      src: userVideo,
      type: 'user-upload',
      source: 'local'
    }
  }

  // For now, disable external video URLs since they're unreliable
  // Instead, we'll use local placeholder videos or static backgrounds
  const publicVideos = {
    // Placeholder - these would be replaced with working URLs or local videos
    'forest-magical': null,
    'forest-serene': null,
    'forest-mystical': null,
    'forest-dark': null,
    'forest-dreamy': null,

    'clouds-ethereal': null,
    'sky-dynamic': null,
    'clouds-peaceful': null,
    'sky-soaring': null,
    'clouds-floating': null,

    'cave-crystals': null,
    'cave-glowing': null,
    'cave-magical': null,
    'cave-serene': null,
    'cave-ambient': null,

    'ocean-calm': null,
    'ocean-starlit': null,
    'ocean-deep': null,
    'ocean-romantic': null,
    'ocean-waves': null,

    'library-mystical': null,
    'library-magical': null,
    'library-vintage': null,
    'library-quiet': null,
    'library-ancient': null,

    'sky-kingdom': null,
    'clouds-soaring': null,
    'sky-bright': null,
    'clouds-soft': null,
    'sky-dreamy': null
  }

  return {
    src: publicVideos[theme] || publicVideos['forest-dreamy'],
    type: 'public',
    source: 'pixabay'
  }
}

// Static fallback with Ken Burns effect
const getStaticFallback = (setting, emotion) => {
  const gradients = {
    'Enchanted Forest': 'linear-gradient(135deg, #0f2027 0%, #203a43 20%, #2c5364 40%, #1e3c72 60%, #2a5298 80%, #1e3c72 100%)',
    'Floating City': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
    'Crystal Cave': 'linear-gradient(135deg, #2c1810 0%, #8b4513 25%, #4b0082 50%, #8a2be2 75%, #2c1810 100%)',
    'Starlit Ocean': 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #1e3c72 75%, #0f2027 100%)',
    'Ancient Library': 'linear-gradient(135deg, #3c1810 0%, #8b4513 25%, #cd853f 50%, #daa520 75%, #3c1810 100%)',
    'Cloud Kingdom': 'linear-gradient(135deg, #e0f6ff 0%, #74b9ff 25%, #0984e3 50%, #6c5ce7 75%, #e0f6ff 100%)'
  }

  return {
    gradient: gradients[setting] || gradients['Enchanted Forest'],
    animation: 'ken-burns',
    duration: '20s'
  }
}

// Note: Replicate API requires backend proxy due to CORS restrictions
// For production deployment, implement a backend endpoint that calls Replicate API

// ElevenLabs API - Text to Speech (with fallback)
export const generateSpeech = async (text) => {
  try {
    console.log('🎵 Generating speech with ElevenLabs API...')

    // Truncate text if too long to avoid quota issues
    const maxLength = 1000 // Limit to ~1000 characters to stay within quota
    const truncatedText = text.length > maxLength ?
      text.substring(0, maxLength) + "... And so your dream continues, filled with wonder and magic." :
      text

    console.log(`📝 Text length: ${text.length} chars, using: ${truncatedText.length} chars`)

    const response = await fetch(`${API_CONFIG.elevenlabs.baseUrl}/text-to-speech/${API_CONFIG.elevenlabs.voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: truncatedText,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.5,
          use_speaker_boost: true
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error response:', errorText)

      // If quota exceeded, return fallback
      if (errorText.includes('quota_exceeded')) {
        console.log('💡 ElevenLabs quota exceeded, using browser TTS fallback')
        return generateBrowserTTS(truncatedText)
      }

      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
    }

    const audioBlob = await response.blob()
    console.log('📦 Audio blob size:', audioBlob.size, 'bytes')
    console.log('📦 Audio blob type:', audioBlob.type)

    // Create audio URL with proper format detection
    let finalBlob
    if (audioBlob.type.includes('audio')) {
      finalBlob = audioBlob
    } else {
      // Force correct MIME type if not detected
      finalBlob = new Blob([audioBlob], { type: 'audio/mpeg' })
    }

    const audioUrl = URL.createObjectURL(finalBlob)

    console.log('✅ Speech generated successfully!')
    console.log('🎵 Audio URL created:', audioUrl)

    // Test if the audio can be loaded
    return new Promise((resolve, reject) => {
      const testAudio = new Audio()
      testAudio.oncanplay = () => {
        console.log('✅ Audio can play - URL is valid')
        resolve(audioUrl)
      }
      testAudio.onerror = (e) => {
        console.error('❌ Audio test failed:', e)
        console.log('🔄 Falling back to browser TTS...')
        URL.revokeObjectURL(audioUrl)
        resolve(null) // Return null to trigger browser TTS fallback
      }
      testAudio.src = audioUrl
    })
  } catch (error) {
    console.error('Error generating speech:', error)
    console.log('💡 Falling back to browser TTS...')
    return generateBrowserTTS(text.substring(0, 1000))
  }
}

// Fallback: Browser Text-to-Speech
const generateBrowserTTS = async (text) => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser TTS not supported'))
      return
    }

    // Create a simple audio file using Web Audio API
    console.log('🎵 Using browser TTS as fallback...')

    // For now, return null to indicate TTS should be skipped
    // In a real implementation, you could use Web Audio API to create audio
    console.log('✅ Browser TTS ready (audio playback will use built-in browser speech)')
    resolve(null) // null indicates to use browser speech synthesis directly
  })
}

// Journal Processing with Groq
export const processJournalEntry = async (userReflection) => {
  const prompt = `Turn this brief dream memory into a poetic, emotional journal entry in 1–2 paragraphs. Make it beautiful, introspective, and meaningful:

"${userReflection}"

Write in first person, with elegant language that captures the essence and emotion of the dream experience.`

  try {
    const response = await fetch(`${API_CONFIG.groq.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: API_CONFIG.groq.model,
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error processing journal entry:', error)
    throw error
  }
}

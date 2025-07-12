// Simple Canvas-based Video Generator for Demo Purposes
export const generateDemoVideo = (theme, duration = 10) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(`🎬 Generating demo video for theme: ${theme}`)
      
      // Create canvas for video generation
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 1280
      canvas.height = 720
      
      // Theme-based colors and effects
      const themeConfig = getThemeConfig(theme)
      
      // Create MediaRecorder for video capture
      const stream = canvas.captureStream(30) // 30 FPS
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      })
      
      const chunks = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const videoUrl = URL.createObjectURL(blob)
        console.log('✅ Demo video generated successfully!')
        resolve(videoUrl)
      }
      
      mediaRecorder.onerror = (error) => {
        console.error('❌ Video generation failed:', error)
        reject(error)
      }
      
      // Start recording
      mediaRecorder.start()
      
      // Animation variables
      let frame = 0
      const totalFrames = duration * 30 // 30 FPS
      
      // Animation loop
      const animate = () => {
        if (frame >= totalFrames) {
          mediaRecorder.stop()
          return
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw animated background
        drawAnimatedBackground(ctx, canvas, themeConfig, frame, totalFrames)
        
        frame++
        requestAnimationFrame(animate)
      }
      
      // Start animation
      animate()
      
    } catch (error) {
      console.error('❌ Demo video generation error:', error)
      reject(error)
    }
  })
}

const getThemeConfig = (theme) => {
  const configs = {
    'forest-magical': {
      colors: ['#1e3c72', '#2a5298', '#4a7c59', '#6b8e23'],
      particles: true,
      movement: 'gentle-sway',
      effects: ['sparkles', 'floating-leaves']
    },
    'clouds-ethereal': {
      colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
      particles: true,
      movement: 'drift',
      effects: ['cloud-wisps', 'light-rays']
    },
    'ocean-calm': {
      colors: ['#0f2027', '#203a43', '#2c5364', '#4a90e2'],
      particles: false,
      movement: 'wave-motion',
      effects: ['water-ripples', 'star-reflections']
    },
    'cave-crystals': {
      colors: ['#2c1810', '#8b4513', '#4b0082', '#8a2be2'],
      particles: true,
      movement: 'crystal-glow',
      effects: ['gem-sparkles', 'mineral-shine']
    }
  }
  
  return configs[theme] || configs['forest-magical']
}

const drawAnimatedBackground = (ctx, canvas, config, frame, totalFrames) => {
  const { width, height } = canvas
  const progress = frame / totalFrames
  
  // Create animated gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  const colorShift = Math.sin(progress * Math.PI * 2) * 0.3
  
  config.colors.forEach((color, index) => {
    const position = (index / (config.colors.length - 1)) + colorShift * 0.1
    gradient.addColorStop(Math.max(0, Math.min(1, position)), color)
  })
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  // Add movement effects
  switch (config.movement) {
    case 'gentle-sway':
      drawGentleSway(ctx, width, height, progress)
      break
    case 'drift':
      drawDrift(ctx, width, height, progress)
      break
    case 'wave-motion':
      drawWaveMotion(ctx, width, height, progress)
      break
    case 'crystal-glow':
      drawCrystalGlow(ctx, width, height, progress)
      break
  }
  
  // Add particles if enabled
  if (config.particles) {
    drawParticles(ctx, width, height, progress, config.effects)
  }
}

const drawGentleSway = (ctx, width, height, progress) => {
  ctx.save()
  const sway = Math.sin(progress * Math.PI * 4) * 20
  ctx.translate(sway, 0)
  
  // Draw tree-like shapes
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  for (let i = 0; i < 5; i++) {
    const x = (width / 6) * (i + 1)
    const treeHeight = height * 0.6 + Math.sin(progress * Math.PI * 2 + i) * 50
    ctx.fillRect(x - 10, height - treeHeight, 20, treeHeight)
  }
  
  ctx.restore()
}

const drawDrift = (ctx, width, height, progress) => {
  ctx.save()
  
  // Draw drifting clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
  for (let i = 0; i < 3; i++) {
    const x = (progress * width * 0.5 + i * width * 0.4) % (width + 200) - 100
    const y = height * 0.2 + Math.sin(progress * Math.PI * 2 + i) * 30
    const size = 100 + i * 50
    
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
  
  ctx.restore()
}

const drawWaveMotion = (ctx, width, height, progress) => {
  ctx.save()
  
  // Draw wave patterns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 2
  
  for (let wave = 0; wave < 3; wave++) {
    ctx.beginPath()
    const waveHeight = height * 0.7 + wave * 50
    
    for (let x = 0; x <= width; x += 10) {
      const y = waveHeight + Math.sin((x / 100) + (progress * Math.PI * 4) + wave) * 30
      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }
  
  ctx.restore()
}

const drawCrystalGlow = (ctx, width, height, progress) => {
  ctx.save()
  
  // Draw glowing crystal formations
  const glowIntensity = 0.5 + Math.sin(progress * Math.PI * 6) * 0.3
  
  for (let i = 0; i < 4; i++) {
    const x = width * 0.2 + i * width * 0.2
    const y = height * 0.6 + Math.sin(progress * Math.PI * 3 + i) * 40
    
    ctx.fillStyle = `rgba(138, 43, 226, ${glowIntensity * 0.3})`
    ctx.beginPath()
    ctx.moveTo(x, y - 60)
    ctx.lineTo(x - 30, y + 20)
    ctx.lineTo(x + 30, y + 20)
    ctx.closePath()
    ctx.fill()
  }
  
  ctx.restore()
}

const drawParticles = (ctx, width, height, progress, effects) => {
  ctx.save()
  
  // Draw floating particles
  for (let i = 0; i < 20; i++) {
    const x = (width / 20) * i + Math.sin(progress * Math.PI * 2 + i) * 50
    const y = (height * 0.8) * Math.random() + Math.cos(progress * Math.PI * 3 + i) * 30
    const size = 2 + Math.sin(progress * Math.PI * 4 + i) * 2
    const opacity = 0.3 + Math.sin(progress * Math.PI * 5 + i) * 0.2
    
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
  
  ctx.restore()
}

export default { generateDemoVideo }

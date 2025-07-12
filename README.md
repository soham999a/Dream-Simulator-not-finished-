# 🌙 DreamWeaver AI

**AI-powered cinematic dream story generator with immersive audio-visual experiences**

Transform your bedtime routine with personalized AI-generated stories, premium text-to-speech narration, and stunning cinematic backgrounds.

![DreamWeaver AI](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-teal) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Features

### 🎨 **Dream Customization**
- **6 Magical Settings**: Enchanted Forest, Floating City, Crystal Cave, Starlit Ocean, Ancient Library, Cloud Kingdom
- **5 Emotional Themes**: Wonder, Peace, Adventure, Mystery, Curiosity
- **30+ Unique Combinations** for endless variety

### 🎵 **Advanced Audio System**
- **Premium AI Voices**: ElevenLabs integration for natural speech
- **Browser TTS Fallback**: Always-working narration system
- **Smart Audio Management**: Automatic quality detection and switching

### 🎬 **Cinematic Backgrounds**
- **Custom Video Upload**: Users can upload personal background videos
- **Enhanced Static Backgrounds**: Beautiful animated gradients with Ken Burns effects
- **Theme-Based Visuals**: Each dream combination gets unique visual treatment
- **Floating Particles & Mist Effects**: Immersive atmospheric elements

### 📱 **User Experience**
- **Mobile-First Design**: Responsive across all devices
- **Dream Journal**: Save and revisit favorite stories
- **Timeline View**: Visual history of dream experiences
- **Glassmorphism UI**: Modern, dreamy interface design

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern hooks and functional components
- **Vite** - Lightning-fast build tool with hot reload
- **React Router** - Client-side navigation
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling framework
- **Lucide React** - Beautiful icon library

### **APIs & Services**
- **Groq API** - Fast AI text generation
- **ElevenLabs** - Premium text-to-speech synthesis
- **Browser Speech API** - Free TTS fallback

### **Storage & Media**
- **LocalStorage** - User preferences and dream journal
- **Blob URLs** - Audio and video file handling
- **Canvas API** - Dynamic video generation (demo feature)

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- npm or yarn

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/dreamweaver-ai.git

# Navigate to project directory
cd dreamweaver-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Environment Variables (Optional)**

Create a `.env` file in the root directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

**Note**: The app works perfectly without API keys using browser TTS and demo content.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CinematicBackground.jsx
│   ├── VideoUploader.jsx
│   └── Navbar.jsx
├── pages/              # Main application pages
│   ├── Home.jsx
│   ├── DreamBuilder.jsx
│   ├── DreamPlayer.jsx
│   ├── VideoSettings.jsx
│   └── JournalTimeline.jsx
├── utils/              # Utility functions
│   ├── api.js          # API integrations
│   └── videoGenerator.js
└── styles/
    └── index.css       # Global styles and animations
```

## 🎯 Usage

1. **Create a Dream**: Choose setting and emotional theme
2. **Generate Story**: AI creates unique narrative
3. **Experience**: Listen with premium or browser TTS
4. **Customize**: Upload personal background videos
5. **Save**: Add favorites to dream journal

## 🌐 Deployment

### **Vercel (Recommended)**

```bash
# Build the project
npm run build

# Deploy to Vercel
npx vercel --prod
```

### **Manual Deployment**
1. Run `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure as static site

## 🔧 Configuration

### **API Keys Setup**
- **Groq**: Get free API key at [console.groq.com](https://console.groq.com)
- **ElevenLabs**: Get API key at [elevenlabs.io](https://elevenlabs.io)

### **Video Settings**
- **Supported formats**: MP4, WebM, MOV
- **Max file size**: 50MB
- **Recommended**: 1080p, 30fps, gentle motion

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** for fast AI text generation
- **ElevenLabs** for premium voice synthesis
- **Tailwind CSS** for beautiful styling system


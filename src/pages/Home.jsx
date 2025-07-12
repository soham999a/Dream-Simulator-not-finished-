import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Moon, BookOpen, Play, Wand2 } from 'lucide-react'

const Home = ({ isDarkMode }) => {
  const features = [
    {
      icon: Wand2,
      title: 'Dream Builder',
      description: 'Design your perfect dream with our intuitive multi-step form',
      color: 'from-sky-400 to-sky-600'
    },
    {
      icon: Sparkles,
      title: 'AI Storytelling',
      description: 'Get personalized dream stories powered by advanced AI',
      color: 'from-rose-400 to-rose-600'
    },
    {
      icon: Play,
      title: 'Immersive Experience',
      description: 'Listen to your dreams with AI narration and ambient sounds',
      color: 'from-dream-400 to-dream-600'
    },
    {
      icon: BookOpen,
      title: 'Dream Journal',
      description: 'Record and reflect on your dream experiences',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Design Your
              <span className="dream-gradient-text block">Perfect Dream</span>
            </h1>

            <p className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Create personalized dream stories with AI-powered storytelling, stunning visuals, 
              and immersive audio experiences that guide you into peaceful sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dream-builder" className="dream-button-primary text-lg px-8 py-4">
                <Moon className="w-5 h-5 mr-2 inline" />
                Start Dreaming
              </Link>
              
              <Link to="/journal-timeline" className="dream-button-secondary text-lg px-8 py-4">
                <BookOpen className="w-5 h-5 mr-2 inline" />
                View Journal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl font-serif font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your bedtime routine with AI-powered dream experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="dream-card text-center group hover:scale-105"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="dream-card">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4">
              Ready to Dream?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of dreamers who have transformed their sleep experience 
              with personalized AI-generated dreams.
            </p>
            
            <Link to="/dream-builder" className="dream-button-primary text-lg px-8 py-4 inline-flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your First Dream
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home

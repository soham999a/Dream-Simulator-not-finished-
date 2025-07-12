import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Calendar, Trash2, Eye, Plus, Moon } from 'lucide-react'
import { useJournalStore } from '../utils/store'

const JournalTimeline = () => {
  const { entries, deleteEntry } = useJournalStore()
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDeleteEntry = (id) => {
    deleteEntry(id)
    setShowDeleteConfirm(null)
    if (selectedEntry?.id === id) {
      setSelectedEntry(null)
    }
  }

  const getPreviewText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (entries.length === 0) {
    return (
      <div className="min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-sky-100 to-rose-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              Your Dream Journal
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your dream journey starts here. Create your first dream and begin building your personal collection of magical experiences.
            </p>
            <Link to="/dream-builder" className="dream-button-primary inline-flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Dream
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
          <p className="text-gray-600 mb-6">
            Your collection of {entries.length} dream {entries.length === 1 ? 'experience' : 'experiences'}
          </p>
          <Link to="/dream-builder" className="dream-button-primary inline-flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New Dream
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`dream-card cursor-pointer transition-all duration-200 ${
                    selectedEntry?.id === entry.id ? 'ring-2 ring-sky-400 bg-sky-50/50' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-rose-400 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-serif font-semibold text-gray-800">
                          Dream #{entries.length - index}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedEntry(entry)
                            }}
                            className="p-1 text-gray-400 hover:text-sky-500 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowDeleteConfirm(entry.id)
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3">
                        {formatDate(entry.date)}
                      </p>
                      
                      {entry.dreamData && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
                            {entry.dreamData.setting}
                          </span>
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full">
                            {entry.dreamData.emotion}
                          </span>
                          <span className="px-2 py-1 bg-dream-100 text-dream-700 text-xs rounded-full">
                            {entry.dreamData.magicalElement}
                          </span>
                        </div>
                      )}
                      
                      <p className="text-gray-600 leading-relaxed">
                        {getPreviewText(entry.processedEntry || entry.userReflection)}
                      </p>
                      
                      {entry.images && entry.images.length > 0 && (
                        <div className="flex space-x-2 mt-3">
                          {entry.images.slice(0, 3).map((image, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={image}
                              alt={`Dream visual ${imgIndex + 1}`}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ))}
                          {entry.images.length > 3 && (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500">
                              +{entry.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {selectedEntry ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="dream-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif font-semibold text-gray-800">
                      Dream Details
                    </h3>
                    <button
                      onClick={() => setSelectedEntry(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                      <p className="text-gray-700">{formatDate(selectedEntry.date)}</p>
                    </div>
                    
                    {selectedEntry.dreamData && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Dream Elements</p>
                        <div className="space-y-1">
                          <p className="text-sm"><span className="font-medium">Setting:</span> {selectedEntry.dreamData.setting}</p>
                          <p className="text-sm"><span className="font-medium">Emotion:</span> {selectedEntry.dreamData.emotion}</p>
                          <p className="text-sm"><span className="font-medium">Characters:</span> {selectedEntry.dreamData.characters}</p>
                          <p className="text-sm"><span className="font-medium">Magic:</span> {selectedEntry.dreamData.magicalElement}</p>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Your Reflection</p>
                      <p className="text-sm text-gray-600 italic leading-relaxed">
                        "{selectedEntry.userReflection}"
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Journal Entry</p>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedEntry.processedEntry}
                      </div>
                    </div>
                    
                    {selectedEntry.images && selectedEntry.images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Dream Visuals</p>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedEntry.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Dream visual ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="dream-card text-center text-gray-500">
                  <Moon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Select a dream to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Dream Entry?
              </h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. Your dream entry will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEntry(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default JournalTimeline

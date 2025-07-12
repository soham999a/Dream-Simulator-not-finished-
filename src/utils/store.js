import { create } from 'zustand'

// Dream Builder Store
export const useDreamStore = create((set, get) => ({
  // Dream Builder Form Data
  dreamData: {
    setting: '',
    emotion: '',
    characters: '',
    magicalElement: '',
  },
  
  // Generated Content
  generatedStory: null,
  generatedImages: [],
  audioUrl: null,
  
  // UI State
  isGenerating: false,
  currentStep: 1,
  
  // Actions
  updateDreamData: (field, value) => set((state) => ({
    dreamData: { ...state.dreamData, [field]: value }
  })),
  
  setGeneratedStory: (story) => set({ generatedStory: story }),
  setGeneratedImages: (images) => set({ generatedImages: images }),
  setAudioUrl: (url) => set({ audioUrl: url }),
  setIsGenerating: (loading) => set({ isGenerating: loading }),
  setCurrentStep: (step) => set({ currentStep: step }),
  
  resetDream: () => set({
    dreamData: {
      setting: '',
      emotion: '',
      characters: '',
      magicalElement: '',
    },
    generatedStory: null,
    generatedImages: [],
    audioUrl: null,
    currentStep: 1,
  }),
}))

// Journal Store with localStorage persistence
export const useJournalStore = create((set, get) => {
  // Load initial data from localStorage
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('dreamweaver-journal')
      return stored ? JSON.parse(stored) : { entries: [] }
    } catch {
      return { entries: [] }
    }
  }

  // Save to localStorage
  const saveToStorage = (state) => {
    try {
      localStorage.setItem('dreamweaver-journal', JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  const initialState = loadFromStorage()

  return {
    // Journal entries
    entries: initialState.entries || [],

    // Actions
    addEntry: (entry) => set((state) => {
      const newState = {
        entries: [
          {
            id: Date.now(),
            date: new Date().toISOString(),
            ...entry
          },
          ...state.entries
        ]
      }
      saveToStorage(newState)
      return newState
    }),

    updateEntry: (id, updates) => set((state) => {
      const newState = {
        entries: state.entries.map(entry =>
          entry.id === id ? { ...entry, ...updates } : entry
        )
      }
      saveToStorage(newState)
      return newState
    }),

    deleteEntry: (id) => set((state) => {
      const newState = {
        entries: state.entries.filter(entry => entry.id !== id)
      }
      saveToStorage(newState)
      return newState
    }),

    getEntry: (id) => {
      const state = get()
      return state.entries.find(entry => entry.id === id)
    },
  }
})

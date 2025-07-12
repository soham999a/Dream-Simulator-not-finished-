// Quick API test script
import { generateDreamStory } from './src/utils/api.js'

const testDreamData = {
  setting: 'Enchanted Forest',
  emotion: 'Wonder',
  characters: 'wise talking animals',
  magicalElement: 'Glowing Flowers'
}

console.log('🧪 Testing DreamWeaver AI APIs...')
console.log('Dream Data:', testDreamData)

try {
  const story = await generateDreamStory(testDreamData)
  console.log('✅ Story Generation Test Passed!')
  console.log('Story Preview:', story.substring(0, 200) + '...')
} catch (error) {
  console.error('❌ Story Generation Test Failed:', error.message)
}
